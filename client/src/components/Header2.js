import React from 'react'
import PropTypes from 'prop-types'

import { fontSize } from '../config/styles'

const Header2 = ({content}) => (
  <h1
    style={styles}
  >
  {content}
  </h1>
)

const styles = {
  fontSize: fontSize.h2,
}

Header2.propTypes = {
  content: PropTypes.string,
}

export default Header2
