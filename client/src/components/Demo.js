import React from 'react'

import PublicPage from './PublicPage'
import Header4 from './Header4'

import ProjectCreation from '../containers/ProjectCreation'

const Demo = () => (

  <PublicPage
    title={'Demo'}
    >
    <div>
      <Header4 content={'Start by specifying your project'} />
      <ProjectCreation />
    </div>
  </PublicPage>
)

export default Demo
