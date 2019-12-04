import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import { useAddClassOnClick } from '../../hooks/'

import './Tab.css'

const Tab = ({
  path,
  label,
}) => {

  const tab = useRef(null)

  useAddClassOnClick(tab)

  return (

    <NavLink
      exact
      ref={tab}
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
