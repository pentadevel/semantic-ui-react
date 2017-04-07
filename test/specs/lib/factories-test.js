import _ from 'lodash'
import React, { isValidElement } from 'react'

import { createShorthand, createShorthandFactory } from 'src/lib'
import { sandbox } from 'test/utils'

// ----------------------------------------
// Utils
// ----------------------------------------

/**
 * Returns the result of a shorthand factory.
 */
const getShorthand = ({
  Component = 'div',
  defaultProps,
  mapValueToProps = val => ({}),
  overrideProps,
  value,
}) => createShorthand(Component, mapValueToProps, value, { defaultProps, overrideProps })

// ----------------------------------------
// Common tests
// ----------------------------------------

const itReturnsNull = (value) => {
  it('returns null', () => {
    expect(getShorthand({ value })).to.equal(null)
  })
}

const itReturnsNullGivenDefaultProps = (value) => {
  it('returns null given defaultProps object', () => {
    expect(getShorthand({ value, defaultProps: { 'data-foo': 'foo' } })).to.equal(null)
  })
}

const itReturnsAValidElement = (value) => {
  it('returns a valid element', () => {
    expect(isValidElement(getShorthand({ value }))).to.equal(true)
  })
}

const itAppliesDefaultProps = (value) => {
  it('applies defaultProps', () => {
    const defaultProps = { some: 'defaults' }

    shallow(getShorthand({ value, defaultProps }))
      .props()
      .should.deep.equal(defaultProps)
  })
}

const itDoesNotIncludePropsFromMapValueToProps = (value) => {
  it('does not include props from mapValueToProps', () => {
    const props = { 'data-foo': 'foo' }
    const wrapper = shallow(getShorthand({ value, mapValueToProps: () => props }))

    _.each(props, (val, key) => {
      wrapper.should.not.have.prop(key, val)
    })
  })
}

const itMergesClassNames = (classNameSource, extraClassName, shorthandConfig) => {
  it(`merges defaultProps className and ${classNameSource} className`, () => {
    const defaultProps = { className: 'default' }
    const overrideProps = { className: 'override' }

    shallow(getShorthand({ defaultProps, overrideProps, ...shorthandConfig }))
      .should.have.same.className(`default override ${extraClassName}`)
  })
}

const itAppliesProps = (propsSource, expectedProps, shorthandConfig) => {
  it(`applies props from the ${propsSource} props`, () => {
    shallow(getShorthand(shorthandConfig))
      .props()
      .should.deep.equal(expectedProps)
  })
}

const itOverridesDefaultProps = (propsSource, defaultProps, expectedProps, shorthandConfig) => {
  it(`overrides defaultProps with ${propsSource} props`, () => {
    shallow(getShorthand({ defaultProps, ...shorthandConfig }))
      .props()
      .should.deep.equal(expectedProps)
  })
}

const itOverridesDefaultPropsWithFalseyProps = (propsSource, shorthandConfig) => {
  it(`overrides defaultProps with falsey ${propsSource} props`, () => {
    const defaultProps = { undef: '-', nil: '-', zero: '-', empty: '-' }
    const expectedProps = { undef: undefined, nil: null, zero: 0, empty: '' }

    shallow(getShorthand({ defaultProps, ...shorthandConfig }))
      .props()
      .should.deep.equal(expectedProps)
  })
}

// ----------------------------------------
// Assertions
// ----------------------------------------

