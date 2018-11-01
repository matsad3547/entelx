import { PureComponent } from 'react'
import PropTypes from 'prop-types'

class MapLocationReader extends PureComponent {

  componentDidMount() {

    const {
      map,
      getLatLng,
    } = this.props

    if(map) {
      map.on('click', e => getLatLng(e.lngLat))
    }
  }
  
  render() {
    return false
  }
}

MapLocationReader.propTypes = {
  map: PropTypes.object,
  getLatLng: PropTypes.func.isRequired,
}

export default MapLocationReader
