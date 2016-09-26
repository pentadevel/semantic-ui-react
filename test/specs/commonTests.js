import faker from 'faker'
import _ from 'lodash'
import path from 'path'
import React, { createElement } from 'react'
import ReactDOMServer from 'react-dom/server'

import { META, numberToWord } from 'src/lib'
import { consoleUtil, sandbox, syntheticEvent } from 'test/utils'
import stardust from 'stardust'

import { Icon, Image, Label } from 'src/elements'
import { createShorthand } from 'src/factories'

const commonTestHelpers = (testName, Component) => {
  const throwError = msg => {
    throw new Error(`${testName}: ${msg} \n  Component: ${Component && Component.name}`)
  }

  const assertRequired = (required, description) =>
  required || throwError(`Required ${description}, got: ${required} (${typeof required})`)

  return {
    throwError,
    assertRequired,
  }
}

const componentCtx = require.context(
  '../../src/',
  true,
  /(addons|collections|elements|modules|views).(?!index).*\.js/
)

const componentInfo = componentCtx.keys().map(key => {
  const Component = componentCtx(key).default
  const componentType = typeof Component

  const { throwError } = commonTestHelpers('componentInfo', Component)

  if (componentType !== 'function') {
    throwError([
      `${key} is not properly exported.`,
      `Components should export a class or function, got: ${componentType}.`,
    ].join(' '))
  }

  const { _meta, prototype } = Component

  if (!_meta) {
    throwError([
      'Component is missing a static _meta object property. This should help identify it:',
      `Rendered:\n${ReactDOMServer.renderToStaticMarkup(<Component />)}`,
    ].join('\n'))
  }

  const constructorName = prototype.constructor.name
  const filePath = key
  const filename = path.basename(key)
  const filenameWithoutExt = path.basename(key, '.js')
  const subComponentName = _.has(_meta, 'parent') && _.has(_meta, 'name')
    ? _meta.name.replace(_meta.parent, '')
    : null

  // name of the component, sub component, or plural parent for sub component groups
  const componentClassName = (
    META.isChild(Component)
      ? subComponentName.replace(/Group$/, `${_meta.parent}s`)
      : _meta.name
  ).toLowerCase()

  return {
    _meta,
    Component,
    constructorName,
    componentClassName,
    subComponentName,
    filePath,
    filename,
    filenameWithoutExt,
  }
})

/**
 * Assert Component conforms to guidelines that are applicable to all components.
 * @param {React.Component|Function} Component A component that should conform.
 * @param {Object} [options={}]
 * @param {Object} [options.requiredProps={}] Props required to render Component without errors or warnings.
 */
