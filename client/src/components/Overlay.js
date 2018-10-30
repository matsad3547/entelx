import React from 'react'
import PropTypes from 'prop-types'

const Overlay = ({addlStyles}) => (
    
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
  backgroundImage: 'linear-gradient( rgba(128, 128, 128, .3), rgba(128, 128, 128, .8))',
}

Overlay.propTypes = {
  addlStyles: PropTypes.object,
}

export default Overlay
