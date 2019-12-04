import {
  useEffect,
  useState,
  useRef,
} from 'react'

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

export const useAddClassOnClick = ref => {
  const handleClick = e => {
    if (ref.current && ref.current.contains(e.target)) {
      ref.current.classList.add('tabClicked')
    }
  }

  useEffect( () => {
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  })
}
