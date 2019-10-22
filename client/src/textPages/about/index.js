import React from 'react'
import ReactMarkdown from 'react-markdown'

import PublicPageTemplate from '../../components/PublicPageTemplate'
import Header3 from '../../components/Header3'

import { useGetMd } from '../../hooks/'

import about from './about.md'

import '../TextPage.css'

const About = () => {

  const aboutMd = useGetMd(about)

  return (

    <PublicPageTemplate
      title={'About'}
      >
      <div style={styles.root}>
        <Header3 content="Entelx" />
        <ReactMarkdown source={aboutMd} />
      </div>
    </PublicPageTemplate>
  )
}

const styles = {
  root: {
    padding: '0 1em',
    textAlign: 'left',
  }
}

export default About
