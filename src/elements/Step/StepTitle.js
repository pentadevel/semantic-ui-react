import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  ElementType,
  getUnhandledProps,
  META,
} from '../../lib'

/**
 * A step can contain a title.
 */
function StepTitle(props) {
  const { children, className, content } = props
  const classes = cx('title', className)
  const rest = getUnhandledProps(StepTitle, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

StepTitle._meta = {
  name: 'StepTitle',
  parent: 'Step',
  type: META.TYPES.ELEMENT,
}

StepTitle.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

StepTitle.create = createShorthandFactory(StepTitle, content => ({ content }))

export default StepTitle
