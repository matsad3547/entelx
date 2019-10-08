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
  width = '16em',
}) => (

  <div style={getRootStyle(width)}>
    <Label content={title}/>
    <DataDisplay content={format(value)}/>
    <div style={styles.buttons}>
      <Button
        value={`- ${onDecrementLabel}`}
        disabled={disabled}
        type="primary"
        onClick={onDecrement}
        overrideStyles={styles.button}
        />
      <Button
        value={`+ ${onIncrementLabel}`}
        disabled={disabled}
        type="primary"
        onClick={onIncrement}
        overrideStyles={styles.button}
        />
    </div>
  </div>
)

const getRootStyle = width => ({
  ...styles.root,
  width,
})

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '.5em 0',
    textAlign: 'left',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 0 0 .5em',
  },
  button: {
    padding: '.5em',
    margin: 0,
    width: '5em',
  },
}

ValueControl.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  format: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrementLabel: PropTypes.string.isRequired,
  onDecrementLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  width: PropTypes.string,
}

export default ValueControl
