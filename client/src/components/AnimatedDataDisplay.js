import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'

import HeadingLabel from '../components/HeadingLabel'
import DataDisplay from '../components/DataDisplay'

import { roundToDigits } from '../utils/'


const useInterpolateValues = (value, seconds) => {

  const [displayVal, setDisplayVal] = useState(0)
  const [restart, setRestart] = useState(true) //eslint-disable-line no-unused-vars

  const timerRef = useRef({interval: null, timer: null})
  const valRef = useRef({nextVal: 0, prevVal: 0})

  useEffect( () => {

    valRef.current = {
      prevVal: valRef.current.prevVal === 0 ? value : valRef.current.nextVal,
      nextVal: value,
    }

    const {
      prevVal,
      nextVal,
    } = valRef.current

    const step = (nextVal - prevVal) / seconds

    console.log('updating interpolate hook - next val:', nextVal, 'prev val:', prevVal);

    if (prevVal !== nextVal) {
      console.log('updating at if');
      timerRef.current.interval = setInterval( () => {

        setDisplayVal( displayVal => displayVal + step)
      }, 1000)
    }
    else {
      console.log('setting value at else');
      setDisplayVal(value)
    }

    timerRef.current.timer = setTimeout( () => {
      console.log('restarting...');
      setRestart( restart => !restart )
    }, seconds * 1000)

    const {
      interval,
      timer,
    } = timerRef.current

    return () => {

      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [value, seconds])

  return displayVal
}

const AnimatedDataDisplay = ({
  value,
  seconds,
  label,
  digits = 0,
  unit = '',
  dollars = false,
}) => {

  const displayVal = useInterpolateValues(value, seconds)

  return (
    <div>
      <HeadingLabel content={label} />
      <DataDisplay content={`${dollars ?  '$' : ''}${roundToDigits(displayVal, digits)} ${unit}`}/>
    </div>
  )
}

AnimatedDataDisplay.propTypes = {
  value: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  digits: PropTypes.number,
  unit: PropTypes.string,
  dollars: PropTypes.bool,
}

export default AnimatedDataDisplay
