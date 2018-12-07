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

  const clusterMaxZoom = 9

  const setLayers = () => {

    if (nodes) {
      map.addSource('nodes', {
        type: "geojson",
        data: nodes,
        cluster: true,
        clusterMaxZoom,
        clusterRadius: 50,
      })

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'nodes',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': 'rgba(0, 0, 0, .2)',
          'circle-radius': [
            'step',
            ['get', 'point_count'],
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
        id: 'cluster-count',
        type: 'symbol',
        source: 'nodes',
        filter: ['has', 'point_count'],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12
        }
      });

      map.addLayer({
        id: 'unclustered-point',
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

      map.on('mouseenter', 'clusters', onClusterMouseEnter)

      map.on('mouseleave', 'clusters', onClusterMouseLeave)

      map.on('click', 'clusters', onClusterClick)
    }
  }

  const onClusterMouseEnter = () => {
    map.getCanvas().style.cursor = 'pointer'
  }

  const onClusterMouseLeave = () => {
    map.getCanvas().style.cursor = ''
  }

  const onClusterClick = e => {
    const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] })
    const clusterId = features[0].properties.cluster_id
    map.getSource('nodes').getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return
      }

      const newZoom = zoom === clusterMaxZoom ? zoom + 1 : zoom

      map.easeTo({
        center: features[0].geometry.coordinates,
        zoom: newZoom,
      })
    })
  }

  const cleanup = () => {
    map.off('mouseenter', 'clusters', onClusterMouseEnter)
    map.off('mouseleave', 'clusters', onClusterMouseLeave)
    map.off('click', 'clusters', onClusterClick)
  }

  useEffect( () => {
    setLayers()
    return () => cleanup()
  }, [nodes])

  return false
}

MapNodeRenderer.propTypes = {
  map: PropTypes.object,
}

export default MapNodeRenderer
