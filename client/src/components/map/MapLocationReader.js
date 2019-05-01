import { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

const MapLocationReader = ({
  map,
  getLatLng,
}) => {

  const onClick = useCallback(e => getLatLng(e.lngLat), [getLatLng])

  useEffect( () => {
    map.on('click', onClick)
    return () => map.off('click', onClick)
  }, [map, onClick])

  return false
}

MapLocationReader.propTypes = {
  map: PropTypes.object,
  getLatLng: PropTypes.func.isRequired,
}

export default MapLocationReader
