import React from 'react'

const Logo = ({
  height = 100,
  className = 'company-logo',
}) => {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 162"
      className={className}
      style={{height: height}}
      >
    <g
    id="E"><polygon
    className="cls-1" points="210.08 0 200.9 33.18 139.15 33.18 129.15 62.21 175.13 62.21 165.17 96 119.94 96 109.94 124.61 183.74 124.61 173.94 162 56.94 162 105.94 0 210.08 0"/>
    </g>
    <g>
      <polygon className="cls-2" points="25.97 110.9 63.8 110.9 47.61 162 0 162 25.97 110.9"/>
      <polygon className="cls-2" points="54.59 51.52 82.77 51.52 66.15 103.7 29.34 103.7 54.59 51.52"/>
      <polygon className="cls-2" points="99.61 0.58 84.81 45.36 57.47 45.36 79 0.58 99.61 0.58"/>
    </g>
    </svg>
  )
}

export default Logo
