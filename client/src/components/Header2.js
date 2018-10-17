import React from 'react'

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

export default Header2
