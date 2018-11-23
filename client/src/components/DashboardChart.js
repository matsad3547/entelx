import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import DashboardSection from './DashboardSection'
import LineBarChart from './charts/LineBarChart'

const DashboardChart = ({prices, timeZone}) => {

  const [width, setWidth] = useState(1000)

  const sectionRef = useRef(null)

  const updateWidth = () => {
    const w = sectionRef.current && ReactDOM.findDOMNode(sectionRef.current).getBoundingClientRect().width * .85
    setWidth(w)
  }

  useEffect( () => {

    window.addEventListener('resize', updateWidth)

    return () => window.removeEventListener('resize', updateWidth)
  })


  return (

    <div ref={sectionRef}>
      <DashboardSection headerContent="Last Hour">
        <div style={styles}>
          <LineBarChart
            data={prices}
            timeZone={timeZone}
            width={width}
            height={.4 * width}
            />
        </div>
      </DashboardSection>
    </div>
  )
}

const styles = {
  padding: '1em 0',
}

DashboardChart.propTypes = {
  prices: PropTypes.arrayOf(PropTypes.shape({
      lmp: PropTypes.number,
      mvgAvg: PropTypes.number,
      score: PropTypes.number,
      timestamp: PropTypes.number,
    })
  ).isRequired,
  timeZone: PropTypes.string.isRequired,
}

export default DashboardChart
