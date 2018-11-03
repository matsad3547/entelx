import React from 'react'
import PropTypes from 'prop-types'

const Overlay = ({
  addlStyles,
  topColorArr,
  bottomColorArr,
}) => (

  <div
    style={{
      ...getStyles(topColorArr, bottomColorArr),
      ...addlStyles,
    }}
  />
)

const getStyles = (topColorArr, bottomColorArr) => ({
  zIndex: 1,
  height: '100%',
  backgroundImage: `linear-gradient( rgba(${topColorArr[0]}, ${topColorArr[1]}, ${topColorArr[2]}, ${topColorArr[3]}),  rgba(${bottomColorArr[0]}, ${bottomColorArr[1]}, ${bottomColorArr[2]}, ${bottomColorArr[3]}))`,
})

Overlay.propTypes = {
  addlStyles: PropTypes.object,
  colorArr: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default Overlay
