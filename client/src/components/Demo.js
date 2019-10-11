import React from 'react'

import PublicPageTemplate from './PublicPageTemplate'
import ProjectTools from './ProjectTools'
import Header3 from './Header3'
import DisableableLink from './DisableableLink'
import Button from '../components/button/'

const Demo = ({ match }) => (

  <PublicPageTemplate
    title={'Demo'}
    >
    {
      match.isExact &&
      <div style={styles.root}>
        <Header3
          content={'Evaluate Project Locations'}
          />
        <ul style={styles.list}>
          <li>
            <p>Coming Soon!</p>
          </li>
        </ul>
        <Header3
          content={'Build a Project'}
          />
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
        <div style={styles.link}>
          <DisableableLink to="/demo/create_project" >
            <Button
              value={'CREATE PROJECT'}
              type="primary"
              overrideStyles={styles.button}
              width={'12em'}
              />
          </DisableableLink>
        </div>
      </div>
    }
    <ProjectTools match={match}/>
  </PublicPageTemplate>
)

const styles = {
  root: {
    textAlign: 'left',
    padding: '1em 3em',
  },
  list: {
    lineHeight: '3em',
    padding: '1em 0 1em 1.5em',
    listStyle: 'disc',
  },
  link: {
    textAlign: 'right',
    padding: '0 2em',
  },
  button: {
    padding: '.8em'
  }
}

export default Demo
