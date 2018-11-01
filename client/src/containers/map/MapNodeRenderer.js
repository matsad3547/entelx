import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import MapMarkerRenderer from '../../components/map/MapMarkerRenderer'

import {
  singleGetRequest,
  parseResponse,
  handleError,
} from '../../utils/'

class MapNodeRenderer extends PureComponent {

  state = {
    nodes: [],
  }

  componentDidMount() {
    singleGetRequest('/get_nodes')
      .then(parseResponse)
      .then(this.setData)
      .catch(this.setError)
  }

  getNodeColor = score => '#838383'

  processNodes = nodes => nodes.map( node => ({
      lngLat: [node.lng, node.lat],
      color: this.getNodeColor(node.score)
    })
  )

  setData = nodes => this.setState({
    nodes: this.processNodes(nodes),
  })

  setError = err => handleError(this, err)

  render() {
    return (
      this.state.nodes.map( (node, i) =>
        <MapMarkerRenderer
          map={this.props.map}
          key={`node-${i}`}
          lngLat={node.lngLat}
          color={node.color}
        />
      )
    )
  }
}

MapNodeRenderer.propTypes = {
  map: PropTypes.object,
}

export default MapNodeRenderer
