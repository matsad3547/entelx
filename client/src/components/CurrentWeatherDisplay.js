import React from 'react'
import PropTypes from 'prop-types'

import Label from '../components/Label'
import DashboardSection from '../components/DashboardSection'
import DataDisplay from '../components/DataDisplay'
import WeatherIcon from '../components/WeatherIcon'
import DataTimeDisplay from '../components/DataTimeDisplay'

import { roundToDigits } from '../utils/'

const CurrentWeatherDisplay = ({ weather, timeZone }) => (

  <DashboardSection headerContent="Weather">
    <div>
      <WeatherIcon
        icon={weather.icon}
        style={styles.icon}
        />
      <DataTimeDisplay
        millis={weather.time * 1000}
        timeZone={timeZone}
        />
    </div>
    <div>
      <Label content="Current Temperature"/>
      <DataDisplay content={`${roundToDigits(weather.temperature, 1)}°F`}/>
    </div>
    <div>
      <Label content="Cloud Cover"/>
      <DataDisplay content={`${roundToDigits(weather.cloudCover * 100, 0)} %`}/>
    </div>
    <div>
      <Label content="Wind"/>
      <DataDisplay content={`${roundToDigits(weather.windSpeed, 1)} mph gusting to ${roundToDigits(weather.windGust, 1)} mph, bearing ${weather.windBearing}°`}/>
    </div>
    {
      weather.nearestStormDistance > 0 &&
      <div>
        <Label content="Nearest Storm"/>
        <DataDisplay content={`${weather.nearestStormDistance} mi bearing ${weather.nearestStormBearing}°`}/>
      </div>
    }
    <div style={styles.linkContainer}>
      <a
        style={styles.ds}
        target="_blank"
        rel="noopener noreferrer"
        href="https://darksky.net/poweredby/">
        Powered by Dark Sky
      </a>
    </div>
  </DashboardSection>
)

const styles = {
  linkContainer: {
    width: '100%',
    textAlign: 'right',
  },
  icon: {
    height: '5em',
    padding: '0 0 1em',
  },
  ds: {
    color: '#0BA8F7',
    textDecoration: 'none',
    fontSize: '.8em',
    textAlign: 'right',
  }
}

CurrentWeatherDisplay.propTypes = {
  weather: PropTypes.shape({
    time: PropTypes.number,
    icon: PropTypes.string,
    temperature: PropTypes.number,
    cloudCover: PropTypes.number,
    windSpeed: PropTypes.number,
    windGust: PropTypes.number,
    windBearing: PropTypes.number,
    nearestStormDistance: PropTypes.number,
    nearestStormBearing: PropTypes.number,
  }).isRequired,
}

export default CurrentWeatherDisplay
