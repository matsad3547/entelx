import React from 'react'
import PropTypes from 'prop-types'

import DashboardSection from '../components/DashboardSection'
import DataTimeDisplay from '../components/DataTimeDisplay'
import ChargeStatusDisplay from '../components/ChargeStatusDisplay'
import HeadingLabel from '../components/HeadingLabel'
import DataDisplay from '../components/DataDisplay'
// import AnimatedDataDisplay from '../components/AnimatedDataDisplay'

import { roundToDigits } from '../utils/'

const Status = ({
  config,
  prices,
  charge,
  revenue,
  status,
}) => {

  const latest = prices && prices[prices.length - 1]
  const currentPrc = latest && latest.lmp
  const avgPrc = latest && latest.mvgAvg
  const timestamp = latest && latest.timestamp

  return (
    <DashboardSection headerContent="Status">
      <div style={styles.root}>
        <div>
          {
            timestamp &&
            <DataTimeDisplay
              message="Data as of"
              millis={timestamp}
              timeZone={config.timeZone}
              />
          }
          <ChargeStatusDisplay
            currentPrc={currentPrc}
            avgPrc={avgPrc}
            status={status}
            />
        </div>
        <div style={styles.followingSection}>
          <HeadingLabel content="State of Charge" />
          {
            (charge && config.energy) ?
            <DataDisplay content={`${roundToDigits((charge/config.energy) * 100, 1)} %`}/> :
              <span>State of charge data is not currently available</span>
            }
          </div>
          <div style={styles.followingSection}>
            <HeadingLabel content="Revenue" />
            {
              revenue ?
              <DataDisplay content={`$${roundToDigits(revenue, 2)}`}/> :
                <span>Revenue data is not currently available</span>
              }
            </div>
            {/*<div style={styles.followingSection}>
            <AnimatedDataDisplay
            label="Animated State of Charge"
            seconds={5 * 60}
            value={(charge/energy) * 100}
            digits={2}
            unit={' %'}
            />
            </div>*/}
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
  config: PropTypes.shape({
    energy: PropTypes.number,
    timeZone: PropTypes.string,
  }),
  prices: PropTypes.arrayOf(PropTypes.shape({
      lmp: PropTypes.number,
      mvgAvg: PropTypes.number,
      score: PropTypes.number,
      timestamp: PropTypes.number,
    })
  ),
  charge: PropTypes.number,
  revenue: PropTypes.number,
  status: PropTypes.oneOf(['charge', 'discharge', 'standby'])
}

export default Status
