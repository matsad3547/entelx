import React from 'react'
import PropTypes from 'prop-types'

import DashboardSection from '../components/DashboardSection'
import DataTimeDisplay from '../components/DataTimeDisplay'

import { roundToDigits } from '../utils/'

import { colors } from '../config/styles'

const getPriceDescription = diff => {

  const displayPrc = roundToDigits(Math.abs(diff), 2)

  return diff > 0 ? `LMP is currently $${displayPrc}/MWh greater than 3-week running average` : `LMP is currently $${displayPrc}/MWh less than 3-week running average`
}

const getStatusStyles = diff => ({
  fontSize: '2em',
  fontStyle: 'italic',
  fontWeight: 'bold',
  padding: '0 0 .5em',
  boxSizing: 'border-box',
  width: 'min-content',
  color: diff > 0 ? colors.red : colors.brightGreen,
})

const ChargingIndicator = ({prices, timeZone}) => {

  const latest = prices[prices.length - 1]

  const currentPrc = latest.lmp
  const avgPrc = latest.mvgAvg

  const diff = currentPrc - avgPrc

  return (
    <DashboardSection headerContent="Status">
      <DataTimeDisplay
        millis={latest.timestamp}
        timeZone={timeZone}
        />
      {
        currentPrc < avgPrc ?
          <div style={getStatusStyles(diff)}>CHARGE</div> :
          <div style={getStatusStyles(diff)}>DISCHARGE</div>
      }
      <p>
        {getPriceDescription(diff)}
      </p>
    </DashboardSection>
  )
}

ChargingIndicator.propTypes = {
  prices: PropTypes.arrayOf(PropTypes.shape({
      lmp: PropTypes.number,
      mvgAvg: PropTypes.number,
      score: PropTypes.number,
      timestamp: PropTypes.number,
    })
  ).isRequired,
}

export default ChargingIndicator
