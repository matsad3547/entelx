import React from 'react'
import PropTypes from 'prop-types'

import { fontSize } from '../config/styles'

const Header3 = ({content}) => (
  <h1
    style={styles}
  >
  {content}
  </h1>
)

const styles = {
  fontSize: fontSize.h3,
}

Header3.propTypes = {
  content: PropTypes.string,
}

export default Header3
