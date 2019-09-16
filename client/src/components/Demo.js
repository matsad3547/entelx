import React from 'react'

import PublicPageTemplate from './PublicPageTemplate'
import ProjectTools from './ProjectTools'
import Header4 from './Header4'
import DisableableLink from './DisableableLink'

const Demo = ({ match }) => {

  return (

    <PublicPageTemplate
      title={'Demo'}
      >
      {
        match.isExact &&
        <div style={styles.root}>
          <Header4
            content={'Evaluate Project Locations'}
            />
          <ul style={styles.list}>
            <li>
              <p>Coming Soon!</p>
            </li>
          </ul>
          <DisableableLink to="/demo/create_project" >
            <Header4
              content={'Create a New Project'}
              />
          </DisableableLink>
          <ul style={styles.list}>
            <li>
              <p>Specify the project location either by clicking on the map or entering an address.</p>
            </li>
            <li>
              <p>Specify the power, energy capacity, and round trip efficiency of your battery or other storage technology.</p>
            </li>
            <li>
              <p>Create the project to get access to try out the Project Dashboard and Historical data visualizer.</p>
            </li>
          </ul>
        </div>
      }
      <ProjectTools match={match}/>
    </PublicPageTemplate>
  )
}

const styles = {
  root: {
    textAlign: 'left',
    padding: '1em 2em',
  },
  list: {
    lineHeight: '3em',
    padding: '0 0 0 1.5em',
    listStyle: 'disc',
  },
}

export default Demo
