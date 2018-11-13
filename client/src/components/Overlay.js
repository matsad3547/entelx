import React from 'react'
import PropTypes from 'prop-types'

const Overlay = ({ addlStyles }) => (

  <div
    style={{
      ...styles,
      ...addlStyles,
    }}
  />
)

const styles = {
  zIndex: 1,
  height: '100%',
  backgroundImage: `linear-gradient(rgba(0, 71, 23, .2),  rgba(0, 71, 23, .9))`,
}

Overlay.propTypes = {
  addlStyles: PropTypes.object,
}

export default Overlay
