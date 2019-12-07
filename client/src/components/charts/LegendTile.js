import React from 'react'

const LegendTile = ({
  color
}) => {

  return (
    <span style={getLegendTileStyles(color)}/>
  )
}

const getLegendTileStyles = color => ({
  margin: '0 12px 0 6px',
  width: 20,
  height: 10,
  background: color,
})

export default LegendTile
