import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import './Tab.css'

const Tab = ({
  path,
  label,
}) => {

  // const element = document.getElementById(`tab-${path}`);
  // element.classList.add('tabClicked');

  return (

    <NavLink
      exact
      id={`tab-${path}`}
      to={path}
      activeClassName="activeTab" className="entelxTab"
      >
      {label}
    </NavLink>
  )
}


Tab.propTypes = {
  path: PropTypes.string,
  label: PropTypes.string,
}

export default Tab
