import React from 'react'
import PropTypes from 'prop-types'

import Overlay from './Overlay'
import Header2 from './Header2'

const PageHeader = ({title}) => (

  <div style={styles.root}>
    <Overlay addlStyles={styles.content}/>
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
    gridTemplateColumns: '[leftCol] auto [centerMargin] 20% [rightCol] 40% [end]',
    gridTemplateRows: '[row1] 7em [ws1] 2em',
  },
  content: {
    gridColumn: 'rightCol / end',
    gridRowStart: 'row1',
  },
  text: {
    zIndex: 2,
    color: '#fff',
    padding: '1em 6em',
    justifySelf: 'end',
    alignSelf: 'end',
    background: 'transparent',
  }
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PageHeader
