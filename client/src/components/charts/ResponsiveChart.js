import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import DashboardSection from './DashboardSection'
import {LineBarChart} from './charts/'

const ResponsiveChart = ({
  header,
  barKey,
  negBarThreshold,
  posBarThreshold,
  heightProportion = .3,
  timeSeries,
  timeZone,
  xRefLines,
}) => {

  const [width, setWidth] = useState(500)

  const sectionRef = useRef(null)

  const updateWidth = () => {
    const w = sectionRef.current && ReactDOM.findDOMNode(sectionRef.current).getBoundingClientRect().width * .85
    setWidth(w)
  }

  useEffect( () => {

    updateWidth()

    window.addEventListener('resize', updateWidth)

    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return (

    <div ref={sectionRef}>
      <DashboardSection headerContent={header}>
        <div style={styles}>
          <LineBarChart
            barKey={barKey}
            negBarThreshold={negBarThreshold}
            posBarThreshold={posBarThreshold}
            data={timeSeries}
            timeZone={timeZone}
            width={width}
            height={heightProportion * width}
            xRefLines={xRefLines}
            />
        </div>
      </DashboardSection>
    </div>
  )
}

const styles = {
  padding: '1em 0',
}

ResponsiveChart.propTypes = {
  header: PropTypes.string.isRequired,
  heightProportion: PropTypes.number,
  timeSeries: PropTypes.arrayOf(PropTypes.shape({
      lmp: PropTypes.number,
      mvgAvg: PropTypes.number,
      score: PropTypes.number,
      timestamp: PropTypes.number,
    })
  ).isRequired,
  timeZone: PropTypes.string.isRequired,
  xRefLines: PropTypes.arrayOf(PropTypes.number),
}

export default ResponsiveChart