describe('factories', () => {
  describe('createShorthandFactory', () => {
    it('is a function', () => {
      createShorthandFactory.should.be.a('function')
    })

    it('does not throw if passed a function Component', () => {
      const goodUsage = () => createShorthandFactory(() => <div />, () => ({}))

      expect(goodUsage).not.to.throw()
    })

    it('does not throw if passed a string Component', () => {
      const goodUsage = () => createShorthandFactory('div', () => ({}))

      expect(goodUsage).not.to.throw()
    })

    it('throw if passed Component that is not a string nor function', () => {
      const badComponents = [undefined, null, true, false, [], {}, 123]

      _.each(badComponents, badComponent => {
        const badUsage = () => createShorthandFactory(badComponent, () => ({}))

        expect(badUsage).to.throw()
      })
    })
  })

  describe('createShorthand', () => {
    it('is a function', () => {
      createShorthand.should.be.a('function')
    })

    it('does not throw if passed a function Component', () => {
      const goodUsage = () => createShorthand(() => <div />, () => ({}))

      expect(goodUsage).not.to.throw()
    })

    it('does not throw if passed a string Component', () => {
      const goodUsage = () => createShorthand('div', () => ({}))

      expect(goodUsage).not.to.throw()
    })

    it('throw if passed Component that is not a string nor function', () => {
      const badComponents = [undefined, null, true, false, [], {}, 123]

      _.each(badComponents, badComponent => {
        const badUsage = () => createShorthand(badComponent, () => ({}))

        expect(badUsage).to.throw()
      })
    })

    describe('defaultProps', () => {
      it('can be an object', () => {
        const defaultProps = { 'data-some': 'defaults' }
        shallow(getShorthand({ value: 'foo', defaultProps }))
          .props()
          .should.deep.equal(defaultProps)
      })
    })

    describe('child key', () => {
      it('uses the `key` prop from an element', () => {
        getShorthand({ value: <div key='foo' /> })
          .should.have.property('key', 'foo')
      })

      it('uses the `key` prop as a string', () => {
        getShorthand({ value: { key: 'foo' } })
          .should.have.property('key', 'foo')
      })

      it('uses the `key` prop as a number', () => {
        getShorthand({ value: { key: 123 } })
          .should.have.property('key', '123')
      })

      it('uses the `childKey` prop as a string', () => {
        getShorthand({ value: { childKey: 'foo' } })
          .should.have.property('key', 'foo')
      })

      it('uses the `childKey` prop as a number', () => {
        getShorthand({ value: { childKey: 123 } })
          .should.have.property('key', '123')
      })

      it('calls `childKey` with the final `props` if it is a function', () => {
        const props = { foo: 'foo', childKey: sandbox.spy(({ foo }) => foo) }
        const element = getShorthand({ value: props })

        props.childKey.should.have.been.calledOnce()
        props.childKey.should.have.been.calledWithExactly({ foo: 'foo', key: 'foo' })

        element.key.should.equal('foo')
      })

      it('consumes the childKey prop', () => {
        getShorthand({ value: { childKey: 123 } })
          .props.should.not.have.property('childKey')
      })

      it('is generated from shorthand string values', () => {
        getShorthand({ value: 'foo' })
          .should.have.property('key', 'foo')
      })

      it('is generated from shorthand number values', () => {
        getShorthand({ value: 123 })
          .should.have.property('key', '123')
      })
    })

    describe('overrideProps', () => {
      it('can be an object', () => {
        const overrideProps = { 'data-some': 'overrides' }

        shallow(getShorthand({ value: 'foo', overrideProps }))
          .props()
          .should.deep.equal(overrideProps)
      })

      it('can be a function that returns defaultProps', () => {
        const overrideProps = () => ({ 'data-some': 'overrides' })

        shallow(getShorthand({ value: 'foo', overrideProps }))
          .props()
          .should.deep.equal(overrideProps())
      })

      it("is called with the user's element's and default props", () => {
        const defaultProps = { 'data-some': 'defaults' }
        const overrideProps = sandbox.spy(() => ({}))
        const userProps = { 'data-user': 'props' }
        const value = <div {...userProps} />

        shallow(getShorthand({ defaultProps, overrideProps, value }))
        overrideProps.should.have.been.calledWith({ ...defaultProps, ...userProps })
      })

      it("is called with the user's props object", () => {
        const defaultProps = { 'data-some': 'defaults' }
        const overrideProps = sandbox.spy(() => ({}))
        const userProps = { 'data-user': 'props' }

        shallow(getShorthand({ defaultProps, overrideProps, value: userProps }))
        overrideProps.should.have.been.calledWith({ ...defaultProps, ...userProps })
      })

      it('is called with the result of mapValueToProps', () => {
        const defaultProps = { 'data-some': 'defaults' }
        const overrideProps = sandbox.spy(() => ({}))
        const value = 'foo'
        const mapValueToProps = (val) => ({ 'data-mapped': val })

        shallow(getShorthand({ defaultProps, mapValueToProps, overrideProps, value }))
        overrideProps.should.have.been.calledWith({ ...defaultProps, ...mapValueToProps(value) })
      })
    })

    describe('from undefined', () => {
      itReturnsNull(undefined)
      itReturnsNullGivenDefaultProps(undefined)
    })

    describe('from null', () => {
      itReturnsNull(null)
      itReturnsNullGivenDefaultProps(null)
    })

    describe('from true', () => {
      itReturnsNull(true)
      itReturnsNullGivenDefaultProps(true)
    })

    describe('from false', () => {
      itReturnsNull(false)
      itReturnsNullGivenDefaultProps(false)
    })

    describe('from an element', () => {
      itReturnsAValidElement(<div />)
      itAppliesDefaultProps(<div />)
      itDoesNotIncludePropsFromMapValueToProps(<div />)
      itMergesClassNames('element', 'user', { value: <div className='user' /> })
      itAppliesProps('element', { foo: 'foo' }, { value: <div foo='foo' /> })
      itOverridesDefaultProps(
        'element',
        { some: 'defaults', overridden: false },
        { some: 'defaults', overridden: true },
        { value: <div overridden /> }
      )
      itOverridesDefaultPropsWithFalseyProps('element', {
        value: <div undef={undefined} nil={null} zero={0} empty='' />,
      })
    })

    describe('from a string', () => {
      itReturnsAValidElement('foo')
      itAppliesDefaultProps('foo')
      itMergesClassNames('mapValueToProps', 'mapped', {
        value: 'foo',
        mapValueToProps: () => ({ className: 'mapped' }),
      })

      itAppliesProps('mapValueToProps', { 'data-prop': 'present' }, {
        value: 'foo',
        mapValueToProps: () => ({ 'data-prop': 'present' }),
      })

      itOverridesDefaultProps(
        'mapValueToProps',
        { some: 'defaults', overridden: false },
        { some: 'defaults', overridden: true },
        {
          value: 'a string',
          mapValueToProps: (val) => ({ overridden: true }),
        }
      )

      itOverridesDefaultPropsWithFalseyProps('mapValueToProps', {
        value: 'a string',
        mapValueToProps: () => ({ undef: undefined, nil: null, zero: 0, empty: '' }),
      })
    })

    describe('from a props object', () => {
      itReturnsAValidElement({})
      itAppliesDefaultProps({})
      itDoesNotIncludePropsFromMapValueToProps({})
      itMergesClassNames('props object', 'user', {
        value: { className: 'user' },
      })

      itOverridesDefaultProps(
        'props object',
        { some: 'defaults', overridden: false },
        { some: 'defaults', overridden: true },
        {
          value: { overridden: true },
        }
      )

      itOverridesDefaultPropsWithFalseyProps('props object', {
        value: { undef: undefined, nil: null, zero: 0, empty: '' },
      })
    })

    describe('from an array', () => {
      itReturnsAValidElement(['foo'])
      itAppliesDefaultProps(['foo'])
      itMergesClassNames('mapValueToProps', 'mapped', {
        value: ['foo'],
        mapValueToProps: () => ({ className: 'mapped' }),
      })

      itAppliesProps('mapValueToProps', { 'data-prop': 'present' }, {
        value: ['foo'],
        mapValueToProps: () => ({ 'data-prop': 'present' }),
      })

      itOverridesDefaultProps(
        'mapValueToProps',
        { some: 'defaults', overridden: false },
        { some: 'defaults', overridden: true },
        {
          value: ['an array'],
          mapValueToProps: (val) => ({ overridden: true }),
        }
      )

      itOverridesDefaultPropsWithFalseyProps('mapValueToProps', {
        value: ['an array'],
        mapValueToProps: () => ({ undef: undefined, nil: null, zero: 0, empty: '' }),
      })
    })

    describe('style', () => {
      it('merges style prop', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        shallow(getShorthand({ defaultProps, overrideProps, value: userProps }))
          .should.have.prop('style').deep.equal({ left: 5, bottom: 5, right: 5 })
      })

      it('merges style prop and handles override by userProps', () => {
        const defaultProps = { style: { left: 10, bottom: 5 } }
        const userProps = { style: { bottom: 10 } }

        shallow(getShorthand({ defaultProps, value: userProps }))
          .should.have.prop('style').deep.equal({ left: 10, bottom: 10 })
      })

      it('merges style prop and handles override by overrideProps', () => {
        const userProps = { style: { bottom: 10, right: 5 } }
        const overrideProps = { style: { right: 10 } }

        shallow(getShorthand({ overrideProps, value: userProps }))
          .should.have.prop('style').deep.equal({ bottom: 10, right: 10 })
      })

      it('merges style prop from defaultProps and overrideProps', () => {
        const defaultProps = { style: { left: 10, bottom: 5 } }
        const overrideProps = { style: { bottom: 10 } }

        shallow(getShorthand({ defaultProps, overrideProps, value: 'foo' }))
          .should.have.prop('style').deep.equal({ left: 10, bottom: 10 })
      })
    })
  })
})
