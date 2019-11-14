import React, {useState, useEffect, useCallback} from 'react'

import PublicPageTemplate from '../components/PublicPageTemplate'
import ProjectTools from '../components/ProjectTools'
import Header3 from '../components/Header3'
import DisableableLink from '../components/DisableableLink'
import Button from '../components/button/'

import { defaultHeaders } from '../config'

import { singleRequest } from '../utils/requestUtils'

const Demo = ({ match }) => {

  const [demoProject, setDemoProject] = useState(null)

  const getDemoProject = useCallback( async () => {

    const request = {
      method: 'GET',
      headers: defaultHeaders,
    }

    try {
      const res = await singleRequest('/projects', request)

      const project = await res.json()

      project ? setDemoProject(project) : setDemoProject(null)
    }
    catch (err) {
      console.error(`There was an error retrieving your project: ${err}`)
    }
    finally {
    }
  }, [])

  const showDemo = match.isExact

  useEffect( () => {
    getDemoProject()
  }, [showDemo, getDemoProject])

  return (

    <PublicPageTemplate
      title={'Demo'}
      >
      {
        showDemo &&
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
              <p>Create the project to get access to the Project Dashboard, Historical data visualizer, and Insights page for requesting statistical data about prices on the selected node.</p>
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
          {
            demoProject &&
            <div style={styles.existing}>
              <p>The Entelx demo system is currently configured to allow just one project at a time.  Take a tour of one that has already been created.</p>
              <div style={styles.link}>
                <DisableableLink to={`/demo/project/${demoProject.id}`} >
                  <Button
                    value={'GO TO EXISTING PROJECT'}
                    type="primary"
                    overrideStyles={styles.button}
                    width={'16em'}
                    />
                </DisableableLink>
              </div>
            </div>
          }
        </div>
      }
      <ProjectTools match={match}/>
    </PublicPageTemplate>
  )
}


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
  },
  existing: {
    lineHeight: '3em',
  },
}

export default Demo
