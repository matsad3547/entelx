import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import Label from '../components/Label'
import DashboardSection from '../components/DashboardSection'
import DashboardSectionContent from '../components/DashboardSectionContent'
import DataDisplay from '../components/DataDisplay'
import WeatherIcon from '../components/WeatherIcon'
import DataTimeDisplay from '../components/DataTimeDisplay'

import { roundToDigits } from '../utils/'

const CurrentWeatherDisplay = ({ weather, timeZone }) => {

  return (

    <DashboardSection headerContent="Weather">
      { weather ?
        <DashboardSectionContent>
          <div>
            <DataTimeDisplay
              message="Data as of"
              isoString={moment(weather.time * 1000).toISOString()}
              timeZone={timeZone}
              />
            <WeatherIcon
              icon={weather.icon}
              style={styles.icon}
              />
          </div>
          <div style={styles.dataDisplay}>
            <Label content="Current Temperature"/>
            <DataDisplay content={`${roundToDigits(weather.temperature, 1)}°F`}/>
          </div>
          <div style={styles.dataDisplay}>
            <Label content="Cloud Cover"/>
            <DataDisplay content={`${roundToDigits(weather.cloudCover * 100, 0)} %`}/>
          </div>
          <div style={styles.dataDisplay}>
            <Label content="Wind"/>
            <DataDisplay content={`${roundToDigits(weather.windSpeed, 1)} mph gusting to ${roundToDigits(weather.windGust, 1)} mph, bearing ${weather.windBearing}°`}/>
          </div>
          {
            weather.nearestStormDistance > 0 &&
            <div style={styles.dataDisplay}>
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
        </DashboardSectionContent> :
        <p>Weather data is not currently available</p>
      }
    </DashboardSection>
  )
}

const styles = {
  linkContainer: {
    width: '100%',
    textAlign: 'right',
  },
  icon: {
    height: '5em',
    padding: '1em 0',
  },
  ds: {
    color: '#0BA8F7',
    textDecoration: 'none',
    fontSize: '.8em',
    textAlign: 'right',
  },
  dataDisplay: {
    padding: '0 1em 0',
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
  }),
}

export default CurrentWeatherDisplay
