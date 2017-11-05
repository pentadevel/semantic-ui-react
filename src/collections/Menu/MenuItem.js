import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  ElementType,
  getUnhandledProps,
  META,
  SUI,
  useKeyOnly,
  useKeyOrValueAndKey,
} from '../../lib'
import Icon from '../../elements/Icon'

/**
 * A menu can contain an item.
 */
export default class MenuItem extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** A menu item can be active. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Additional colors can be specified. */
    color: PropTypes.oneOf(SUI.COLORS),

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A menu item can be disabled. */
    disabled: PropTypes.bool,

    /** A menu item or menu can remove element padding, vertically or horizontally. */
    fitted: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['horizontally', 'vertically']),
    ]),

    /** A menu item may include a header or may itself be a header. */
    header: PropTypes.bool,

    /** MenuItem can be only icon. */
    icon: PropTypes.oneOfType([
      PropTypes.bool,
      customPropTypes.itemShorthand,
    ]),

    /** MenuItem index inside Menu. */
    index: PropTypes.number,

    /** A menu item can be link. */
    link: PropTypes.bool,

    /** Internal name of the MenuItem. */
    name: PropTypes.string,

    /**
     * Called on click. When passed, the component will render as an `a`
     * tag by default instead of a `div`.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /** A menu item can take left or right position. */
    position: PropTypes.oneOf(['left', 'right']),
  }

  static _meta = {
    name: 'MenuItem',
    type: META.TYPES.COLLECTION,
    parent: 'Menu',
  }

  computeType = () => {
    const { onClick } = this.props

    if (onClick) return 'a'
  }

  handleClick = (e) => {
    const { disabled } = this.props

    if (!disabled) _.invoke(this.props, 'onClick', e, this.props)
  }

  render() {
    const {
      active,
      children,
      className,
      color,
      content,
      disabled,
      fitted,
      header,
      icon,
      link,
      name,
      position,
    } = this.props

    const classes = cx(
      color,
      position,
      useKeyOnly(active, 'active'),
      useKeyOnly(disabled, 'disabled'),
      useKeyOnly(icon === true || (icon && !(name || content)), 'icon'),
      useKeyOnly(header, 'header'),
      useKeyOnly(link, 'link'),
      useKeyOrValueAndKey(fitted, 'fitted'),
      'item',
      className,
    )
    const rest = getUnhandledProps(MenuItem, this.props)

    if (!childrenUtils.isNil(children)) {
      return (
        <ElementType {...rest} className={classes} computeType={this.computeType} onClick={this.handleClick}>
          {children}
        </ElementType>
      )
    }

    return (
      <ElementType {...rest} className={classes} computeType={this.computeType} onClick={this.handleClick}>
        {Icon.create(icon)}
        {childrenUtils.isNil(content) ? _.startCase(name) : content}
      </ElementType>
    )
  }
}

MenuItem.create = createShorthandFactory(MenuItem, val => ({ content: val, name: val }))
