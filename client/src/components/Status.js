import React from 'react'
import PropTypes from 'prop-types'

import DashboardSection from '../components/DashboardSection'
import DataTimeDisplay from '../components/DataTimeDisplay'
import ChargeStatusDisplay from '../components/ChargeStatusDisplay'
import HeadingLabel from '../components/HeadingLabel'
import DataDisplay from '../components/DataDisplay'

import { roundToDigits } from '../utils/'

const Status = ({
  prices,
  timeZone,
  chargeThreshold,
  dischargeThreshold,
  soc,
  revenue,
  energy,
}) => {

  const latest = prices[prices.length - 1]

  const currentPrc = latest.lmp
  const avgPrc = latest.mvgAvg

  return (
    <DashboardSection headerContent="Status">
      <div style={styles.root}>
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
        <div style={styles.followingSection}>
          <HeadingLabel content="State of Charge" />
          <DataDisplay content={`${roundToDigits((soc/energy) * 100, 1)} %`}/>
        </div>
        <div style={styles.followingSection}>
          <HeadingLabel content="Revenue" />
          <DataDisplay content={`$${roundToDigits(revenue, 2)}`}/>
        </div>
      </div>
    </DashboardSection>
  )
}

const styles = {
  root: {
    display: 'flex',
    padding: '0 1em',
  },
  followingSection: {
    padding: '0 0 0 2em',
  }
}

Status.propTypes = {
  prices: PropTypes.arrayOf(PropTypes.shape({
      lmp: PropTypes.number,
      mvgAvg: PropTypes.number,
      score: PropTypes.number,
      timestamp: PropTypes.number,
    })
  ).isRequired,
  soc: PropTypes.number.isRequired,
  revenue: PropTypes.number.isRequired,
  timeZone: PropTypes.string.isRequired,
}

export default Status