export const isConformant = (Component, options = {}) => {
  const { requiredProps = {} } = options
  const { throwError } = commonTestHelpers('isConformant', Component)

  // tests depend on Component constructor names, enforce them
  if (!Component.prototype.constructor.name) {
    throwError([
      'Component is not a named function. This should help identify it:',
      `static _meta = ${JSON.stringify(Component._meta, null, 2)}`,
      `Rendered:\n${ReactDOMServer.renderToStaticMarkup(<Component />)}`,
    ].join('\n'))
  }

  // extract componentInfo for this component
  const {
    _meta,
    constructorName,
    componentClassName,
    filenameWithoutExt,
  } = _.find(componentInfo, i => i.constructorName === Component.prototype.constructor.name)

  // ----------------------------------------
  // Class and file name
  // ----------------------------------------
  it(`constructor name matches filename "${constructorName}"`, () => {
    constructorName.should.equal(filenameWithoutExt)
  })

  // ----------------------------------------
  // Is exported or private
  // ----------------------------------------
  // detect components like: stardust.H1
  const isStardustProp = _.has(stardust, constructorName)

  // detect sub components like: stardust.Form.Field (ie FormField component)
  // Build a path by following _meta.parents to the root:
  //   ['Form', 'FormField', 'FormTextArea']
  let stardustPath = []
  let meta = _meta
  while (meta) {
    stardustPath.unshift(meta.name)
    meta = _.get(stardust, [meta.parent, '_meta'])
  }
  // Remove parent name from paths:
  //   ['Form', 'Field', 'TextArea']
  stardustPath = stardustPath.reduce((acc, next) => (
    [...acc, next.replace(acc.join(''), '')]
  ), [])

  // find the stardustPath in the stardust object
  const isSubComponent = _.isFunction(_.get(stardust, stardustPath))

  if (META.isPrivate(constructorName)) {
    it('is not exported as a component nor sub component', () => {
      expect(isStardustProp).to.equal(
        false,
        `"${constructorName}" is private (starts with  "_").` +
        ' It cannot be a key on the stardust object'
      )

      expect(isSubComponent).to.equal(
        false,
        `"${constructorName}" is private (starts with "_").` +
        ' It cannot be a static prop of another component (sub-component)'
      )
    })
  } else {
    it('is exported as a component or sub component', () => {
      expect(isStardustProp || isSubComponent).to.equal(
        true,
        `"${constructorName}" must be:` +
        ' a key on stardust' +
        ' || key on another component (sub-component)' +
        ' || private (start with "_")'
      )
    })
  }

  // ----------------------------------------
  // Props
  // ----------------------------------------
  it('spreads user props', () => {
    // JSX does not render custom html attributes so we prefix them with data-*.
    // https://facebook.github.io/react/docs/jsx-gotchas.html#custom-html-attributes
    const props = {
      [`data-${_.kebabCase(faker.hacker.noun())}`]: faker.hacker.verb(),
    }

    // descendants() accepts an enzyme <selector>
    // props should be spread on some descendant
    // we find the descendant with spread props via a matching props object selector
    // we do not test Component for props, of course they exist as we are spreading them
    shallow(<Component {...requiredProps} {...props} />)
      .should.have.descendants(props)
  })

  describe('"as" prop (common)', () => {
    it('renders the component as HTML tags or passes "as" to the next component', () => {
      // silence element nesting warnings
      consoleUtil.disableOnce()

      const tags = ['a', 'em', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'i', 'p', 'span', 'strong']
      try {
        tags.forEach((tag) => {
          shallow(<Component as={tag} />)
            .should.have.tagName(tag)
        })
      } catch (err) {
        tags.forEach((tag) => {
          const wrapper = shallow(<Component as={tag} />)
          wrapper.type().should.not.equal(Component)
          wrapper.should.have.prop('as', tag)
        })
      }
    })

    it('renders as a functional component or passes "as" to the next component', () => {
      const MyComponent = () => null

      try {
        shallow(<Component as={MyComponent} />)
          .type()
          .should.equal(MyComponent)
      } catch (err) {
        const wrapper = shallow(<Component as={MyComponent} />)
        wrapper.type().should.not.equal(Component)
        wrapper.should.have.prop('as', MyComponent)
      }
    })

    it('renders as a ReactClass or passes "as" to the next component', () => {
      class MyComponent extends React.Component {
        render() {
          return <div data-my-react-class />
        }
      }

      try {
        shallow(<Component as={MyComponent} />)
          .type()
          .should.equal(MyComponent)
      } catch (err) {
        const wrapper = shallow(<Component as={MyComponent} />)
        wrapper.type().should.not.equal(Component)
        wrapper.should.have.prop('as', MyComponent)
      }
    })

    it('passes extra props to the component it is renders as', () => {
      const MyComponent = () => null

      shallow(<Component as={MyComponent} data-extra-prop='foo' />)
        .should.have.descendants('[data-extra-prop="foo"]')
    })
  })

  // ----------------------------------------
  // Events
  // ----------------------------------------
  it('handles events transparently', () => {
    // Stardust events should be handled transparently, working just as they would in vanilla React.
    // Example, both of these handler()s should be called with the same event:
    //
    //   <Button onClick={handler} />
    //   <button onClick={handler} />
    //
    // This test catches the case where a developer forgot to call the event prop
    // after handling it internally. It also catch cases where the synthetic event was not passed back.
    _.each(syntheticEvent.types, ({ eventShape, listeners }) => {
      _.each(listeners, listenerName => {
        // onKeyDown => keyDown
        const eventName = _.camelCase(listenerName.replace('on', ''))

        // onKeyDown => handleKeyDown
        const handlerName = _.camelCase(listenerName.replace('on', 'handle'))

        const handlerSpy = sandbox.spy()
        const props = {
          ...requiredProps,
          [listenerName]: handlerSpy,
          'data-simulate-event-here': true,
        }

        const wrapper = shallow(<Component {...props} />)

        wrapper
          .find('[data-simulate-event-here]')
          .simulate(eventName, eventShape)

        // give event listeners opportunity to cleanup
        if (wrapper.instance() && wrapper.instance().componentWillUnmount) {
          wrapper.instance().componentWillUnmount()
        }

        // <Dropdown onBlur={handleBlur} />
        //                   ^ was not called on "blur"
        const leftPad = ' '.repeat(constructorName.length + listenerName.length + 3)

        handlerSpy.called.should.equal(true,
          `<${constructorName} ${listenerName}={${handlerName}} />\n` +
          `${leftPad} ^ was not called on "${eventName}".` +
          'You may need to hoist your event handlers up to the root element.\n'
        )

        // TODO: https://github.com/TechnologyAdvice/stardust/issues/218
        // some components currently return useful data in the first position
        // update those to return the event first, then any data, finally uncomment this test
        //
        // handlerSpy.calledWithMatch(eventShape).should.equal(true,
        //   `<${constructorName} ${listenerName}={${handlerName}} />\n` +
        //   `${leftPad} ^ was not called with an "${listenerName}" event\n` +
        //   'It was called with args:\n' +
        //   JSON.stringify(handlerSpy.args, null, 2)
        // )
      })
    })
  })

  // ----------------------------------------
  // Defines _meta
  // ----------------------------------------
  describe('_meta', () => {
    it('is a static object prop', () => {
      expect(_meta).to.be.an('object')
    })

    describe('name', () => {
      it('is defined', () => {
        expect(_meta).to.have.any.keys('name')
      })
      it('matches the filename', () => {
        expect(_meta.name).to.equal(filenameWithoutExt)
      })
    })
    if (_.has(_meta, 'parent')) {
      describe('parent', () => {
        it('matches some component name', () => {
          expect(_.map(stardust, c => c.prototype.constructor.name)).to.contain(_meta.parent)
        })
      })
    }
    describe('type', () => {
      it('is defined', () => {
        expect(_meta).to.have.any.keys('type')
      })
      it('is a META.TYPES value', () => {
        expect(_.values(META.TYPES)).to.contain(_meta.type)
      })
    })
  })

  // ----------------------------------------
  // Handles className
  // ----------------------------------------
  describe('className (common)', () => {
    it(`has the Semantic UI className "${componentClassName}"`, () => {
      const wrapper = render(<Component {...requiredProps} />)
      // don't test components with no className at all (i.e. MessageItem)
      if (wrapper.prop('className')) {
        wrapper.should.have.className(componentClassName)
      }
    })

    it("applies user's className to root component", () => {
      const classes = faker.hacker.phrase()
      shallow(<Component {...requiredProps} className={classes} />)
        .should.have.className(classes)
    })

    it("user's className does not override the default classes", () => {
      const defaultClasses = shallow(<Component {...requiredProps} />)
        .prop('className')

      if (!defaultClasses) return

      const userClasses = faker.hacker.verb()
      const mixedClasses = shallow(<Component {...requiredProps} className={userClasses} />)
        .prop('className')

      defaultClasses.split(' ').forEach((defaultClass) => {
        mixedClasses.should.include(defaultClass, [
          'Make sure you are using the `getUnhandledProps` util to spread the `rest` props.',
          'This may also be of help: https://facebook.github.io/react/docs/transferring-props.html.',
        ].join(' '))
      })
    })
  })
}

