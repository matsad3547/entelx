import { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

const MapLocationReader = ({
  map,
  getLatLng,
}) => {

  const onClick = useCallback( e => getLatLng(e.lngLat), [getLatLng])

  const cleanUp = useCallback( () => map.off('click', onClick), [map, onClick])

  useEffect( () => {
    map.on('click', onClick)
    return cleanUp
  }, [cleanUp, map, onClick])

  return false
}

MapLocationReader.propTypes = {
  map: PropTypes.object,
  getLatLng: PropTypes.func.isRequired,
}

export default MapLocationReader
