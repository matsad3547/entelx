import React from 'react'
import PropTypes from 'prop-types'

import DashboardSection from '../components/DashboardSection'

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

const ChargingIndicator = ({prices}) => {

  const currentPrc = prices[prices.length - 1].lmp
  const avgPrc = prices[prices.length - 1].mvgAvg

  const diff = currentPrc - avgPrc

  return (
    <DashboardSection headerContent="Status">
      {
        prices[prices.length - 1].lmp < prices[prices.length - 1].mvgAvg ?
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
