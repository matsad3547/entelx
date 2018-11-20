import React from 'react'
import PropTypes from 'prop-types'

const DataDisplay = ({content}) => (

  <p style={styles}>
    {content}
  </p>
)

const styles = {
  fontSize: '1.2em',
  padding: '0 .5em 1em',
}

DataDisplay.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ])
}

export default DataDisplay
