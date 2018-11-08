import React, {useState, useEffect} from 'react'

import SubPageTemplate from '../components/SubPageTemplate'
import Button from '../components/button/'

const onRequest = () => {

  // setLoading(true)

  // const body = JSON.stringify({id: params.projectId})
  //
  // const request = {
  //   method: 'DELETE',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body,
  // }
  //
  // singleRequest('/delete_project', request)
  //   .then( res => {
  //     setLoading(false)
  //     history.push(`${cleanUrl}`)
  //   })
  //   .catch( err => {
  //     // setLoading(false)
  //     console.error(`There was an error deleting your project: ${err}`)
  //   })
}

const SystemAdmin = () => {

  return (
    <SubPageTemplate title={'System Administration'}>
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
