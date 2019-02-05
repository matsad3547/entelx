import React from 'react'

import LabeledRadio from '../components/LabeledRadio'
import Header5 from './Header5'

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
    <div >
      <Header5 content="Select Time Increment" />
      <div style={styles}>
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
  display: 'flex',
  flexDirection: 'column',
  padding: '.5em 0',
}

export default TimeIncrementSelect
