import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router'

import PropTypes from 'prop-types'

import Header4 from '../components/Header4'
import DisableableLink from '../components/DisableableLink'
import SubPageTemplate from '../components/SubPageTemplate'
import Button from '../components/button/'
import Loading from '../components/loading/'

import {
  singleRequest,
  parseResponse,
} from '../utils/requestUtils'

const Project = ({match, history}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const [loading, setLoading] = useState(false)

  const cleanUrl = url.replace(`/project/${projectId}`, '')

  const onDelete = () => {

    setLoading(true)

    const body = JSON.stringify({id: params.projectId})

    const request = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    }

    singleRequest('/delete_project', request)
      .then( res => {
        setLoading(false)
        history.push(`${cleanUrl}`)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error deleting your project: ${err}`)
      })
  }

  useEffect( () => {
    // setLoading(true)

    const body = JSON.stringify({id: params.projectId})

    const request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    }

    singleRequest('/read_project', request)
      .then(parseResponse)
      .then( res => console.log('project:', res))
      // .then( res => {
      //   setLoading(false)
      //   history.push(`${cleanUrl}`)
      // })
      .catch( err => {
        // setLoading(false)
        console.error(`There was an error retrieving your project: ${err}`)
      })
  })

  return (
    <SubPageTemplate title={'Project Home'}>
      { loading && <Loading message={''} />}
      <p>Project {projectId}</p>
      <div style={styles.root}>
        <nav style={styles.nav}>
          <DisableableLink to={`${cleanUrl}/roi/${params.projectId}`}>
            <Header4 content="Project ROI" />
          </DisableableLink>
          <DisableableLink to={`${cleanUrl}/dashboard/${params.projectId}`}>
            <Header4 content="Project Dashboard" />
          </DisableableLink>
        </nav>
        <Button
          value={'DELETE PROJECT'}
          type="danger"
          onClick={onDelete}
          />
      </div>
    </SubPageTemplate>
  )
}

const styles = {
  nav: {
    display: 'inline-flex',
    width: '18em',
    justifyContent: 'space-between',
    padding: '1em 3em',
  },
}

Project.propTypes = {
  content: PropTypes.string,
}

export default withRouter(Project)
