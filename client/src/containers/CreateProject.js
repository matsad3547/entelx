import React, { useState } from 'react'
import { withRouter } from 'react-router'

import Map from './map/Map'

// import MapNodeRenderer from './map/MapNodeRenderer'

import MapLocationReader from '../components/map/MapLocationReader'

import LabeledInput from '../components/LabeledInput'
import Header3 from '../components/Header3'
import Header4 from '../components/Header4'
import Button from '../components/button/'
import Loading from '../components/loading/'

import {
  colors,
  fontSize,
} from '../config/styles'

import {
  singleRequest,
  parseResponse,
} from '../utils/requestUtils'

import {
  roundToDigits,
  setField,
} from '../utils/'

const CreateProject = ({
  match,
  history,
}) => {

  const [lat, setLat] = useState(38.00002)
  const [lng, setLng] = useState(-119.00003)
  const [name, setProjectName] = useState('')
  const [energy, setEnergyCapacity] = useState(5)
  const [power, setPowerCapacity] = useState(2.5)
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('CA')
  const [zip, setZip] = useState('')
  const [loading, setLoading] = useState(false)

  const setLatLng = ({lat, lng}) => {
    setLat(roundToDigits(lat, 5))
    setLng(roundToDigits(lng, 5))
  }

  const setError = err => console.error(`There was an error creating your project: ${err}`)

  const onSubmit = () => {

    setLoading(true)

    const body = JSON.stringify({
      name,
      address,
      city,
      state,
      power,
      energy,
      lat,
      lng,
      type: match.url.includes('demo') ? 'demo' : 'test'
    })

    const request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body,
    }

    singleRequest('/create_project', request)
      .then(parseResponse)
      .then( res => {
        setLoading(false)
        history.push(`${match.url}/project/${res.id}`)
      })
      .catch( err => {
        setLoading(false)
        setError(err)
      })
  }

  return (

    <div style={styles.root}>
      { loading && <Loading message={'Creating your project...'} />}
      <div style={styles.header}>
        <Header3 content={'Start by specifying your project'} />
      </div>
      <div style={styles.form}>
        <div style={styles.subSection}>
          <div style={styles.header}>
            <Header4 content={'General'} />
          </div>
          <LabeledInput
            name={'projectName'}
            label={'Project Name'}
            placeholder={'"My Project"'}
            value={name}
            inputWidth={'23em'}
            onChange={e => setField(e, setProjectName)}
            />
          <LabeledInput
            name={'energyCapacity'}
            label={'Project Energy Capacity'}
            type={'number'}
            value={energy}
            inputWidth={'4em'}
            unit={'MWh'}
            min={0}
            step={0.1}
            onChange={e => setField(e, setEnergyCapacity)}
            />
          <LabeledInput
            name={'powerCapacity'}
            label={'Project Power Capacity'}
            type={'number'}
            value={power}
            inputWidth={'4em'}
            unit={'MW'}
            min={0}
            step={0.1}
            onChange={e => setField(e, setPowerCapacity)}
            />
        </div>
        <div style={styles.subSection}>
          <div style={styles.header}>
            <Header4 content={'Location'} />
            <p style={styles.label}>Enter an address or pick a location on the map</p>
          </div>
          <LabeledInput
            name={'address'}
            label={'Address'}
            placeholder={'"123 Main St. Ste 456"'}
            value={address}
            inputWidth={'23em'}
            onChange={e => setField(e, setAddress)}
            />
          <LabeledInput
            name={'city'}
            label={'City'}
            placeholder={'"Los Angeles"'}
            value={city}
            inputWidth={'18em'}
            onChange={e => setField(e, setCity)}
            />
          <LabeledInput
            name={'state'}
            label={'State'}
            value={state}
            inputWidth={'5em'}
            onChange={setState}
            disabled={true}
            />
          <LabeledInput
            name={'zip'}
            label={'Zip Code'}
            placeholder={'"90001"'}
            value={zip}
            inputWidth={'10em'}
            onChange={e => setField(e, setZip)}
            />
          <div style={styles.latLng}>
            <LabeledInput
              name={'lat'}
              label={'Latitude'}
              type={'number'}
              value={lat}
              inputWidth={'6em'}
              disabled={true}
              />
            <LabeledInput
              name={'lng'}
              label={'Longitude'}
              type={'number'}
              value={lng}
              inputWidth={'6em'}
              disabled={true}
              />
          </div>
        </div>
      </div>
      <Map
        center={[lng, lat]}
        zoom={5}
        style={styles.map}
        >
        <MapLocationReader
          getLatLng={setLatLng}
        />
        {/*<MapNodeRenderer />*/}
      </Map>
      <div style={styles.button}>
        <Button
          value={'SUBMIT'}
          type="success"
          onClick={onSubmit}
          />
      </div>
    </div>
  )
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
    boxSizing: 'border-box',
    minWidth: '30rem',
    textAlign: 'left',
    flex: '1 1 48%',
    padding: '0 1em',
  },
  subSection: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: '1em 0',
  },
  header: {
    width: '100%',
  },
  label: {
    fontSize: fontSize.label,
    padding: '1em 0',
  },
  latLng: {
    display: 'inline-flex',
    justifyContent: 'space-between',
  },
  map: {
    flex: '1 1 48%',
    minWidth: '30rem',
    height: '75vh',
  },
  button: {
    display: 'flex',
    width: '100%',
    padding: '0 1em',
  }
}

export default withRouter(CreateProject)
