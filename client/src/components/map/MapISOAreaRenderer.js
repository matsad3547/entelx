import { useEffect } from 'react'
import PropTypes from 'prop-types'

const MapISOAreaRenderer = ({ map, getLatLng }) => {

  const setLayers = () => {

    map.addSource('isos', {
      type: "geojson",
      data: 'https://opendata.arcgis.com/datasets/9d1099b016e5482c900d657f06f3ac80_0.geojson',
    })

    map.addLayer({
      id: 'iso',
      type: 'fill',
      source: 'isos',
      paint: {
        'fill-color': '#088',
        'fill-opacity': 0.3,
        'fill-outline-color': '#000',
      }
    })
  }

  const cleanup = () => {
    if (map && map.getSource('isos')) {
      map.removeLayer('iso')
      map.removeSource('isos')
    }
  }

  useEffect( () => {
    setLayers()
    return () => cleanup()
  }, [])

  return false
}

MapISOAreaRenderer.propTypes = {
  map: PropTypes.object,
}

export default MapISOAreaRenderer
