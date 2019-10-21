import React, {useEffect, useState, useCallback} from 'react'
import ReactMarkdown from 'react-markdown'

import PublicPageTemplate from '../../components/PublicPageTemplate'
import Header2 from '../../components/Header2'
import about from './about.md'

// console.log('about is:', about);

const useGetMd = (path) => {
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

const About = () => {

  const aboutMd = useGetMd(about)

  return (

    <PublicPageTemplate
      title={'About'}
      >
      <Header2 content="Entelx" />
      <ReactMarkdown source={aboutMd} />
    </PublicPageTemplate>
  )
}


// const styles = {
//   padding: '1em 0',
// }

export default About
