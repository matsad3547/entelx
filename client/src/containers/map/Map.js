import React, {
  useState,
  useEffect,
  useRef,
} from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'

const Map = ({
  zoom,
  center,
  style,
  children,
}) => {

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

  const [map, setMap] = useState(null)
  const mapContainer = useRef(null)

  useEffect( () => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom,
      center,
      minZoom: 3,
    })

    map.on('load', () => setMap(map) )

    return () => map.remove()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  const childrenWithProps = React.Children.map(children, child =>
    child && React.cloneElement(child, { map, })
  )

  return (

    <div
      style={{
        ...styles.root,
        ...style,
      }}
      ref={mapContainer}
      >
      {map && childrenWithProps}
    </div>
  )
}

const styles = {
  root: {
    display: 'block',
    boxSizing: 'border-box',
    textAlign: 'justify',
  }
}

Map.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number), //[lng, lat]
  zoom: PropTypes.number,
  style: PropTypes.object,
}

export default Map
