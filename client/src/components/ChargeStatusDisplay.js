import React from 'react'
import PropTypes from 'prop-types'

import { roundToDigits } from '../utils/'

import { colors } from '../config/styles'

const getPriceDescription = (diff, charge, discharge) => {

  const displayPrc = roundToDigits(Math.abs(diff), 2)

  switch (true) {
    case charge:
      return `LMP is currently $${displayPrc}/MWh less than 3-week running average`

    case discharge:
      return `LMP is currently $${displayPrc}/MWh greater than 3-week running average`

    default:
      return 'Prices are not currently favorable for charging or discharging'
  }
}

const getStatusStyles = color => ({
  color,
  fontSize: '2em',
  fontStyle: 'italic',
  fontWeight: 'bold',
  padding: '0 0 .5em',
  boxSizing: 'border-box',
  width: 'min-content',
})

const statusColors = {
  charge: colors.red,
  discharge: colors.brightGreen,
  standby: colors.lightBlue,
}

const ChargeStatusDisplay = ({
  currentPrc,
  avgPrc,
  chargeThreshold,
  dischargeThreshold,
}) => {

  const diff = currentPrc - avgPrc

  const charge = currentPrc < avgPrc - chargeThreshold

  const discharge = currentPrc > avgPrc + dischargeThreshold

  return (
    <div>
      {
        charge &&
        <div style={getStatusStyles(statusColors.charge)}>
          CHARGE
        </div>
      }
      {
        discharge &&
        <div style={getStatusStyles(statusColors.discharge)}>DISCHARGE</div>
      }
      {
        (!charge && !discharge) &&
        <div style={getStatusStyles(statusColors.standby)}>STANDBY</div>
      }
      <p>
        {getPriceDescription(diff, charge, discharge)}
      </p>
    </div>
  )
}

ChargeStatusDisplay.propTypes = {
  currentPrc: PropTypes.number.isRequired,
  avgPrc: PropTypes.number.isRequired,
  chargeThreshold: PropTypes.number.isRequired,
  dischargeThreshold: PropTypes.number.isRequired,
}

export default ChargeStatusDisplay
