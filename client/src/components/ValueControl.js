import React from 'react'
import PropTypes from 'prop-types'

import Button from './button/'
import Label from './Label'
import DataDisplay from './DataDisplay'

const ValueControl = ({
  value,
  format,
  title,
  onIncrement,
  onDecrement,
  onIncrementLabel,
  onDecrementLabel,
  disabled = false,
}) => (

  <div style={styles.interface}>
    <Label content={title}/>
    <DataDisplay content={format(value)}/>
    <div style={styles.buttons}>
      <Button
        value={`- ${onIncrementLabel}`}
        disabled={disabled}
        type="primary"
        onClick={onDecrement}
        overrideStyles={styles.button}
        />
      <Button
        value={`+ ${onDecrementLabel}`}
        disabled={disabled}
        type="primary"
        onClick={onIncrement}
        overrideStyles={styles.button}
      />
    </div>
  </div>
)

const styles = {
  value: {
    padding: '.5em 1em',
    fontSize: '1.2em',
  },
  interface: {
    display: 'flex',
    flexDirection: 'column',
    width: '16em',
    justifyContent: 'space-between',
    padding: '.5em',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 .5em',
  },
  button: {
    padding: '.5em',
    margin: 0,
    width: '5em',
  },
}

ValueControl.propTypes = {
  value: PropTypes.number,
  format: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrementLabel: PropTypes.string.isRequired,
  onDecrementLabel: PropTypes.string.isRequired,
}

export default ValueControl
