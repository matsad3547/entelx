import React, { PureComponent } from 'react'
import { withRouter } from 'react-router'

import Map from './map/Map'

// import MapNodeRenderer from './map/MapNodeRenderer'

import MapLocationReader from '../components/map/MapLocationReader'

import LabeledInput from '../components/LabeledInput'
import Header3 from '../components/Header3'
import Header4 from '../components/Header4'
import Button from '../components/button/'

import {
  colors,
  fontSize,
} from '../config/styles'

import { roundToDigits } from '../utils/'

class CreateProject extends PureComponent {

  state = {
    lat: 34.00002,
    lng: -118.00003,
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

  setLatLng = ({lat, lng}) => {
    this.setState({
      lat: roundToDigits(lat, 5),
      lng: roundToDigits(lng, 5),
    })
  }

  dummyPromise = millis => new Promise( (resolve, reject) => {
    setTimeout( resolve, millis )
  })

  onSubmit = () => {

    const {
      match,
      history
    } = this.props

    const projectId = 123
    // TODO send form data to the backend, build the project, send back the project id number

    this.dummyPromise(2000)
      .then( () => history.push(`${match.url}/project/${projectId}`))
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
        <div style={styles.header}>
          <Header3 content={'Start by specifying your project'} />
        </div>
        <div style={styles.form}>
          <div style={styles.header}>
            <Header4 content={'General'} />
          </div>
          <LabeledInput
            name={'projectName'}
            label={'Project Name'}
            placeholder={'"My Project"'}
            value={projectName}
            inputWidth={'23em'}
            onChange={this.setField}
            />
          <LabeledInput
            name={'energyCapacity'}
            label={'Project Energy Capacity'}
            type={'number'}
            value={energyCapacity}
            inputWidth={'4em'}
            unit={'MWh'}
            onChange={this.setField}
            />
          <LabeledInput
            name={'powerCapacity'}
            label={'Project Power Capacity'}
            type={'number'}
            value={powerCapacity}
            inputWidth={'4em'}
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
              inputWidth={'23em'}
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
              placeholder={'"90001"'}
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
                inputWidth={'6em'}
                disabled={true}
                onChange={this.setField}
                />
              <LabeledInput
                name={'lng'}
                label={'Longitude'}
                type={'number'}
                value={lng}
                inputWidth={'6em'}
                disabled={true}
                onChange={this.setField}
                />
            </div>
          </div>
          <Button
            value={'SUBMIT'}
            type="success"
            onClick={this.onSubmit}
            />
        </div>
        <Map
          center={[lng, lat]}
          zoom={5}
          style={styles.map}
          >
          <MapLocationReader
            getLatLng={this.setLatLng}
          />
          {/*<MapNodeRenderer />*/}
        </Map>
      </div>
    )
  }
}

const styles = {
  root: {
    display: 'flex',
    boxSizing: 'border-box',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    color: colors.text,
    padding: '2em 3em',
    width: '100%',
  },
  form: {
    display: 'block',
    width: '48%',
    minWidth: '30rem',
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
    justifyContent: 'space-between',
  },
  map: {
    width: '48%',
    minWidth: '30rem',
    height: '110vh',
  },
}
export default withRouter(CreateProject)
