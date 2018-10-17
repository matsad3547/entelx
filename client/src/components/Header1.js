import React from 'react'

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

export default Header1
