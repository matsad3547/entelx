import { useEffect } from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'

const MapMarkerRenderer = ({
  map,
  lngLat,
  color,
}) => {

  useEffect( () => {

    const marker = map && new mapboxgl.Marker({color})
                    .setLngLat(lngLat)
                    .addTo(map)

    return () => marker.remove()
  }, [])

  return false
}

MapMarkerRenderer.propTypes = {
  map: PropTypes.object,
  lngLat: PropTypes.arrayOf(PropTypes.number),
}

export default MapMarkerRenderer
