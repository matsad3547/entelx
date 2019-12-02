import React from 'react'
import PropTypes from 'prop-types'

import { fontSize } from '../config/'

const Header3 = ({content}) => (
  <h3
    style={styles}
  >
  {content}
  </h3>
)

const styles = {
  fontSize: fontSize.h3,
}

Header3.propTypes = {
  content: PropTypes.string,
}

export default Header3
