import React from 'react'

import DisableableLink from './DisableableLink'
import Header4 from './Header4'

const ProjectNav = ({url, id}) => (

  <ul style={styles.nav}>
    <li style={styles.linkButton}>
      <DisableableLink to={`${url}/project/${id}`}>
        <Header4 content="Project Home" />
      </DisableableLink>
    </li>
    <li style={styles.linkButton}>
      <DisableableLink to={`${url}/roi/${id}`}>
        <Header4 content="Project ROI" />
      </DisableableLink>
    </li>
    <li style={styles.linkButton}>
      <DisableableLink to={`${url}/dashboard/${id}`}>
        <Header4 content="Project Dashboard" />
      </DisableableLink>
    </li>
  </ul>
)

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'space-between',
    padding: '1.5em 3em',
  },
  linkButton: {
    border: '1px solid black',
    // display: 'block',
    // boxSizing: 'border-box',
    // height: '3em',
    width: '15em',
    padding: '1em, .5em',
  },
}

export default ProjectNav
