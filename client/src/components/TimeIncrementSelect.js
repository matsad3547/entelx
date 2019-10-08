import React from 'react'

import LabeledRadio from '../components/LabeledRadio'
import Label from './Label'

import {timeIncrements} from '../config/'

const TimeIncrementSelect = ({
  onSelect,
  selected,
  disabled
}) => {

  const increments = Object.keys(timeIncrements).map( inc => ({
      ...timeIncrements[inc],
      disabled: false,
    })
  )

  return (
    <div style={styles.root}>
      <Label content="Select Time Increment"/>
      <div style={styles.radios}>
        {
          increments.map( (inc, i) =>
          <LabeledRadio
            name={inc.value}
            label={inc.label}
            value={inc.value}
            checked={selected === inc.value}
            onChange={onSelect}
            disabled={inc.disabled}
            key={`lr=${i}`}
            />
        )
      }
      </div>
    </div>
  )
}

const styles = {
  root: {
    padding: '0.5em 0',
  },
  radios: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 0 0 .5em',
  },
}

export default TimeIncrementSelect
