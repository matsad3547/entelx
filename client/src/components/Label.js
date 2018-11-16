import React from 'react'
import PropTypes from 'prop-types'

const Label = ({content}) => (

  <span style={labelStyle}>
    {content}
  </span>
)

export const labelStyle = {
  display: 'block',
  padding: '1em 0',
  fontStyle: 'italic',
}

Label.propTypes = {
  content: PropTypes.string,
}

export default Label
