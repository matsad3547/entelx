import {
  useEffect,
  useCallback,
} from 'react'
import PropTypes from 'prop-types'

import {
  isoColors
} from '../../config/styles'
import {
  isoLayerSources,
} from '../../config/map'

const MapISOAreaRenderer = ({
  map,
  getLatLng,
  iso,
}) => {

  const onLayerClick = useCallback(e => {
    const features = map.queryRenderedFeatures(e.point)
    if (features[0].layer.id === iso) {
      getLatLng(e.lngLat)
    }
  }, [map, getLatLng, iso])

  const setLayers = useCallback(() => {

    map.addSource('isos', {
      type: "geojson",
      data: isoLayerSources[iso],
    })

    map.addLayer({
      id: iso,
      type: 'fill',
      source: 'isos',
      paint: {
        'fill-color': isoColors[iso],
        'fill-opacity': 0.3,
        'fill-outline-color': '#000',
      }
    })

    if(getLatLng) {
      map.on('click', iso, onLayerClick)
    }
  }, [map, getLatLng, iso, onLayerClick])

  const cleanup = useCallback(() => {
    if (getLatLng) {
      map.off('click', iso, onLayerClick)
    }
  }, [map, iso, onLayerClick, getLatLng])

  useEffect( () => {
    setLayers()
    return () => cleanup()
  }, [])//eslint-disable-line react-hooks/exhaustive-deps

  return false
}

MapISOAreaRenderer.propTypes = {
  map: PropTypes.object,
  iso: PropTypes.oneOf(Object.keys(isoLayerSources)).isRequired,
  getLatLng: PropTypes.func,
}

export default MapISOAreaRenderer
