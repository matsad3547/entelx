import {
  useEffect,
  useState,
  useRef,
  useCallback,
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

export const useAddClassOnClick = (ref, className) => {
  const handleMouseDown = e => {
    if (ref.current && ref.current.contains(e.target)) {
      ref.current.classList.add(className)
    }
  }

  const handleMouseUp = () => {
    if (ref.current) {
      ref.current.classList.remove(className)
    }
  }

  useEffect( () => {
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  })
}

export const useHandleOutsideClick = (ref, onClick) => {
  const handleOutsideClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      onClick()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  })
}

export const useScrollPosition = ref => {
  const [position, setPosition] = useState(null)

  const checkScroll = useCallback(e => {
    if (ref.current) {
      const pos = ref.current.getBoundingClientRect().top
      setPosition(pos)
    }
  }, [ref])

  useEffect(() => {
    checkScroll()
    document.addEventListener('scroll', checkScroll)
    return () => document.removeEventListener('scroll', checkScroll)
  }, [checkScroll])

  return position
}

export const useElementWidth = ref => {
  const [width, setWidth] = useState(0)

  useEffect( () => {
    setWidth(ref.current.offsetWidth)
  }, [setWidth, ref])

  return width
}
