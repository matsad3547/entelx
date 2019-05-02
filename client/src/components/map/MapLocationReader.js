import { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

const MapLocationReader = ({
  map,
  getLatLng,
}) => {

  console.log('getLatLng', getLatLng);

  const onClick = e => console.log('e at onclick:', e);
  // const onClick = e => getLatLng(e.lngLat)

  const cleanUp = () => map.off('click', onClick)

  useEffect( () => {
    map.on('click', onClick)
    return cleanUp
  }, [])

  return false
}

MapLocationReader.propTypes = {
  map: PropTypes.object,
  getLatLng: PropTypes.func.isRequired,
}

export default MapLocationReader
