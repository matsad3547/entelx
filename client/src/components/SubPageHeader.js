import React from 'react'
import PropTypes from 'prop-types'

import Overlay from './Overlay'
import Header3 from './Header3'

const SubPageHeader = ({title}) => (

  <div style={styles.root}>
    <Overlay addlStyles={styles.content}/>
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
    gridTemplateColumns: '[leftCol] auto [centerMargin] 10% [rightCol] 45% [end]',
    gridTemplateRows: '[row1] 6em [ws1] 2em',
  },
  content: {
    gridColumn: 'leftCol / centerMargin',
    gridRowStart: 'row1',
  },
  text: {
    zIndex: 2,
    color: '#fff',
    padding: '1em 3em',
    justifySelf: 'start',
    alignSelf: 'end',
    background: 'transparent',
  }
}

SubPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default SubPageHeader
