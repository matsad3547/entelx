import React from 'react'
import PropTypes from 'prop-types'

import GradientBackground from './GradientBackground'
import Header3 from './Header3'

import { colors } from '../config/styles'

const SubPageHeader = ({title}) => (

  <div style={styles.root}>
    <GradientBackground
      addlStyles={styles.content}
      />
    <div style={{
        ...styles.content,
        ...styles.text,
      }}>
      <Header3 content={title} />
    </div>
  </div>
)

const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: '[leftCol] auto [centerMargin] 6% [rightCol] 45% [end]',
    gridTemplateRows: '[row1] 6em [ws1] 2em',
  },
  content: {
    gridColumn: 'leftCol / centerMargin',
    gridRowStart: 'row1',
  },
  text: {
    zIndex: 2,
    color: colors.white,
    padding: '1em 2em',
    justifySelf: 'start',
    alignSelf: 'end',
    background: 'transparent',
  }
}

SubPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default SubPageHeader
