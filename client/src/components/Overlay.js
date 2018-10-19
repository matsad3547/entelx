import React from 'react'

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
  backgroundImage: 'linear-gradient(rgba(128, 128, 128, .3), rgba(128, 128, 128, .8))',
}

export default Overlay