/**
 * Assert a component adds the Semantic UI "ui" className.
 * @param {React.Component|Function} Component The Component.
 * @param {Object} [options={}]
 * @param {Object} [options.requiredProps={}] Props required to render the component.
 */
export const hasUIClassName = (Component, options = {}) => {
  const { requiredProps = {} } = options
  const { assertRequired } = commonTestHelpers('hasUIClassName', Component)

  it('has the "ui" className', () => {
    assertRequired(Component, 'a `Component`')

    shallow(<Component {...requiredProps} />)
      .should.have.className('ui')
  })
}

/**
 * Assert a component exposes other components as (static properties).
 * @param {React.Component|Function} Component The Component.
 * @param {React.Component[]} subComponents Array of components that should exist on Component.
 */
export const hasSubComponents = (Component, subComponents) => {
  const staticValues = _.values(Component)

  _.each(subComponents, subComponent => {
    it(`has sub component ${subComponent._meta.name}`, () => {
      staticValues.should.contain(subComponent)
    })
  })
}

/**
 * Assert a component can be receive focus via the tab key.
 * @param {React.Component|Function} Component The Component.
 * @param {Object} [options={}]
 * @param {Object} [options.requiredProps={}] Props required to render the component.
 */
export const isTabbable = (Component, options = {}) => {
  const { requiredProps = {} } = options
  const { assertRequired } = commonTestHelpers('isTabbable', Component)

  it('is tabbable', () => {
    assertRequired(Component, 'a `Component`')

    shallow(<Component {...requiredProps} />)
      .should.have.attr('tabindex', '0')
  })
}

