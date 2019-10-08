import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import NavButton from './navButton/'

import {
  colors,
  boxShadow,
} from '../config/styles'

import {
  getLocation
} from '../utils/'

const ProjectNav = ({
  baseUrl,
  id,
  match,
}) => {

  // const env = process.env.NODE_ENV

  const location = getLocation(match.url, baseUrl, id)

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
    {
      link: 'insights',
      label: 'Insights',
    },
    {
      link: 'dev',
      label: 'Development',
    }
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
          current={location === b.link}
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

export default withRouter(ProjectNav)
