import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'

class MapMarkerRenderer extends PureComponent {
  marker = null

  componentDidMount() {

    const {
      map,
      lngLat,
    } = this.props

    if(map) {
      this.marker = new mapboxgl.Marker()
                      .setLngLat(lngLat)
                      .addTo(map)
    }
  }

  componentWillUnmount() {
    this.marker.remove()
  }

  render() {
    return false
  }
}

MapMarkerRenderer.propTypes = {
  map: PropTypes.object,
  lngLat: PropTypes.arrayOf(PropTypes.number),
}

export default MapMarkerRenderer
