import React from 'react'
import PropTypes from 'prop-types'

import Overlay from './Overlay'
import Header2 from './Header2'

import { rgbColors } from '../config/styles'

const PublicPageHeader = ({title}) => (

  <div style={styles.root}>
    <Overlay
      addlStyles={styles.content}
      topColorArr={[...rgbColors.header, .2]}
      bottomColorArr={[...rgbColors.header, .95]}
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
    gridTemplateColumns: '[leftCol] auto [centerMargin] 10% [rightCol] 45% [end]',
    gridTemplateRows: '[row1] 7em [ws1] 2em',
  },
  content: {
    gridColumn: 'rightCol / end',
    gridRowStart: 'row1',
  },
  text: {
    zIndex: 2,
    color: '#fff',
    padding: '1em 3em',
    justifySelf: 'end',
    alignSelf: 'end',
    background: 'transparent',
  }
}

PublicPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PublicPageHeader
