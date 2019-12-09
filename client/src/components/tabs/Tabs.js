import React from 'react'
import PropTypes from 'prop-types'

import Tab from './Tab'

import { colors } from '../../config/'

const Tabs = ({
  values,
}) => {

  return (
    <div style={styles.root}>
      {values.map( (value, i) =>
        <Tab
          path={value.path}
          label={value.label}
          key={`tab-${value.label}-${i}`}
          />
      )}
    </div>
  )
}

const styles = {
  root: {
    display: 'inline-flex',
    width: '100%',
    borderBottom: `1px solid ${colors.lightGray}`,
    padding: '0 0 2px',
  },
}

Tabs.propTypes = {
  values: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
      label: PropTypes.string,
    })
  ),
}

export default Tabs
