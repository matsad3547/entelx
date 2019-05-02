import { useEffect } from 'react'

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
