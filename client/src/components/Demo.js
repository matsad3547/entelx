import React from 'react'

import PublicPage from './PublicPage'
import Header3 from './Header3'

import CreateProject from '../containers/CreateProject'

const Demo = () => (

  <PublicPage
    title={'Demo'}
    >
    <div>
      <Header3 content={'Start by specifying your project'} />
      <CreateProject />
    </div>
  </PublicPage>
)

export default Demo