/**
 * Assert a component renders children somewhere in the tree.
 * @param {React.Component|Function} Component A component that should render children.
 * @param {Object} [options={}]
 * @param {Object} [options.requiredProps={}] Props required to render the component.
 */
export const rendersChildren = (Component, options = {}) => {
  const { requiredProps = {} } = options
  const { assertRequired } = commonTestHelpers('rendersChildren', Component)

  it('renders child text', () => {
    assertRequired(Component, 'a `Component`')

    const text = faker.hacker.phrase()
    shallow(createElement(Component, requiredProps, text))
      .should.contain.text(text)
  })

  it('renders child components', () => {
    const child = <div data-child={faker.hacker.noun()} />
    shallow(createElement(Component, requiredProps, child))
      .should.contain(child)
  })
}

// ----------------------------------------
// className from prop
// ----------------------------------------
const _definesPropOptions = (Component, propKey) => {
  it(`defines ${propKey} options in Component._meta.props`, () => {
    Component.should.have.any.keys('_meta')
    Component._meta.should.have.any.keys('props')
    Component._meta.props.should.have.any.keys(propKey)
    Component._meta.props[propKey].should.be.an('array')
  })
}

const _noDefaultClassNameFromProp = (Component, propKey, options = {}) => {
  const { className = propKey, requiredProps = {} } = options
  // required props may include a prop that creates a className
  // if so, we cannot assert that it doesn't exist by default because it is required to exist
  // skip assertions for required props
  if (propKey in requiredProps) return

  it('is not included in className when not defined', () => {
    const wrapper = shallow(<Component {...requiredProps} />)
    wrapper.should.not.have.className(className)

    // not all component props define prop options in _meta.props
    // if they do, ensure that none of the prop option values are in className
    // SUI classes ought to be built up using a declarative component API
    _.each(_.get(Component, `_meta.props[${propKey}]`), propVal => {
      wrapper.should.not.have.className(propVal.toString())
    })
  })
}

