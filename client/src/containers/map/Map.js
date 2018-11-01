import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

class Map extends PureComponent {

  state = {
    map: null,
  }

  componentDidMount() {

    const {
      zoom,
      center,
    } = this.props

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom,
      center,
    })

    this.setState({
      map,
    })
  }

  componentWillUnmount() {
    this.state.map.remove()
  }

  render() {

    const { map } = this.state

    const { children } = this.props

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { map, })
    )

    return (
      <div style={styles.root} ref={ node => this.mapContainer = node } >
        {map ? childrenWithProps : null}
      </div>
    )
  }
}

const styles = {
  root: {
    display: 'block',
    width: '45vw',
    height: '90vh',
    textAlign: 'justify',
  }
}

Map.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number), //[lng, lat]
  zoom: PropTypes.number,
}

export default Map
