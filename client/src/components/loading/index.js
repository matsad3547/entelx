import React from 'react'
import Logo from '../logo/'
import './Loading.css'

import { colors } from '../../config/styles'

const Loading = ({message}) => (

  <div
    style={styles.main}
    >
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
  logo: {
    position: 'relative',
    bottom: '75vh',
    height: 300, //plain numbers in inline styles are interpreted as px
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
    bottom: '72vh',
  }
}

export default Loading
