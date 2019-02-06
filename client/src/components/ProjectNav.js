import React from 'react'
import PropTypes from 'prop-types'

import NavButton from './navButton/'

import {
  colors,
  boxShadow,
} from '../config/styles'

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
      link: 'historical',
      label: 'Historical',
    },
    // {
    //   link: 'roi',
    //   label: 'Project ROI',
    // },
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
  boxShadow,
}

ProjectNav.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default ProjectNav
