import React from 'react'
import ReactMarkdown from 'react-markdown'

import { useGetMd } from '../../hooks/'

import overview from './overview.md'

import '../../textPages/TextPage.css'

const Overview = () => {

  const overviewMd = useGetMd(overview)

  return (
    <div
      style={styles.root}
      className="text-page">
      <ReactMarkdown source={overviewMd} />
    </div>
  )
}

const styles = {
  root: {
    textAlign: 'left',
    padding: '1em 0',
  },
}

export default Overview
