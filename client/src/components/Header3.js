import React from 'react'

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

export default Header3
