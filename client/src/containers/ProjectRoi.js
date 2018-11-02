import React from 'react'
import PropTypes from 'prop-types'

import { fontSize } from '../config/styles'

const ProjectRoi = ({match}) => {

  return (
    <div>
      <h1
        style={styles}
        >
        Project Return on Investment
      </h1>
      <p>{match.params.projectId}</p>
    </div>
  )
}

const styles = {
  fontSize: fontSize.h1,
}

export default ProjectRoi
