import {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react'

import moment from 'moment-timezone'

export const useConnectToServerSideEvent = (route, handleData) => useEffect( () => {
    const stream = new EventSource(route)

    const handlePing = e => console.log(`ping: ${JSON.parse(e.data).time}`)

    const handleError = err => console.error(`There was an error getting data from event source ${route}:`, err)

    stream.addEventListener('message', handleData)
    stream.addEventListener('ping', handlePing)
    stream.addEventListener('error', handleError)

    return () => {
      stream.removeEventListener('message', handleData)
      stream.removeEventListener('ping', handlePing)
      stream.removeEventListener('error', handleError)
      console.log('closing sse connection...')
      stream.close()
    }
  }, [route, handleData])

export const useInterpolateValues = (value, seconds) => {

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
            if ((nextVal < prevVal && displayVal + step >= nextVal) || (nextVal > prevVal && displayVal + step <= nextVal)) {
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
      // valRef.current = {nextVal: 0, prevVal: 0}
    }
  }, [value, seconds])

  return displayVal
}

export const useMinDate = (projectId) => {

  const oneWeekAgo = moment()
    .subtract(7, 'days')

  const [minDate, setMinDate] = useState(oneWeekAgo)

  const handleData = useCallback( e => {
    e.preventDefault()
    const {minDateMillis} = JSON.parse(e.data)
    setMinDate(moment(minDateMillis))
  }, [])

  const sseRoute = `/get_min_date/${projectId}`

  useConnectToServerSideEvent(sseRoute, handleData)

  return minDate
}
