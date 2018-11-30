import React from 'react'
import PropTypes from 'prop-types'

import GradientBackground from './GradientBackground'
import Header2 from './Header2'

import { colors } from '../config/styles'

const PublicPageHeader = ({title}) => (

  <div style={styles.root}>
    <GradientBackground
      addlStyles={styles.content}
      />
    <div style={{
        ...styles.content,
        ...styles.text,
      }}>
      <Header2 content={title} />
    </div>
  </div>
)

const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: '[leftCol] auto [centerMargin] 6% [rightCol] 45% [end]',
    gridTemplateRows: '[row1] 5em [ws1] 1em',
  },
  content: {
    gridColumn: 'rightCol / end',
    gridRowStart: 'row1',
  },
  text: {
    zIndex: 2,
    color: colors.white,
    padding: '.5em 3em',
    justifySelf: 'end',
    alignSelf: 'end',
    background: 'transparent',
  },
}

PublicPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PublicPageHeader
