import { useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import {
  singleRequest,
  getRequest,
  parseResponse,
} from '../../utils/requestUtils'

import {
  nodeColors,
  colors,
} from '../../config/styles'

// const getNodeColor = node => {
//   switch (node.control_area) {
//     case 'CA':
//       return nodeColors[0]
//
//     case 'PACW':
//       return nodeColors[1]
//
//     case 'PGE':
//       return nodeColors[2]
//
//     case 'PSE':
//       return nodeColors[3]
//
//     case 'NV':
//       return nodeColors[4]
//
//     case 'IPCO':
//       return nodeColors[5]
//
//     case 'PACE':
//       return nodeColors[6]
//
//     case 'APS':
//       return nodeColors[7]
//
//     default:
//       return colors.gray
//   }
// }

const MapNodeRenderer = ({ map }) => {

  const [nodes, setNodes] = useState(null)

  useEffect( () => {
    singleRequest('/get_nodes', getRequest('GET', null))
    .then(parseResponse)
    .then( nodes => setNodes(processNodes(nodes)))
    .catch(handleError)
  }, [])

  const processNodes = nodes =>
  nodes.reduce( (obj, node) => ({
      ...obj,
      features: [
        ...obj.features,
        {
          type: 'Feature',
          properties: {
            type: node.type,
            name: node.name,
            controlArea: node.control_area,
          },
          geometry: {
            type: 'Point',
            coordinates: [node.lng, node.lat],
          },
          id: node.id,
        },
      ],
    }), {
      type: 'FeatureCollection',
      features: [],
    })

  const handleError = err => console.error(`there was an error getting nodes: ${err}`)

  if (nodes) {
    map.addSource('nodes', {
      type: "geojson",
      data: nodes,
      cluster: true,
      clusterMaxZoom: 7, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    })

    map.addLayer({
      id: "clusters",
      type: "circle",
      source: "nodes",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": 'rgba(1, 186, 239, .5)',
        'circle-radius': [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40
        ],
        'circle-stroke-width': 1,
        'circle-stroke-color': '#000',
      }
    })

    map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "nodes",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
        }
    });

    map.addLayer({
      id: "unclustered-point",
      type: "circle",
      source: "nodes",
      filter: ["!", ["has", "point_count"]],
      paint: {
          'circle-color': [
            'match',
            ['get', 'controlArea'],
            'CA', nodeColors[0],
            'PACW', nodeColors[1],
            'PGE', nodeColors[2],
            'PSE', nodeColors[3],
            'NV', nodeColors[4],
            'IPCO', nodeColors[5],
            'PACE', nodeColors[6],
            'APS', nodeColors[7],
            colors.gray,
          ],
          'circle-radius': 5,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#000',
      }
    })

    map.on('click', 'clusters', e => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] })
      const clusterId = features[0].properties.cluster_id;
      map.getSource('nodes').getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err)
            return

        map.easeTo({
            center: features[0].geometry.coordinates,
            zoom,
        })
      })
    })

    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = ''
    })
  }

  return false
}

MapNodeRenderer.propTypes = {
  map: PropTypes.object,
}

export default MapNodeRenderer
