import React from 'react'

import Header1 from './Header1'
import Header2 from './Header2'
import Header3 from './Header3'

const companyName = 'Enewably'

const Home = () => (

  <div>
    <Header1
      content={companyName}
    />
    <p>sweet-ass header</p>
    <p>sweet-ass logo</p>
    <Header2
      content={'The landscape is changing'}
    />
    <p>picture/video of wind turbines!</p>
    <Header2
      content={'Renewable energy has arrived'}
    />
    <p>picture of solar panels</p>
    <Header2
      content={"But there's a long way to go, and the transition to sustainable energy must move faster"}
    />
    <p>picture of dank-ass FF plants</p>
    <Header2
      content={`${companyName} is here to help`}
    />
    <Header3
      content={'Our mission is to help accelerate the transition to renewable energy by improving the economics of bulk energy storage'}
    />
    <p>{`${companyName} provides market intelligence by aggregating and distilling fine-grained, near-real-time data with proprietary algorithms`}</p>
  </div>
)

export default Home