const _noClassNameFromBoolProps = (Component, propKey, options = {}) => {
  const { className = propKey, requiredProps = {} } = options

  _.each([true, false], bool => it(`does not add any className when ${bool}`, () => {
    // silence propType warnings
    consoleUtil.disableOnce()

    const wrapper = shallow(createElement(Component, { ...requiredProps, [propKey]: bool }))

    wrapper.should.not.have.className(className)
    wrapper.should.not.have.className('true')
    wrapper.should.not.have.className('false')

    _.each(_.get(Component, `_meta.props[${propKey}]`), propVal => {
      wrapper.should.not.have.className(propVal.toString())
    })
  }))
}

const _classNamePropValueBeforePropName = (Component, propKey, options = {}) => {
  const { className = propKey, requiredProps = {} } = options

  _.each(_.get(Component, `_meta.props[${propKey}]`), (propVal) => {
    it(`adds "${propVal} ${propKey}" to className`, () => {
      shallow(createElement(Component, { ...requiredProps, [propKey]: propVal }))
        .should.have.className(`${propVal} ${className}`)
    })
  })
}

/**
 * Assert that a Component correctly implements a width prop.
 * @param {React.Component|Function} Component The component to test.
 * @param {object} [options={}]
 * @param {string} [options.propKey] The prop name that accepts a width value.
 * @param {string} [options.widthClass] The className that follows the wordToNumber className.
 *   Examples: one WIDE column, two COLUMN grid, three [none] fields, etc.
 * @param {boolean} [options.canEqual=true] Whether or not to test 'equal width' usage.
 * @param {Object} [options.requiredProps={}] Props required to render the component.
 */
export const implementsWidthProp = (Component, options = {}) => {
  const { assertRequired } = commonTestHelpers('implementsWidthProp', Component)

  const { propKey, widthClass, canEqual = true, requiredProps } = options
  describe(`${propKey} (common)`, () => {
    assertRequired(Component, 'a `Component`')

    _definesPropOptions(Component, propKey)
    _noDefaultClassNameFromProp(Component, propKey, { requiredProps })
    _noClassNameFromBoolProps(Component, propKey, { requiredProps })

    it('adds numberToWord value to className', () => {
      _.without(_.get(Component, `_meta.props[${propKey}]`), 'equal').forEach((width) => {
        const expectClass = widthClass ? `${numberToWord(width)} ${widthClass}` : numberToWord(width)

        shallow(createElement(Component, { ...requiredProps, [propKey]: width }))
          .should.have.className(expectClass)
      })
    })

    if (canEqual) {
      it('adds "equal width" to className', () => {
        shallow(createElement(Component, { ...requiredProps, [propKey]: 'equal' }))
          .should.have.className('equal width')
      })
    }
  })
}

/**
 * Assert that a Component correctly implements a shorthand prop.
 *
 * @param {function} Component The component to test.
 * @param {object} options
 * @param {string} options.propKey The name of the shorthand prop.
 * @param {string|function} options.ShorthandComponent The component that should be rendered from the shorthand value.
 * @param {function} options.mapValueToProps A function that maps a primitive value to the Component props
 * @param {Object} [options.requiredProps={}] Props required to render the component.
 * @param {Object} [options.requiredShorthandProps={}] Props required to render the shorthand component.
 */
