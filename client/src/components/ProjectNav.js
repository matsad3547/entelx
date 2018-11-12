import React from 'react'
import PropTypes from 'prop-types'

import NavButton from './navButton/'

import { colors } from '../config/styles'

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
    borderRight: `1px solid ${colors.gray}`,
  },
}

ProjectNav.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default ProjectNav
