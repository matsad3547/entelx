import React from 'react'
import PropTypes from 'prop-types'

import { fontSize } from '../config/'

const Header4 = ({content}) => (
  <h4
    style={styles}
  >
  {content}
  </h4>
)

const styles = {
  fontSize: fontSize.h4,
}

Header4.propTypes = {
  content: PropTypes.string,
}

export default Header4