export const implementsShorthandProp = (Component, options = {}) => {
  const { assertRequired } = commonTestHelpers('implementsShorthandProp', Component)

  const {
    propKey,
    ShorthandComponent,
    mapValueToProps,
    requiredProps = {},
    requiredShorthandProps = {},
  } = options

  describe(`${propKey} shorthand prop (common)`, () => {
    assertRequired(Component, 'a `Component`')
    assertRequired(_.isPlainObject(options), 'an `options` object')
    assertRequired(propKey, 'a `propKey`')
    assertRequired(ShorthandComponent, 'a `ShorthandComponent`')

    const name = typeof ShorthandComponent === 'string' ? ShorthandComponent : ShorthandComponent.name

    const assertValidShorthand = (value) => {
      const renderedShorthand = createShorthand(ShorthandComponent, mapValueToProps, value, requiredShorthandProps)
      const element = createElement(Component, { ...requiredProps, [propKey]: value })

      shallow(element).should.contain(renderedShorthand)
    }

    _noDefaultClassNameFromProp(Component, propKey, { requiredProps })

    if (Component.defaultProps && Component.defaultProps[propKey]) {
      it(`has default ${name} when not defined`, () => {
        shallow(<Component {...requiredProps} />)
          .should.have.descendants(name)
      })
    } else {
      it(`has no ${name} when not defined`, () => {
        shallow(<Component {...requiredProps} />)
          .should.not.have.descendants(name)
      })
    }

    it(`has no ${name} when null`, () => {
      shallow(createElement(Component, { ...requiredProps, [propKey]: null }))
        .should.not.have.descendants(ShorthandComponent)
    })

    it(`renders a ${name} from strings`, () => {
      consoleUtil.disableOnce()
      assertValidShorthand('string')
    })

    it(`renders a ${name} from numbers`, () => {
      consoleUtil.disableOnce()
      assertValidShorthand(123)
    })

    it(`renders a ${name} from a props object`, () => {
      consoleUtil.disableOnce()
      assertValidShorthand(mapValueToProps('foo'))
    })

    it(`renders a ${name} from elements`, () => {
      consoleUtil.disableOnce()
      assertValidShorthand(<ShorthandComponent {...requiredShorthandProps} />)
    })
  })
}

/**
 * Assert that a Component correctly implements a shorthand prop.
 *
 * @param {function} Component The component to test.
 * @param {object} [options={}]
 * @param {string} [options.propKey='icon'] The name of the shorthand prop.
 * @param {string|function} [options.ShorthandComponent] The component that should be rendered from the shorthand value.
 * @param {function} [options.mapValueToProps] A function that maps a primitive value to the Component props
 * @param {Object} [options.requiredProps={}] Props required to render the component.
 * @param {Object} [options.requiredShorthandProps={}] Props required to render the shorthand component.
 */
export const implementsIconProp = (Component, options = {}) => {
  const opts = {
    propKey: 'icon',
    ShorthandComponent: Icon,
    mapValueToProps: val => ({ name: val }),
    requiredProps: {},
    requiredShorthandProps: {},
    ...options,
  }
  implementsShorthandProp(Component, opts)
}

/**
 * Assert that a Component correctly implements a shorthand prop.
 *
 * @param {function} Component The component to test.
 * @param {object} [options={}]
 * @param {string} [options.propKey='label'] The name of the shorthand prop.
 * @param {string|function} [options.ShorthandComponent] The component that should be rendered from the shorthand value.
 * @param {function} [options.mapValueToProps] A function that maps a primitive value to the Component props
 * @param {Object} [options.requiredProps={}] Props required to render the component.
 * @param {Object} [options.requiredShorthandProps={}] Props required to render the shorthand component.
 */
export const implementsLabelProp = (Component, options = {}) => {
  const opts = {
    propKey: 'label',
    ShorthandComponent: Label,
    mapValueToProps: val => ({ content: val }),
    requiredProps: {},
    requiredShorthandProps: {},
    ...options,
  }
  implementsShorthandProp(Component, opts)
}

/**
 * Assert that a Component correctly implements a shorthand prop.
 *
 * @param {function} Component The component to test.
 * @param {object} [options={}]
 * @param {string} [options.propKey='image'] The name of the shorthand prop.
 * @param {string|function} [options.ShorthandComponent] The component that should be rendered from the shorthand value.
 * @param {function} [options.mapValueToProps] A function that maps a primitive value to the Component props
 * @param {Object} [options.requiredProps={}] Props required to render the component.
 * @param {Object} [options.requiredShorthandProps={}] Props required to render the shorthand component.
 */
