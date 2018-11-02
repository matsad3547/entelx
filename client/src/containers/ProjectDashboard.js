import React from 'react'

import { colors } from '../config/styles'

const ProjectDashboard = ({match}) => (

  <div style={styles.root}>
    <h1>Project Dashboard</h1>
    <p>Project id: {match.params.projectId}</p>
  </div>
)

const styles = {
  root: {
    color: colors.text,
  },
}
export default ProjectDashboard
