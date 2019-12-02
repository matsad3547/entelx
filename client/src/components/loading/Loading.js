import React from 'react'
import Logo from '../Logo'
import './Loading.css'

import { colors } from '../../config/'

const Loading = ({message}) => (

  <div style={styles.main}>
    <div style={styles.overlay}></div>
    <Logo height={'9.5em'} className="spinner"/>
    <div style={styles.message}>{message}</div>
  </div>
)

const styles = {
  main: {
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 4,
  },
  overlay: {
    background: 'rgba(0, 30, 10, .8)',
    zIndex: 3,
    height: '100vh',
    width: '100vw',
  },
  message: {
    color: colors.white,
    position: 'relative',
    bottom: '34vh',
  }
}

export default Loading
