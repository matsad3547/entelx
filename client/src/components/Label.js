import React from 'react'
import PropTypes from 'prop-types'

import { fontSize } from '../config/'

const Label = ({ content }) => (

  <span style={labelStyle}>
    {content}
  </span>
)

export const labelStyle = {
  display: 'block',
  padding: '.5em 0',
  fontStyle: 'italic',
  fontSize: fontSize.label,
}

Label.propTypes = {
  content: PropTypes.string,
}

export default Label
