import { useEffect } from 'react'
import PropTypes from 'prop-types'

const MapZoomReader = ({
  map,
  getZoom,
}) => {

  const onZoomChange = e => {
    const zoom = map.getZoom()
    getZoom(zoom)
  }

  useEffect( () => {
    map.on('moveend', onZoomChange)
    return () => map.off('moveend', onZoomChange)
  }, [])

  return false
}

MapZoomReader.propTypes = {
  map: PropTypes.object,
  getZoom: PropTypes.func.isRequired,
}

export default MapZoomReader
