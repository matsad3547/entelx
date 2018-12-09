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
    {
      link: 'historical',
      label: 'Historical',
    },
  ]

  return (

    <ul style={styles}>
      {
        buttons.map( (b, i) => <NavButton
          key={`nav-button${i}`}
          baseUrl={baseUrl}
          link={b.link}
          id={id}
          label={b.label}
          />
        )
      }
    </ul>
  )
}

const styles = {
  position: 'absolute',
  zIndex: 2,
  background: colors.white,
  width: '13em',
  padding: '.5em 1em',
  borderRight: `1px solid ${colors.gray}`,
  boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
}

ProjectNav.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default ProjectNav
