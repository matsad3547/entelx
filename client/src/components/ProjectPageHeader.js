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
      addlStyles={{
        ...styles.background,
        ...styles.placement,
      }}
      />
    <div style={{
        ...styles.placement,
        ...styles.items,
      }}>
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
  placement: {
    gridColumn: 'leftCol / centerMargin',
    gridRowStart: 'row1',
  },
  background: {
    clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0 100%)'
  },
  items: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    color: colors.white,
    zIndex: 1,
  },
  text: {
    padding: '.5em 2em',
    alignSelf: 'flex-end',
    background: 'transparent',
  },
}

ProjectPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default ProjectPageHeader
