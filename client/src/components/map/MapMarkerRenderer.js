import { useEffect } from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'

import { colors } from '../../config/styles'

const MapMarkerRenderer = ({
  map,
  lat,
  lng,
  color = colors.lightBlue,
}) => {

  useEffect( () => {

    const marker = map && new mapboxgl.Marker({color})
                    .setLngLat([lng, lat])
                    .addTo(map)

    return () => marker.remove()
  }, [lng, lat, color, map])

  return false
}

MapMarkerRenderer.propTypes = {
  map: PropTypes.object,
  lngLat: PropTypes.arrayOf(PropTypes.number),
}

export default MapMarkerRenderer
