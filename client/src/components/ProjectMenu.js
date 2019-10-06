import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import ProjectNav from './ProjectNav'

const ProjectMenu = ({
  baseUrl,
  id,
}) => {

  const [display, setDisplay] = useState(false)

  const menuRef = useRef(null)

  const handleOutsideClick = e => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
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
      <span
        className="fas fa-bars" onClick={showMenu}
        style={styles.button}
        />
      {
        display &&
        <div ref={menuRef}>
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
  button: {
    fontSize: '1.5em',
    padding: '.5em',
    cursor: 'pointer',
  },
}

ProjectMenu.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default ProjectMenu
