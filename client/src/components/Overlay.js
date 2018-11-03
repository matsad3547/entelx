import React from 'react'
import PropTypes from 'prop-types'

const Overlay = ({
  addlStyles,
  colorArr,
}) => (

  <div
    style={{
      ...getStyles(colorArr),
      ...addlStyles,
    }}
  />
)

const getStyles = colorArr => ({
  zIndex: 1,
  height: '100%',
  backgroundImage: `linear-gradient( rgba(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]}, .2), rgba(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]}, .95))`,
})

Overlay.propTypes = {
  addlStyles: PropTypes.object,
  colorArr: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default Overlay
