import { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

const MapZoomReader = ({
  map,
  getZoom,
}) => {

  const onZoomChange = useCallback( e => {
    const zoom = map.getZoom()
    getZoom(zoom)
  }, [map, getZoom])

  useEffect( () => {
    map.on('moveend', onZoomChange)
    return () => map.off('moveend', onZoomChange)
  }, [map, onZoomChange])

  return false
}

MapZoomReader.propTypes = {
  map: PropTypes.object,
  getZoom: PropTypes.func.isRequired,
}

export default MapZoomReader
