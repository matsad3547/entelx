import React from 'react'

import PublicPageTemplate from './PublicPageTemplate'
import ProjectTools from './ProjectTools'
import Header4 from './Header4'
import DisableableLink from './DisableableLink'

const Demo = ({ match }) => {

  console.log('match:', match);

  return (

    <PublicPageTemplate
      title={'Demo'}
      >
      {
        match.isExact &&
        <div>
          <Header4
            content={'Evaluate Project Locations'}
            />
          <DisableableLink to="/demo/create_project" >
            <Header4
              content={'Create a New Project'}
              />
          </DisableableLink>
        </div>
      }
      <ProjectTools match={match}/>
    </PublicPageTemplate>
  )
}

export default Demo
