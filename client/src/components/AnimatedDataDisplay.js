import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'

import HeadingLabel from '../components/HeadingLabel'
import DataDisplay from '../components/DataDisplay'

const useInterpolateValues = (value, seconds) => {

  const [displayVal, setDisplayVal] = useState(0)

  const timerRef = useRef(null)
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

    const updateDisplayVal = () => {
      console.log('updating interpolate hook - next val:', nextVal, 'prev val:', prevVal, 'step:', step)

      if (prevVal !== nextVal) {
        console.log('updating at if');
        timerRef.current = setTimeout( () => {
          setDisplayVal( displayVal => {
            if ((nextVal < prevVal && displayVal + step > nextVal) || (nextVal > prevVal && displayVal + step < nextVal)) {
              return displayVal + step
            }
            else {
              return displayVal
            }
          })
          updateDisplayVal()
        }, 1000)
      }
      else {
        console.log('setting value at else');
        setDisplayVal(value)
      }
    }

    updateDisplayVal()

    return () => {
      clearTimeout(timerRef.current)
      timerRef.current = null
      valRef.current = {nextVal: 0, prevVal: 0}
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
      <DataDisplay content={`${dollars ?  '$' : ''}${displayVal.toFixed(digits)} ${unit}`}/>
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