export const implementsImageProp = (Component, options = {}) => {
  const opts = {
    propKey: 'image',
    ShorthandComponent: Image,
    mapValueToProps: val => ({ src: val }),
    requiredProps: {},
    requiredShorthandProps: {},
    ...options,
  }
  implementsShorthandProp(Component, opts)
}

/**
 * Assert that a Component correctly implements the "textAlign" prop.
 * @param {React.Component|Function} Component The component to test.
 * @param {Object} [options={}]
 * @param {Object} [options.requiredProps={}] Props required to render the component.
 */
export const implementsTextAlignProp = (Component, options = {}) => {
  const { requiredProps = {} } = options
  const { assertRequired } = commonTestHelpers('implementsTextAlignProp', Component)

  describe('aligned (common)', () => {
    assertRequired(Component, 'a `Component`')

    _definesPropOptions(Component, 'textAlign')
    _noDefaultClassNameFromProp(Component, 'textAlign', { requiredProps })
    _noClassNameFromBoolProps(Component, 'textAlign', { requiredProps })

    _.each(Component._meta.props.aligned, (propVal) => {
      if (propVal === 'justified') {
        it('adds "justified" without "aligned" to className', () => {
          shallow(<Component { ...requiredProps } aligned='justified' />)
            .should.have.className('justified')

          shallow(<Component { ...requiredProps } aligned='justified' />)
            .should.not.have.className('aligned')
        })
      } else {
        it(`adds "${propVal} aligned" to className`, () => {
          shallow(<Component { ...requiredProps } aligned={propVal} />)
            .should.have.className(`${propVal} ${'aligned'}`)
        })
      }
    })
  })
}

/**
 * Assert that a Component correctly implements the "verticalAlign" prop.
 * @param {React.Component|Function} Component The component to test.
 * @param {Object} [options={}]
 * @param {Object} [options.requiredProps={}] Props required to render the component.
 */
export const implementsVerticalAlignProp = (Component, options = {}) => {
  const { requiredProps = {} } = options
  const { assertRequired } = commonTestHelpers('implementsVerticalAlignProp', Component)

  describe('verticalAlign (common)', () => {
    assertRequired(Component, 'a `Component`')

    _definesPropOptions(Component, 'verticalAlign')
    _noDefaultClassNameFromProp(Component, 'verticalAlign', { requiredProps })
    _noClassNameFromBoolProps(Component, 'verticalAlign', { requiredProps })

    _.each(Component._meta.props.verticalAlign, (propVal) => {
      it(`adds "${propVal} aligned" to className`, () => {
        shallow(<Component { ...requiredProps } verticalAlign={propVal} />)
          .should.have.className(`${propVal} ${'aligned'}`)
      })
    })
  })
}

/**
 * Assert that only a Component prop's name is converted to className.
 * @param {React.Component|Function} Component The component to test.
 * @param {String} propKey A props key.
 * @param {Object} [options={}]
 * @param {Object} [options.requiredProps={}] Props required to render the component.
 * @param {Object} [options.className=propKey] Props required to render the component.
 */
export const propKeyOnlyToClassName = (Component, propKey, options = {}) => {
  const { className = propKey, requiredProps = {} } = options
  const { assertRequired } = commonTestHelpers('propKeyOnlyToClassName', Component)

  describe(`${propKey} (common)`, () => {
    assertRequired(Component, 'a `Component`')
    assertRequired(propKey, 'a `propKey`')

    _noDefaultClassNameFromProp(Component, propKey, { requiredProps })

    it('adds prop name to className', () => {
      shallow(createElement(Component, { ...requiredProps, [propKey]: true }))
        .should.have.className(className)
    })

    it('does not add prop value to className', () => {
      // silence propType warnings
      consoleUtil.disableOnce()

      const value = 'foo-bar-baz'
      shallow(createElement(Component, { ...requiredProps, [propKey]: value }))
        .should.not.have.className(value)
    })
  })
}

