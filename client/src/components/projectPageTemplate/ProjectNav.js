import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import NavButton from '../navButton/'

import {
  colors,
  boxShadow,
} from '../../config/'

const ProjectNav = ({
  baseUrl,
  id,
  match,
}) => {

  const env = process.env.NODE_ENV

  const tools = [
    {
      link: 'project',
      label: 'Project Home',
      envTest: true,
    },
    {
      link: 'dashboard',
      label: 'Project Dashboard',
      envTest: true,
    },
    {
      link: 'historical',
      label: 'Historical',
      envTest: true,
    },
    {
      link: 'insights',
      label: 'Insights',
      envTest: true,
    },
    {
      link: 'dev',
      label: 'Development',
      envTest: env === 'development',
    }
    // {
    //   link: 'roi',
    //   label: 'Project ROI',
    // },
  ]

  return (

    <ul style={styles}>
      {
        tools.filter( tool => tool.envTest ).map( (t, i) => <NavButton
          key={`nav-button${i}`}
          baseUrl={baseUrl}
          link={t.link}
          id={id}
          label={t.label}
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
  boxShadow,
  display: 'flex',
  flexDirection: 'column',
}

ProjectNav.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default withRouter(ProjectNav)
