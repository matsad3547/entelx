import {
  useEffect,
  useCallback,
} from 'react'
import PropTypes from 'prop-types'

import {
  isoColors
} from '../../config/styles'

const MapISOAreaRenderer = ({
  map,
  getLatLng,
  isoLayer,
  iso,
}) => {

  const onLayerClick = useCallback(e => {
    const features = map.queryRenderedFeatures(e.point)
    if (features[0].layer.id === iso) {
      getLatLng(e.lngLat)
    }
  }, [getLatLng, iso])//eslint-disable-line react-hooks/exhaustive-deps

  const setLayers = useCallback(() => {

    map.addSource('isos', {
      type: "geojson",
      data: isoLayer,
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
  }, [isoLayer, getLatLng, iso, onLayerClick])//eslint-disable-line react-hooks/exhaustive-deps

  const cleanup = useCallback(() => {
    if (map && map.getSource('isos')) {
      map.removeLayer(iso)
      map.removeSource('isos')
      if (getLatLng) {
        map.off('click', iso, onLayerClick)
      }
    }
  }, [iso, onLayerClick])//eslint-disable-line react-hooks/exhaustive-deps

  useEffect( () => {
    setLayers()
    return () => cleanup()
  }, [])//eslint-disable-line react-hooks/exhaustive-deps

  return false
}

MapISOAreaRenderer.propTypes = {
  map: PropTypes.object,
  isoLayer: PropTypes.string.isRequired, //link to arcgis data layer
  iso: PropTypes.oneOf(['caiso', 'ercot']).isRequired,
  getLatLng: PropTypes.func,
}

export default MapISOAreaRenderer
