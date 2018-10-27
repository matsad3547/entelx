import React from 'react'
import PropTypes from 'prop-types'

import { fontSize } from '../config/styles'

const Header1 = ({content}) => (
  <h1
    style={styles}
  >
  {content}
  </h1>
)

const styles = {
  fontSize: fontSize.h1,
}

Header1.propTypes = {
  content: PropTypes.string,
}

export default Header1
