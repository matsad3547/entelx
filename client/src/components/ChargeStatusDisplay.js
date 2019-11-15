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
  padding: '.5em 0',
  boxSizing: 'border-box',
  width: 'min-content',
})

const statusColors = {
  charge: colors.lightBlue,
  discharge: colors.brightGreen,
  standby: colors.gray,
}

const ChargeStatusDisplay = ({
  currentPrc,
  avgPrc,
  status,
}) => {

  if (currentPrc && avgPrc && status) {

    const diff = currentPrc - avgPrc

    const charge = status === 'charge'

    const discharge = status === 'discharge'

    const standby = !charge && !discharge

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
          standby &&
          <div style={getStatusStyles(statusColors.standby)}>STANDBY</div>
        }

        <p>
          {
            getPriceDescription(diff, charge, discharge)
          }
        </p>
      </div>
    )
  }
  else {
    return (
      <p style={styles.noStatus}>Status data is not currently available</p>
    )
  }
}

const styles = {
  noStatus: {
    padding: '.5em 0',
  },
}

ChargeStatusDisplay.propTypes = {
  currentPrc: PropTypes.number,
  avgPrc: PropTypes.number,
  status: PropTypes.oneOf(['charge', 'discharge', 'standby'])
}

export default ChargeStatusDisplay
