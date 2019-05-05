import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'

import HeadingLabel from '../components/HeadingLabel'
import DataDisplay from '../components/DataDisplay'

import { roundToDigits } from '../utils/'

const AnimatedDataDisplay = ({
  value,
  seconds,
  label,
  digits = 0,
  unit = '',
  dollars = false,
}) => {

  const [prevVal, setPrevVal] = useState(0)
  const [nextVal, setNextVal] = useState(0)
  const [displayVal, setDisplayVal] = useState(0)

  useEffect( () => {
    setPrevVal(nextVal)
    setNextVal(value)
    return () => {
      setPrevVal(0)
      setNextVal(0)
    }
  }, [value, nextVal])

  const timerRef = useRef(null)


  useEffect( () => {
    console.log('hitting use effect?');
    timerRef.current = setInterval( () => {
      console.log('values in effect?', prevVal, nextVal);

      const step = (nextVal - prevVal) / seconds
      console.log('step?', step);

      setDisplayVal(displayVal + step)
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [prevVal, nextVal, seconds])

  return (
    <div>
      <HeadingLabel content={label} />
      <DataDisplay content={`${dollars && '$'}${roundToDigits(displayVal, digits)} ${unit}`}/>
    </div>
  )
}

AnimatedDataDisplay.propTypes = {
  value: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  digits: PropTypes.number,
  unit: PropTypes.number,
  dollars: PropTypes.bool,
}

export default AnimatedDataDisplay
