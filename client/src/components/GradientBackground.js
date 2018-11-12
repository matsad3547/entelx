import React from 'react'
import PropTypes from 'prop-types'

import { colors } from '../config/styles'

const GradientBackground = ({addlStyles}) => (
  <div style={{
      ...styles,
      ...addlStyles,
    }}/>
)

const styles = {
  backgroundImage: `linear-gradient(${colors.brightGreen}, ${colors.deepGreen})`,
}

GradientBackground.propTypes = {
  addlStyles: PropTypes.object,
}

export default GradientBackground
