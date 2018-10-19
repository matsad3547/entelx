import React from 'react'

import Header1 from './Header1'
import Header2 from './Header2'
import Header3 from './Header3'

const companyName = 'Knewable'

const Home = () => (

  <div style={styles.root}>
    <img
      style={styles.logoImg}
      alt="Some photo"
      src=""
    />
    <div style={styles.logo}>
      <p>sweet-ass logo</p>
      <Header1
        content={companyName}
        />
      <p>sweet-ass header</p>
    </div>
    <img
      style={styles.sub1Img}
      alt="video of wind turbines"
      src=""
    />
    <div style={styles.sub1}>
      <Header2
        content={'The landscape is changing'}
        />
    </div>
    <img
      style={styles.sub2Img}
      alt="picture of solar panels"
      src=""
    />
    <div style={styles.sub2}>
      <Header2
        content={'Renewable energy has arrived'}
        />
    </div>
    <img
      style={styles.sub3Img}
      alt="picture of coal plants"
      src=""
    />
    <div style={styles.sub3}>
      <Header2
        content={"But there's a long way to go, and the transition to sustainable energy must move faster"}
        />
    </div>
    <div style={styles.sub4}>
      <Header2
        content={`${companyName} is here to help`}
        />
    </div>
    <div style={styles.mission}>
      <Header3
        content={'Our mission is to help accelerate the transition to renewable energy by improving the economics of bulk energy storage'}
        />
      <p>{`${companyName} provides market intelligence by aggregating and distilling fine-grained, near-real-time data with proprietary algorithms`}</p>
    </div>
  </div>
)

const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: '[leftMargin] 100px [leftPanel] auto [centerMargin] 50px [rightPanel] auto [rightMargin] 100px',
    gridTemplateRows: '[row1] auto [ws1] 50px [row2] auto [ws2] 50px [row3] auto [ws3] 50px [row4] auto [ws4] 50px [row5] auto [ws5] 50px [row6] auto',
  },
  logo: {
    gridColumnStart: 'leftPanel',
    gridRowStart: 'row1',
    alignSelf: 'center',
  },
  logoImg: {
    gridColumn: 'leftPanel / rightMargin',
    gridRowStart: 'row1',
    height: 300,
  },
  sub1: {
    gridColumnStart: 'rightPanel',
    gridRowStart: 'row2',
    alignSelf: 'end',
    paddingBottom: '2em',
  },
  sub1Img: {
    gridColumn: 'leftPanel / rightMargin',
    gridRowStart: 'row2',
    height: 250,
  },
  sub2: {
    gridColumnStart: 'leftPanel',
    gridRowStart: 'row3',
    alignSelf: 'end',
    paddingBottom: '2em',
  },
  sub2Img: {
    gridColumn: 'leftPanel / rightMargin',
    gridRowStart: 'row3',
    height: 250,
  },
  sub3: {
    gridColumnStart: 'rightPanel',
    gridRowStart: 'row4',
    alignSelf: 'end',
    paddingBottom: '2em',
  },
  sub3Img: {
    gridColumn: 'leftPanel / rightMargin',
    gridRowStart: 'row4',
    height: 250,
  },
  sub4: {
    gridColumn: 'leftPanel / rightMargin',
    gridRowStart: 'row5',
    alignSelf: 'end',
    paddingBottom: '2em',
  },
  mission: {
    gridColumn: 'leftPanel / rightMargin',
    gridRowStart: 'row6',
  },
}

export default Home
