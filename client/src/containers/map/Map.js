import React, {
  useState,
  useEffect,
  useRef, 
} from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

const Map = ({
  zoom,
  center,
  style,
  children,
}) => {

  const [map, setMap] = useState(null)
  const [loaded, setLoaded] = useState(false)

  const mapContainer = useRef(null)

  useEffect( () => {

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom,
      center,
      minZoom: 3,
    })

    setMap(map)

    map.on('load', () => setLoaded(true) )

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
      {loaded && childrenWithProps}
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
