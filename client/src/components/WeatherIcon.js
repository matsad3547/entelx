import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const Skycons = require('skycons')(window)

const getIconConfig = icon => {
  switch (icon) {
    case 'clear-night':
    return {
      key: 'CLEAR_NIGHT',
      color: '#082656',
    }

    case 'rain':
    return {
      key: 'RAIN',
      color: '#01BAEF',
    }

    case 'snow':
    return {
      key: 'SNOW',
      color: '#01BAEF',
    }

    case 'sleet':
    return {
      key: 'SLEET',
      color: '#01BAEF',
    }

    case 'wind':
    return {
      key: 'WIND',
      color: '#01BAEF',
    }

    case 'fog':
    return {
      key: 'FOG',
      color: '#A0A0A0',
    }

    case 'cloudy':
    return {
      key: 'CLOUDY',
      color: '#A0A0A0',
    }

    case 'partly-cloudy-day':
    return {
      key: 'PARTLY_CLOUDY_DAY',
      color: '#FFE659',
    }

    case 'partly-cloudy-night':
    return {
      key: 'PARTLY_CLOUDY_NIGHT',
      color: '#082656',
    }

    default:
      return {
        key: 'CLEAR_DAY',
        color: '#FFD800',
      }
  }
}

const WeatherIcon = ({icon, style}) => {

  const iconConfig = getIconConfig(icon)

  const skycons = new Skycons({color: iconConfig.color})

  const iconRef = useRef(null)

  useEffect( () => {

    skycons.add(iconRef.current, Skycons[iconConfig.key])

    skycons.play()

    return () => skycons.remove(iconRef.current)
  }, [icon])

  return (
    <canvas width='128' height='128' style={style} ref={iconRef}></canvas>
  )
}

WeatherIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  style: PropTypes.object,
}

export default WeatherIcon
