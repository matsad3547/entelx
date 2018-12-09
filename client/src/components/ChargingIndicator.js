import React from 'react'
import PropTypes from 'prop-types'

import DashboardSection from '../components/DashboardSection'
import DashboardSectionContent from '../components/DashboardSectionContent'
import DataTimeDisplay from '../components/DataTimeDisplay'
import ChargeStatusDisplay from '../components/ChargeStatusDisplay'

const ChargingIndicator = ({
  prices,
  timeZone,
  chargeThreshold,
  dischargeThreshold,
}) => {

  const latest = prices[prices.length - 1]

  const currentPrc = latest.lmp
  const avgPrc = latest.mvgAvg

  return (
    <DashboardSection headerContent="Status">
      <DashboardSectionContent>
        <div>
          <DataTimeDisplay
            millis={latest.timestamp}
            timeZone={timeZone}
            />
          <ChargeStatusDisplay
            currentPrc={currentPrc}
            avgPrc={avgPrc}
            chargeThreshold={chargeThreshold}
            dischargeThreshold={dischargeThreshold}
            />
        </div>
      </DashboardSectionContent>
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
  timeZone: PropTypes.string.isRequired,
}

export default ChargingIndicator
