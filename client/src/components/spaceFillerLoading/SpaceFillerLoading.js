import React, {useRef} from 'react'
import PropTypes from 'prop-types'

import Logo from '../Logo'

import { colors } from '../../config/'

import { useElementWidth } from '../../hooks/'

import './SpaceFillerLoading.css'

const SpaceFillerLoading = ({
  message,
  aspect,
}) => {

  const spaceFillerRef = useRef(null)

  const width = useElementWidth(spaceFillerRef)

  return (
    <div
      ref={spaceFillerRef}
      style={getRootStyles(width, aspect)}
    >
      <div style={styles.overlay}></div>
      <Logo height={'7em'} className="sf-spinner"/>
      <div style={styles.message}>{message}</div>
    </div>
  )
}

const getRootStyles = (width, aspect) => ({
  ...styles.root,
  height: `${width/aspect}px`
})

const styles = {
  root: {
    position: 'relative',
    width: '100%',
  },
  overlay: {
    background: 'rgba(0, 30, 10, .8)',
    zIndex: 3,
    height: '100%',
    width: '100%',
  },
  message: {
    color: colors.white,
    position: 'relative',
    bottom: '28%',
    textAlign: 'center',
  }
}

SpaceFillerLoading.propTypes = {
  message: PropTypes.string.isRequired,
}

export default SpaceFillerLoading
