import React from 'react'
import PropTypes from 'prop-types'

import { fontSize } from '../config/'

const Header2 = ({content}) => (
  <h2
    style={styles}
  >
  {content}
  </h2>
)

const styles = {
  fontSize: fontSize.h2,
}

Header2.propTypes = {
  content: PropTypes.string,
}

export default Header2
