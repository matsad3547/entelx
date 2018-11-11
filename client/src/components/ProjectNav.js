import React from 'react'
import { Link } from 'react-router-dom'

import DisableableLink from './DisableableLink'
import Header4 from './Header4'
import NavButton from './navButton/'

import { colors } from '../config/styles'

const ProjectNav = ({url, id}) => {

  const buttons = [
    {
      link: 'project',
      label: 'Project Home',
    },
    {
      link: 'roi',
      label: 'Project ROI',
    },
    {
      link: 'dashboard',
      label: 'Project Dashboard',
    },
  ]

  return (

    <ul style={styles.root}>
      {buttons.map((b, i) => <NavButton
        key={`nav-button${i}`}
        url={url}
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
    width: '15em',
    backgroundImage: `linear-gradient(${colors.lightGreen}, ${colors.deepGreen})`,
  },
}

export default ProjectNav
