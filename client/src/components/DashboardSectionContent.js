import React from 'react'

const DashboardSectionContent = ({children}) => (
  <div style={styles}>
    {children}
  </div>
)

const styles = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '.5em 1em',
}

export default DashboardSectionContent
