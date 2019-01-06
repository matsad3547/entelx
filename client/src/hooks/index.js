import { useEffect } from 'react'

export const connectToServerSideEvent = (route, handleData) => useEffect( () => {
    const stream = new EventSource(route)

    const handleError = err => console.error(`There was an error getting data from event source ${route}:`, err)

    stream.addEventListener('message', handleData)
    stream.addEventListener('error', handleError)

    return () => {
      stream.removeEventListener('message', handleData)
      stream.addEventListener('error', handleError)
      stream.close()
    }
  }, [])
