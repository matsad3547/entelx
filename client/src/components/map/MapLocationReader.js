import { useEffect } from 'react'
import PropTypes from 'prop-types'

const MapLocationReader = ({
  map,
  getLatLng,
}) => {

  const onClick = e => getLatLng(e.lngLat)

  useEffect( () => {
    map.on('click', onClick)
    return () => map.off('click', onClick)
  }, [])

  return false
}

MapLocationReader.propTypes = {
  map: PropTypes.object,
  getLatLng: PropTypes.func.isRequired,
}

export default MapLocationReader
