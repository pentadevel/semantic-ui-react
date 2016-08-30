import 'semantic-ui-css/semantic.css'
import 'highlight.js/styles/github.css'
import _ from 'lodash/fp'
import React, { Component, PropTypes } from 'react'
import analytics from 'segmentio'

import ComponentDoc from '../Components/ComponentDoc/ComponentDoc'
import PageNotFound from '../Views/PageNotFound'
import { META } from 'src/lib'
import * as stardust from 'stardust'

export default class Root extends Component {
  static propTypes = {
    children: PropTypes.node,
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }

  render() {
    const { name } = this.props.params
    const componentName = _.startCase(name).replace(/ /g, '')
    const component = stardust[componentName]
    if (!component || !component._meta || !META.isParent(component)) {
      analytics.page(componentName, 'Page Not Found')
      return <PageNotFound />
    }

    analytics.page(componentName)

    return (
      <ComponentDoc _meta={component._meta} />
    )
  }
}
