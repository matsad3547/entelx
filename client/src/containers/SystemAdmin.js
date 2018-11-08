import React, {useState, useEffect} from 'react'

import SubPageTemplate from '../components/SubPageTemplate'

import Button from '../components/button/'
import Loading from '../components/loading/'

import {
  singleRequest,
  parseResponse,
} from '../utils/requestUtils'

import { setField } from '../utils/'

const SystemAdmin = () => {

  const [loading, setLoading] = useState(false)
  const [keys, setKeys] = useState([])

  // const addKey = key => setKeys([...keys, key])
  //
  // const removeKey = key => {
  //   const index = keys.indexOf(key)
  //   setKeys(
  //     [
  //       ...keys.slice(0, index),
  //       ...keys.slice(index + 1),
  //     ]
  //   )
  // }

  const onRequest = () => {

    setLoading(true)

    const keys = []
    const path = ''

    const body = JSON.stringify({keys,})

    const request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    }

    singleRequest(path, request)
      .then( res => {
        console.log('res at onRequest', res);
        setLoading(false)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error writing to ${path}: ${err}`)
      })
  }

  return (
    <SubPageTemplate title={'System Administration'}>
      { loading && <Loading message={''} />}
      <p>One Time Request</p>
      <Button
        value={'EXECUTE'}
        type="danger"
        onClick={onRequest}
        />
    </SubPageTemplate>
  )
}

// const styles = {
// }

export default SystemAdmin
