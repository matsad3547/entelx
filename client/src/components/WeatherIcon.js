import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { colors } from '../config/styles'

const Skycons = require('skycons')(window)


const getIconConfig = icon => {
  switch (icon) {
    case 'clear-night':
    return {
      key: 'CLEAR_NIGHT',
      color: colors.darkBlue,
    }

    case 'rain':
    return {
      key: 'RAIN',
      color: colors.lightBlue,
    }

    case 'snow':
    return {
      key: 'SNOW',
      color: colors.lightBlue,
    }

    case 'sleet':
    return {
      key: 'SLEET',
      color: colors.lightBlue,
    }

    case 'wind':
    return {
      key: 'WIND',
      color: colors.mediumGray,
    }

    case 'fog':
    return {
      key: 'FOG',
      color: colors.mediumGray,
    }

    case 'cloudy':
    return {
      key: 'CLOUDY',
      color: colors.mediumGray,
    }

    case 'partly-cloudy-day':
    return {
      key: 'PARTLY_CLOUDY_DAY',
      color: colors.paleYellow,
    }

    case 'partly-cloudy-night':
    return {
      key: 'PARTLY_CLOUDY_NIGHT',
      color: colors.darkBlue,
    }

    default:
      return {
        key: 'CLEAR_DAY',
        color: colors.deepYellow,
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
