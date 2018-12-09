import React from 'react'
import PropTypes from 'prop-types'

import GradientBackground from './GradientBackground'
import Header3 from './Header3'
import ProjectMenu from './ProjectMenu'

import { colors } from '../config/styles'

const ProjectPageHeader = ({
  title,
  baseUrl,
  id,
}) => (

  <div style={styles.root}>
    <GradientBackground
      addlStyles={styles.content}
      />
    <div style={styles.content}>
      <ProjectMenu
        baseUrl={baseUrl}
        id={id}
        />
      <div style={styles.text}>
        <Header3 content={title} />
      </div>
    </div>
  </div>
)

const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: '[leftCol] auto [centerMargin] 6% [rightCol] 45% [end]',
    gridTemplateRows: '[row1] minmax(4em, max-content) [ws1] 2em',
  },
  content: {
    gridColumn: 'leftCol / centerMargin',
    gridRowStart: 'row1',
    display: 'inline-flex',
    justifyContent: 'space-between',
    color: colors.white,
  },
  text: {
    padding: '.5em 2em',
    // justifySelf: 'end',
    alignSelf: 'flex-end',
    background: 'transparent',
  }
}

ProjectPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default ProjectPageHeader
