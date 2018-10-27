import React from 'react'

import { colors } from '../config/styles'

import Header2 from './Header2'
import Header4 from './Header4'

import ProjectCreation from '../containers/ProjectCreation'

const Demo = () => (

  <div style={styles.root}>
    <Header2 content={'Demo'} />
    <Header4 content={'Start by specifying your project'} />
    <ProjectCreation />
  </div>
)

const styles = {
  root: {
    color: colors.text,
  },
}
export default Demo
