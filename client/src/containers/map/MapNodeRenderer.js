import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import * as Rx from 'rxjs'
import * as ops from 'rxjs/operators'

import MapMarkerRenderer from '../../components/map/MapMarkerRenderer'

import {
  singleRequest,
  getRequest,
  parseResponse,
} from '../../utils/requestUtils'

import {
  nodeColors,
  colors,
} from '../../config/styles'

const getNodeColor = node => {
  switch (node.control_area) {
    case 'CA':
      return nodeColors[0]

    case 'PACW':
      return nodeColors[1]

    case 'PGE':
      return nodeColors[2]

    case 'PSE':
      return nodeColors[3]

    case 'NV':
      return nodeColors[4]

    case 'IPCO':
      return nodeColors[5]

    case 'PACE':
      return nodeColors[6]

    case 'APS':
      return nodeColors[7]

    default:
      return colors.gray
  }
}

const MapNodeRenderer = ({ map }) => {

  const bounds = map.getBounds()

  const minLat = bounds._sw.lat
  const maxLat = bounds._ne.lat

  const minLng = bounds._ne.lng
  const maxLng = bounds._sw.lng

  console.log('rxjs?', Rx, '\nops?', ops)

  const [nodes, setNodes] = useState(null)

  const buttonRef = useRef(null)

  useEffect( () => {
    singleRequest('/get_nodes', getRequest('GET', null))
      .then(parseResponse)
      .then(setNodes)
      .catch(handleError)
  }, [])

  const handleError = err => console.error(`there was an error getting nodes: ${err}`)

  console.log('nodes?', nodes);

  return false

  // const nodeStream = nodes && Rx.from(nodes)
  //
  // buttonRef.current && Rx.fromEvent(buttonRef.current, 'click')
  //   .pipe(ops.bufferCount(3))
  //   .subscribe( () => console.log('clicking, motherfuckers!!!') )
  //
  // const nodeStreamF = nodes && nodeStream.pipe(ops.filter( node => node.lat < maxLat && node.lat > minLat && node.lng < maxLng && node.lng > minLng)).subscribe( node => console.log('node:', node) )
  //
  // console.log('node stream filtered:', nodeStreamF);

// return (
//   // false
//   <button
//     style={styles.root}
//     ref={buttonRef}>CLICK ME</button>
// )

  // return (
  //   nodes &&
  //   nodes.filter( node => node.control_area == 'APS' ).map( (node, i) =>
  //     <MapMarkerRenderer
  //       map={map}
  //       key={`node-${i}`}
  //       lngLat={[node.lng, node.lat]}
  //       color={getNodeColor(node)}
  //     />
  //   )
  // )
}

const styles = {
  root: {
    position: 'relative',
    background: 'red',
    zIndex: 10,
  }
}

MapNodeRenderer.propTypes = {
  map: PropTypes.object,
}

export default MapNodeRenderer
