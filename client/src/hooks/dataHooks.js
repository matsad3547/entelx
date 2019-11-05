import {
  useState,
  useEffect,
  useCallback,
} from 'react'

import moment from 'moment-timezone'

import { defaultHeaders } from '../config'

import { singleRequest } from '../utils/requestUtils'

export const useGetProject = (projectId) => {

  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(false)

  const getProject = useCallback( async () => {

    setLoading(true)

    const request = {
      method: 'GET',
      headers: defaultHeaders,
    }

    try {
      const res = await singleRequest(`/project/${projectId}`, request)

      const project = await res.json()
      setProject(project)
    }
    catch (err) {
      console.error(`There was an error retrieving your project: ${err}`)
    }
    finally {
      setLoading(false)
    }
  }, [projectId])

  useEffect( () => {
    getProject()
  }, [getProject])

  return [project, loading]
}

export const useConnectToServerSideEvent = (route, handleData) => useEffect( () => {
  const stream = new EventSource(route)

  const handlePing = e => console.log(`ping: ${JSON.parse(e.data).time}`)

  const handleError = err => console.error(`There was an error getting data from event source ${route}:`, err)

  stream.addEventListener('message', handleData)
  stream.addEventListener('ping', handlePing)
  stream.addEventListener('error', handleError)

  return () => {
    stream.removeEventListener('message', handleData)
    stream.removeEventListener('ping', handlePing)
    stream.removeEventListener('error', handleError)
    console.log('closing sse connection...')
    stream.close()
  }
}, [route, handleData])

export const useMinDate = projectId => {

  const oneWeekAgo = moment()
    .subtract(7, 'days')

  const [minDate, setMinDate] = useState(oneWeekAgo.toISOString())

  const handleData = useCallback( e => {
    e.preventDefault()
    const {minDatetime} = JSON.parse(e.data)
    setMinDate(minDatetime)
  }, [])

  const sseRoute = `/min_date/${projectId}`

  useConnectToServerSideEvent(sseRoute, handleData)

  return minDate
}
