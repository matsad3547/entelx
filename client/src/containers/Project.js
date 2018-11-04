import React, {useState, useEffects} from 'react'
import PropTypes from 'prop-types'

import Header4 from '../components/Header4'
import DisableableLink from '../components/DisableableLink'
import SubPageTemplate from '../components/SubPageTemplate'

const Project = ({match}) => {

  const {
    url,
    params,
  } = match

  const cleanUrl = url.replace('/project/' + params.projectId, '')

  return (
    <SubPageTemplate title={'Project Home'}>
      <p>Project {match.params.projectId}</p>
      <div style={styles.root}>
        <nav style={styles.nav}>
          <DisableableLink to={`${cleanUrl}/roi/${params.projectId}`}>
            <Header4 content="Project ROI" />
          </DisableableLink>
          <DisableableLink to={`${cleanUrl}/dashboard/${params.projectId}`}>
            <Header4 content="Project Dashboard" />
          </DisableableLink>
        </nav>
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

export default Project
