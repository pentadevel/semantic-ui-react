import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import createComponent from '../../lib/createComponent'
import Layout from '../Layout'
import listVariables from './listVariables'
import listItemRules from './listItemRules'

class ListItem extends React.Component {
  static _meta = {
    type: 'component',
    component: 'ListItem',
    parent: 'List',
  }

  static propTypes = {
    contentMedia: PropTypes.any,
    content: PropTypes.any,
    debugLayout: PropTypes.bool,
    header: PropTypes.any,
    headerMedia: PropTypes.any,

    /** A PropTypes.list,item can appear more important and draw the user's attention. */
    important: PropTypes.bool,
    media: PropTypes.any,
    renderContentArea: PropTypes.any,
    renderHeaderArea: PropTypes.any,
    renderMainArea: PropTypes.any,

    /** A PropTypes.list,item can indicate that it can be selected. */
    selection: PropTypes.bool,
    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,

    /** InPropTypes.dicates whether,the item has markers (context menu) */
    hasMarkers: PropTypes.bool,
    variables: PropTypes.any,
    styles: PropTypes.object,
    rest: PropTypes.any,
  }

  static defaultProps = {
    renderMainArea: (props, state) => {
      const {
        // debugLayout,
        renderHeaderArea,
        renderContentArea,
      } = props

      const headerArea = renderHeaderArea(props, state)
      const contentArea = renderContentArea(props, state)

      return (
        <div
          className='list-item__main'
          // debug={debugLayout}
          // vertical
          // disappearing
          // rootCSS={{
          //   gridTemplateRows: "1fr 1fr"
          // }}
          style={{
            gridTemplateRows: '1fr 1fr',
          }}
          // start={headerArea}
          // end={contentArea}
        >
          {headerArea}
          {contentArea}
        </div>
      )
    },
    renderHeaderArea: (props, state) => {
      const { debugLayout, header, headerMedia, truncateHeader, styles } = props
      const { isHovering } = state

      const classes = classNames('list-item__header', styles.header)
      const mediaClasses = classNames('list-item__headerMedia', styles.headerMedia)

      return !header && !headerMedia ? null : (
        <Layout
          className={classes}
          alignItems='end'
          gap='.8rem'
          debug={debugLayout}
          // disappearing={!truncateHeader}
          truncateMain={truncateHeader}
          rootCSS={isHovering && { color: 'inherit' }}
          main={header}
          end={!isHovering && headerMedia && <span className={mediaClasses}>{headerMedia}</span>}
        />
      )
    },

    renderContentArea: (props, state) => {
      const { debugLayout, content, contentMedia, styles, truncateContent } = props
      const { isHovering } = state

      const classes = classNames('list-item__content', styles.content)

      return !content && !contentMedia ? null : (
        <Layout
          className={classes}
          alignItems='start'
          gap='.8rem'
          debug={debugLayout}
          // disappearing={!truncateContent}
          truncateMain={truncateContent}
          rootCSS={isHovering && { color: 'inherit' }}
          main={content}
          end={!isHovering && contentMedia}
        />
      )
    },
  }

  state = {}

  handleMouseEnter = () => {
    this.setState({ isHovering: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovering: false })
  }

  render() {
    const { debugLayout, media, renderMainArea, rest, styles, hasMarkers } = this.props

    const { isHovering } = this.state

    const startArea = media
    const mainArea = renderMainArea(this.props, this.state)
    const endArea = hasMarkers && isHovering && <button>&bull&bull&bull</button>

    return (
      <Layout
        alignItems='center'
        gap='.8rem'
        className={classNames('list-item', styles.root)}
        debug={debugLayout}
        reducing
        start={startArea}
        main={mainArea}
        end={endArea}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...rest}
      />
    )
  }
}

export const ListItem_ = createComponent(ListItem, {
  rules: listItemRules,
  variables: listVariables,
})

export default ListItem
