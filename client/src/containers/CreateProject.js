import React, { useState } from 'react'

import Map from './map/Map'
import { colors } from '../config/styles'
import LabeledInput from '../components/LabeledInput'

class CreateProject extends React.PureComponent {
// const CreateProject = () => {

  lat = 37.5
  lng = -117.5

  state = {
    projectName: '',
    energyCapacity: 5,
    powerCapacity: 2.5,
  }

  setField = (e, field) => {
    const value = e.target.value
    this.setState({
      [field]: value,
    })
  }


  render() {

    const {
      projectName,
      energyCapacity,
      powerCapacity,
    } = this.state

    return (

      <div style={styles.root}>
        <div style={styles.form}>
          <LabeledInput
            name={'projectName'}
            label={'Project Name'}
            type={'text'}
            placeholder={'My Project'}
            value={projectName}
            inputWidth={'80%'}
            onChange={this.setField}
            />
          <LabeledInput
            name={'energyCapacity'}
            label={'Project Energy Capacity'}
            type={'number'}
            placeholder={'MWh'}
            value={energyCapacity}
            inputWidth={'10%'}
            onChange={this.setField}
            />
          <LabeledInput
            name={'powerCapacity'}
            label={'Project Power Capacity'}
            type={'number'}
            placeholder={'MW'}
            value={powerCapacity}
            inputWidth={'10%'}
            onChange={this.setField}
            />

            * Enter an address or pick a location on the map
        </div>
        <Map
          center={[this.lng, this.lat]}
          zoom={5}
          />
      </div>
    )
  }
}

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    color: colors.text,
  },
  form: {
    padding: '1em',
    width: '45%',
    textAlign: 'left',
  },

}
export default CreateProject
