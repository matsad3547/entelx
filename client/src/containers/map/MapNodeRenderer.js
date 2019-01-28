import { useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import mapboxgl from 'mapbox-gl'

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
    singleRequest('/nodes', getRequest('GET', null))
    .then(parseResponse)
    .then( nodes => setNodes(processNodes(nodes)))
    .catch(handleError)
  }, [])

  const processNodes = nodes => nodes.reduce( (obj, node) => ({
      ...obj,
      features: [
        ...obj.features,
        {
          type: 'Feature',
          properties: {
            type: node.type,
            name: node.name,
            maxMw: node.maxMw,
            controlArea: node.controlArea,
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

  const formatNodeLabels = nodeKey => {
    switch (nodeKey) {
      case 'type':
        return 'Type'

      case 'name':
        return 'Name'

      case 'maxMw':
        return 'Max Mw'

      case 'controlArea':
        return 'Control Area'

      default:
        return nodeKey
    }
  }

  const handleError = err => console.error(`there was an error getting nodes: ${err}`)

  const clusterMaxZoom = 9

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  })

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
        id: 'unclustered-nodes',
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

      map.on('mouseenter', 'unclustered-nodes', onNodeMouseEnter)

      map.on('mouseleave', 'unclustered-nodes', onNodeMouseLeave)
    }
  }

  const onNodeMouseEnter = e => {
    map.getCanvas().style.cursor = 'pointer'

    const coordinates = e.features[0].geometry.coordinates.slice()

    const nodeProps = e.features[0].properties

    const popUpHtml = Object.keys(nodeProps).reduce( (str, np, i, keys) => {

      let newLine = `<tr><td><strong>${formatNodeLabels(np)}:</strong></td><td>${ nodeProps[np]}</td></tr>`

      newLine = i < keys.length - 1 ? newLine + '*' : newLine

      const arr = str.split('*')

      return [arr[0], newLine, arr[1]].join('')
    }, '<table>*</table>')

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    popup.setLngLat(coordinates)
      .setHTML(popUpHtml)
      .addTo(map)
  }

  const onNodeMouseLeave = () => {
    map.getCanvas().style.cursor = ''
    popup.remove()
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
    map.off('mouseenter', 'unclustered-nodes', onNodeMouseEnter)
    map.off('mouseleave', 'unclustered-nodes', onNodeMouseLeave)
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
