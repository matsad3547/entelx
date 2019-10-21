import {
  useState,
  useEffect,
  useCallback,
} from 'react'

// The `path` parameter is the value of `import myPath from './myPath.md'`
export const useGetMd = path => {
  const [md, setMd] = useState('')

  const getMd = useCallback(async () => {
    try {
      const res = await fetch(path)
      const parsed = await res.text()

      setMd(parsed)
    }
    catch (err) {
      console.error(`There was an error fetching markdown from ${path}:`, err);
    }
  }, [path])

  useEffect( () => {
    getMd()
  }, [getMd])

  return md
}
