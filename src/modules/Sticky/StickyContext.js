import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
} from '../../lib'

/**
 * A pushable sub-component for Sticky.
 */
function StickyContext(props) {
  const { className, children } = props
  const classes = cx('ui context', className)
  const rest = getUnhandledProps(StickyContext, props)
  const ElementType = getElementType(StickyContext, props)

  return <ElementType {...rest} className={classes}>{children}</ElementType>
}

StickyContext._meta = {
  name: 'StickyContext',
  type: META.TYPES.MODULE,
  parent: 'Sticky',
}

StickyContext.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,
}

export default StickyContext
