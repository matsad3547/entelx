import React from 'react'
import PropTypes from 'prop-types'

import DataDisplay from '../components/DataDisplay'
import { useInterpolateValues } from '../hooks/'

const AnimatedDataDisplay = ({
  value,
  seconds,
  digits = 0,
  unit = '',
  dollars = false,
}) => {

  const displayVal = useInterpolateValues(value, seconds)

  return (
    <DataDisplay content={`${dollars ?  '$' : ''}${displayVal.toFixed(digits)} ${unit}`}/>
  )
}

AnimatedDataDisplay.propTypes = {
  value: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  digits: PropTypes.number,
  unit: PropTypes.string,
  dollars: PropTypes.bool,
}

export default AnimatedDataDisplay