/**
 * Assert that only a Component prop's value is converted to className.
 * @param {React.Component|Function} Component The component to test.
 * @param {String} propKey A props key.
 * @param {Object} [options={}]
 * @param {Object} [options.requiredProps={}] Props required to render the component.
 * @param {Object} [options.className=propKey] Props required to render the component.
 */
export const propValueOnlyToClassName = (Component, propKey, options = {}) => {
  const { requiredProps = {} } = options
  const { assertRequired } = commonTestHelpers('propValueOnlyToClassName', Component)

  describe(`${propKey} (common)`, () => {
    assertRequired(Component, 'a `Component`')
    assertRequired(propKey, 'a `propKey`')

    _definesPropOptions(Component, propKey)
    _noDefaultClassNameFromProp(Component, propKey, { requiredProps })
    _noClassNameFromBoolProps(Component, propKey, { requiredProps })

    it('adds prop value to className', () => {
      _.each(_.get(Component, `_meta.props[${propKey}]`), propValue => {
        shallow(createElement(Component, { ...requiredProps, [propKey]: propValue }))
          .should.have.className(propValue)
      })
    })

    it('does not add prop name to className', () => {
      // silence propType warnings
      consoleUtil.disableOnce()

      _.each(_.get(Component, `_meta.props[${propKey}]`), propValue => {
        shallow(createElement(Component, { ...requiredProps, [propKey]: propValue }))
          .should.not.have.className(propKey)
      })
    })
  })
}

/**
 * Assert that a Component prop's name and value are required to create a className.
 * @param {React.Component|Function} Component The component to test.
 * @param {String} propKey A props key.
 * @param {Object} [options={}]
 * @param {Object} [options.requiredProps={}] Props required to render the component.
 * @param {Object} [options.className=propKey] Props required to render the component.
 */
export const propKeyAndValueToClassName = (Component, propKey, options = {}) => {
  const { className = propKey, requiredProps = {} } = options
  const { assertRequired } = commonTestHelpers('propKeyAndValueToClassName', Component)

  describe(`${propKey} (common)`, () => {
    assertRequired(Component, 'a `Component`')
    assertRequired(propKey, 'a `propKey`')

    _definesPropOptions(Component, propKey)
    _noDefaultClassNameFromProp(Component, propKey, { requiredProps })
    _noClassNameFromBoolProps(Component, propKey, { className, requiredProps })
    _classNamePropValueBeforePropName(Component, propKey, { className, requiredProps })
  })
}

/**
 * Assert that a Component prop name or value convert to a className.
 * @param {React.Component|Function} Component The component to test.
 * @param {String} propKey A props key.
 * @param {Object} [options={}]
 * @param {Object} [options.requiredProps={}] Props required to render the component.
 * @param {Object} [options.className=propKey] Props required to render the component.
 */
export const propKeyOrValueAndKeyToClassName = (Component, propKey, options = {}) => {
  const { className = propKey, requiredProps = {} } = options
  const { assertRequired } = commonTestHelpers('propKeyOrValueAndKeyToClassName', Component)

  describe(`${propKey} (common)`, () => {
    assertRequired(Component, 'a `Component`')
    assertRequired(propKey, 'a `propKey`')

    _definesPropOptions(Component, propKey)
    _noDefaultClassNameFromProp(Component, propKey, { requiredProps })
    _classNamePropValueBeforePropName(Component, propKey, { requiredProps })
    beforeEach(() => {
      // silence propType warnings
      consoleUtil.disableOnce()
    })

    it('adds only the name to className when true', () => {
      shallow(createElement(Component, { ...requiredProps, [propKey]: true }))
        .should.have.className(className)
    })

    it('adds no className when false', () => {
      const wrapper = shallow(createElement(Component, { ...requiredProps, [propKey]: false }))

      wrapper.should.not.have.className(className)
      wrapper.should.not.have.className('true')
      wrapper.should.not.have.className('false')

      _.each(_.get(Component, `_meta.props[${propKey}]`), propVal => {
        wrapper.should.not.have.className(propVal)
      })
    })
  })
}
