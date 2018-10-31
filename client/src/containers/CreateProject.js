import React, { useState } from 'react'

import Map from './map/Map'
import {
  colors,
  fontSize,
} from '../config/styles'
import LabeledInput from '../components/LabeledInput'
import Header4 from '../components/Header4'
import Button from '../components/button/'

class CreateProject extends React.PureComponent {

  state = {
    lat: 37.5,
    lng: -117.5,
    projectName: '',
    energyCapacity: 5,
    powerCapacity: 2.5,
    address: '',
    city: '',
    state: 'CA',
    zip: '',
  }

  setField = (e, field) => {
    const value = e.target.value
    this.setState({
      [field]: value,
    })
  }

  render() {

    const {
      lat,
      lng,
      projectName,
      energyCapacity,
      powerCapacity,
      address,
      city,
      state,
      zip,
    } = this.state

    return (

      <div style={styles.root}>
        <div style={styles.form}>
          <div style={styles.header}>
            <Header4 content={'General'} />
          </div>
          <LabeledInput
            name={'projectName'}
            label={'Project Name'}
            placeholder={'"My Project"'}
            value={projectName}
            inputWidth={'90%'}
            onChange={this.setField}
            />
          <LabeledInput
            name={'energyCapacity'}
            label={'Project Energy Capacity'}
            type={'number'}
            value={energyCapacity}
            inputWidth={'10%'}
            unit={'MWh'}
            onChange={this.setField}
            />
          <LabeledInput
            name={'powerCapacity'}
            label={'Project Power Capacity'}
            type={'number'}
            value={powerCapacity}
            inputWidth={'10%'}
            unit={'MW'}
            onChange={this.setField}
            />
          <div style={styles.location}>
            <div style={styles.header}>
              <Header4 content={'Location'} />
            </div>
            <p style={styles.label}>Enter an address or pick a location on the map</p>
            <LabeledInput
              name={'address'}
              label={'Address'}
              placeholder={'"123 Main St. Ste 456"'}
              value={address}
              inputWidth={'28em'}
              onChange={this.setField}
              />
            <LabeledInput
              name={'city'}
              label={'City'}
              placeholder={'"Los Angeles"'}
              value={city}
              inputWidth={'18em'}
              onChange={this.setField}
              />
            <LabeledInput
              name={'state'}
              label={'State'}
              value={state}
              inputWidth={'5em'}
              onChange={this.setField}
              disabled={true}
              />
            <LabeledInput
              name={'zip'}
              label={'Zip Code'}
              placeholder={''}
              value={zip}
              inputWidth={'10em'}
              onChange={this.setField}
              />
            <div style={styles.latLng}>
              <LabeledInput
                name={'lat'}
                label={'Latitude'}
                type={'number'}
                value={lat}
                inputWidth={'5em'}
                disabled={true}
                onChange={this.setField}
                />
              <LabeledInput
                name={'lng'}
                label={'Longitude'}
                type={'number'}
                value={lng}
                inputWidth={'5em'}
                disabled={true}
                onChange={this.setField}
                />
            </div>
          </div>
          <Button
            value={'SUBMIT'}
            type="success"
            onClick={() => console.log('form:', this.state)}
            />
        </div>
        <Map
          center={[lng, lat]}
          zoom={5}
          />
      </div>
    )
  }
}

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    color: colors.text,
    padding: '2em 0',
  },
  form: {
    width: '45%',
    textAlign: 'left',
  },
  location: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: '1em 0',
  },
  header: {
    padding: '0 0 1.5em',
    width: '100%',
  },
  label: {
    fontSize: fontSize.label,
    padding: '0 0 1em',
  },
  latLng: {
    display: 'inline-flex',
    width: '40%',
    justifyContent: 'space-between',
  }
}
export default CreateProject
