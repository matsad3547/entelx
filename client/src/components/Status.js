import React from 'react'
import PropTypes from 'prop-types'

import DashboardSection from '../components/DashboardSection'
import DataTimeDisplay from '../components/DataTimeDisplay'
import ChargeStatusDisplay from '../components/ChargeStatusDisplay'
import HeadingLabel from '../components/HeadingLabel'
import DataDisplay from '../components/DataDisplay'
import AnimatedDataDisplay from '../components/AnimatedDataDisplay'

import { roundToDigits } from '../utils/'

const Status = ({
  prices,
  timeZone,
  chargeThreshold,
  dischargeThreshold,
  charge,
  revenue,
  energy,
  status,
}) => {

  const latest = prices[prices.length - 1]

  const currentPrc = latest.lmp
  const avgPrc = latest.mvgAvg

  return (
    <DashboardSection headerContent="Status">
      <div style={styles.root}>
        <div>
          <DataTimeDisplay
            message="Data as of"
            millis={latest.timestamp}
            timeZone={timeZone}
            />
          <ChargeStatusDisplay
            currentPrc={currentPrc}
            avgPrc={avgPrc}
            chargeThreshold={chargeThreshold}
            dischargeThreshold={dischargeThreshold}
            status={status}
            />
        </div>
        <div style={styles.followingSection}>
          <HeadingLabel content="State of Charge" />
          <DataDisplay content={`${roundToDigits((charge/energy) * 100, 1)} %`}/>
        </div>
        <div style={styles.followingSection}>
          <HeadingLabel content="Revenue" />
          <DataDisplay content={`$${roundToDigits(revenue, 2)}`}/>
        </div>
        <div style={styles.followingSection}>
          <AnimatedDataDisplay
            label="Animated State of Charge"
            seconds={5 * 60}
            value={(charge/energy) * 100}
            digits={2}
            unit={' %'}
          />
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
  charge: PropTypes.number.isRequired,
  revenue: PropTypes.number.isRequired,
  timeZone: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['charge', 'discharge', 'standby'])
}

export default Status
