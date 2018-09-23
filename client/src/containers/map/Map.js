import React, { PureComponent } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

class Map extends PureComponent {

  componentDidMount() {

    const {
      zoom,
      center,
    } = this.props

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom,
      center,
    })
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {

    return <div style={styles.container} ref={ node => this.mapContainer = node } />;
  }
}

const styles = {
  container: {
    position: 'absolute',
    top: 680,
    bottom: -100,
    width: '100%',
    right: '24%',
    marginBottom: '6vh',
  }
}

export default Map
