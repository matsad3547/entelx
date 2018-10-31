import React from 'react'

import PublicPage from './PublicPage'
import Header4 from './Header4'

import CreateProject from '../containers/CreateProject'

const Demo = () => (

  <PublicPage
    title={'Demo'}
    >
    <div>
      <Header4 content={'Start by specifying your project'} />
      <CreateProject />
    </div>
  </PublicPage>
)

export default Demo
