import React from 'react'
import PropTypes from 'prop-types'

import NavButton from './navButton/'

const ProjectNav = ({baseUrl, id}) => {

  const buttons = [
    {
      link: 'project',
      label: 'Project Home',
    },
    {
      link: 'dashboard',
      label: 'Project Dashboard',
    },
    {
      link: 'roi',
      label: 'Project ROI',
    },
  ]

  return (

    <ul style={styles.root}>
      {buttons.map((b, i) => <NavButton
        key={`nav-button${i}`}
        baseUrl={baseUrl}
        link={b.link}
        id={id}
        label={b.label}
        />
      )}
    </ul>
  )
}

const styles = {
  root: {
    width: '18em',
  },
}

ProjectNav.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default ProjectNav
