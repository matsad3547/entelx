import React from 'react'

import { colors } from '../config/styles'

const ProjectCreation = () => (

  <div style={styles.root}>
    project creation form goes here
    * Enter an address or pick a location on the map
    * Project name
    * Project capacity (MW) (MWh)
  </div>
)

const styles = {
  root: {
    color: colors.text,
  },
}
export default ProjectCreation
