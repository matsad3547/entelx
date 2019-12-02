import { useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'

import mapboxgl from 'mapbox-gl'

import {
  singleRequest,
} from '../../utils/'

import {
  nodeColors,
  colors,
  defaultHeaders,
} from '../../config/'

const MapNodeRenderer = ({ map }) => {

  const [nodes, setNodes] = useState(null)

  useEffect( () => {
    const getNodes = async () => {

      const request = {
        method: 'GET',
        headers: defaultHeaders,
      }

      try {
        const res = await singleRequest('/nodes', request)

        const nodes = await res.json()

        setNodes(nodes)
      }
      catch (err) {
        console.error(`there was an error getting nodes: ${err}`)
      }
    }
    getNodes()
  }, [])

  const formatNodeLabels = nodeKey => {
    switch (nodeKey) {
      case 'type':
        return 'Type'

      case 'name':
        return 'Name'

      // case 'maxMw':
      //   return 'Max Mw'

      case 'controlArea':
        return 'Control Area'

      default:
        return nodeKey
    }
  }

  const clusterMaxZoom = 9

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  })

  const onNodeMouseEnter = useCallback( e => {
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
  }, [map, popup])

  const onNodeMouseLeave = useCallback(() => {
    map.getCanvas().style.cursor = ''
    popup.remove()
  }, [map, popup])

  const onClusterMouseEnter = useCallback(() => {
    map.getCanvas().style.cursor = 'pointer'
  }, [map])

  const onClusterMouseLeave = useCallback(() => {
    map.getCanvas().style.cursor = ''
  }, [map])

  const onClusterClick = useCallback( e => {

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
  }, [map])

  const setLayers = useCallback(() => {

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
  }, [map, nodes, onClusterClick, onClusterMouseEnter, onClusterMouseLeave, onNodeMouseEnter, onNodeMouseLeave])

  const cleanUp = useCallback(() => {
    map.off('mouseenter', 'clusters', onClusterMouseEnter)
    map.off('mouseleave', 'clusters', onClusterMouseLeave)
    map.off('click', 'clusters', onClusterClick)
    map.off('mouseenter', 'unclustered-nodes', onNodeMouseEnter)
    map.off('mouseleave', 'unclustered-nodes', onNodeMouseLeave)
  }, [map, onClusterClick, onClusterMouseEnter, onClusterMouseLeave, onNodeMouseEnter, onNodeMouseLeave])

  useEffect( () => {
    setLayers()
    return cleanUp
  }, [nodes]) //eslint-disable-line react-hooks/exhaustive-deps

  return false
}

MapNodeRenderer.propTypes = {
  map: PropTypes.object,
}

export default MapNodeRenderer
