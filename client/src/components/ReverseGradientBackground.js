import React from 'react'
import PropTypes from 'prop-types'

import { colors } from '../config/styles'

const ReverseGradientBackground = ({addlStyles}) => (
  <div style={{
      ...styles,
      ...addlStyles,
    }}/>
)

const styles = {
  backgroundImage: `linear-gradient(${colors.deepGreen}, ${colors.brightGreen})`,
}

ReverseGradientBackground.propTypes = {
  addlStyles: PropTypes.object,
}

export default ReverseGradientBackground
