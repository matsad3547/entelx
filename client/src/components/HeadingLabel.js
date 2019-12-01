import React from 'react'
import PropTypes from 'prop-types'

import { fontSize } from '../config/'

const HeadingLabel = ({ content }) => (

  <span style={styles}>
    {content}
  </span>
)

const styles = {
  display: 'block',
  padding: '0 0 1em',
  fontStyle: 'italic',
  fontSize: fontSize.h4,
}

HeadingLabel.propTypes = {
  content: PropTypes.string,
}

export default HeadingLabel
