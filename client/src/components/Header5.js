import React from 'react'
import PropTypes from 'prop-types'

import { fontSize } from '../config/styles'

const Header5 = ({content}) => (
  <h5
    style={styles}
  >
  {content}
  </h5>
)

const styles = {
  fontSize: fontSize.h5,
}

Header5.propTypes = {
  content: PropTypes.string,
}

export default Header5
