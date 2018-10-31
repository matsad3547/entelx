import React from 'react'

import Map from './map/Map'
import { colors } from '../config/styles'

const ProjectCreation = () => {

  const lat = 37.5
  const lng = -117.5

  return (

    <div style={styles.root}>
      <div style={styles.form}>
        * Project name
        * Project capacity (MW) (MWh)
        project creation form goes here
        * Enter an address or pick a location on the map
      </div>
      <Map
        center={[lng, lat]}
        zoom={5}
        />
    </div>
  )
}

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    color: colors.text,
  },
  form: {
    width: '45%'
  },

}
export default ProjectCreation
