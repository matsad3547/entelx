import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import ProjectNav from './ProjectNav'

const ProjectMenu = ({
  baseUrl,
  id,
}) => {

  const [display, setDisplay] = useState(false)

  const menu = useRef(null)

  const handleOutsideClick = e => {
    if (menu.current && !menu.current.contains(e.target)) {
      setDisplay(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  })

  const showMenu = () => display ? setDisplay(false) : setDisplay(true)

  return (
    <div>
      <div style={styles.button} >
        <span className="fas fa-bars" onClick={showMenu}></span>
      </div>
      {
        display &&
        <div ref={menu}>
          <ProjectNav
            baseUrl={baseUrl}
            id={id}
            />
        </div>
      }
    </div>
  )
}

const styles = {
  root: {
    alignSelf: 'center',
  },
  button: {
    boxSizing: 'border-box',
    padding: '.5em',
    height: '97%',
    fontSize: '1.5em',
  },
}

ProjectMenu.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default ProjectMenu
