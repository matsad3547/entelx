import React from 'react'
import ReactMarkdown from 'react-markdown'

import PublicPageTemplate from '../../components/PublicPageTemplate'

import { useGetMd } from '../../hooks/'

import contact from './contact.md'

import '../TextPage.css'

const Contact = () => {

  const contactMd = useGetMd(contact)

  return (

    <PublicPageTemplate
      title={'Contact'}
      >
      <div style={styles.root} className="text-page">
        <ReactMarkdown source={contactMd} />
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

export default Contact
