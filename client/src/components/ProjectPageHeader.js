import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import GradientBackground from './GradientBackground'
import Header3 from './Header3'
import ProjectMenu from './ProjectMenu'

import {
  colors,
  boxShadow,
} from '../config/styles'

const ProjectPageHeader = ({
  title,
  baseUrl,
  id,
}) => {

  const [isCompact, setIsCompact] = useState(false)

  const header = useRef(null)

  const checkScroll = e => {
    if (header.current) {
      const top = header.current.getBoundingClientRect().top
      if(top < 0) {
        setIsCompact(true)
      }
      else if (top > 2) {
        setIsCompact(false)
      }
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', checkScroll)
    return () => document.removeEventListener('scroll', checkScroll)
  })

  const switchStyles = isCompact ? {
    height: 100,
  } : {
    height: 2,
  }

  const rootStyles = isCompact ? styles.compactRoot : styles.root

  const gradientStyles = isCompact ? {
    display: 'none',
  } : {
    ...styles.background,
    ...styles.placement,
  }

  const itemStyles = isCompact ? styles.compactItems : {
    ...styles.placement,
    ...styles.items,
  }

  const textStyles = isCompact ? styles.compactText : styles.text

  return (
    <div>
      <div ref={header} style={switchStyles}></div>
      <div
        style={rootStyles}
        >
        <GradientBackground
          addlStyles={gradientStyles}
          />
        <div style={itemStyles}>
          <ProjectMenu
            baseUrl={baseUrl}
            id={id}
            />
          <div style={textStyles}>
            <Header3 content={title} />
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: '[leftCol] auto [centerMargin] 6% [rightCol] 45% [end]',
    gridTemplateRows: '[row1] minmax(4em, max-content) [ws1] 2em',
  },
  compactRoot: {
    display: 'block',
    width: '100%',
    position: 'fixed',
    zIndex: 2,
    top: 0,
    background: 'white',
    boxShadow,
    transition: 'all 1s'
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
  compactItems: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    width: '100%',
    color: colors.gray,
    alignItems: 'baseline',
  },
  text: {
    padding: '.5em 2em',
    alignSelf: 'flex-end',
    background: 'transparent',
  },
  compactText: {
    fontSize: '.8em',
    padding: '.5em 2em',
  },
}

ProjectPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default ProjectPageHeader
