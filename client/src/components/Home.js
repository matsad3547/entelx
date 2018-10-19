import React from 'react'

import Header1 from './Header1'
import Header2 from './Header2'
import Header3 from './Header3'
import Overlay from './Overlay'

const companyName = 'Knewable'
// http://unsplash.it/1200x800

const Home = () => (

  <div style={styles.root}>
    <img
      style={styles.logoImg}
      alt="Some photo"
      src=""
    />
    <Overlay addlStyles={styles.logo}/>
    <div style={{
        ...styles.logo,
        ...styles.logoText,
      }}>
      <p>sweet-ass logo</p>
      <Header1
        content={companyName}
        />
      <p>Accelerating Energy Storage</p>
    </div>
    <img
      style={styles.sub1Img}
      alt="video of wind turbines"
      src=""
    />
    <Overlay addlStyles={styles.sub1}/>
    <div style={{
        ...styles.sub1,
        ...styles.subText,
      }}>
      <Header2
        content={'The landscape is changing'}
        />
    </div>
    <img
      style={styles.sub2Img}
      alt="picture of solar panels"
      src=""
    />
    <Overlay addlStyles={styles.sub2}/>
    <div style={{
        ...styles.sub2,
        ...styles.subText,
      }}>
      <Header2
        content={'Renewable energy has arrived'}
        />
    </div>
    <img
      style={styles.sub3Img}
      alt="picture of coal plants"
      src=""
    />
    <Overlay addlStyles={styles.sub3}/>
    <div style={{
        ...styles.sub3,
        ...styles.subText,
      }}>
      <Header2
        content={"But transition to sustainable energy must move faster"}
        />
    </div>
    <Overlay addlStyles={styles.sub4}/>
    <div style={{
        ...styles.sub4,
        ...styles.subText,
      }}>
      <Header2
        content={`${companyName} is here to help`}
        />
    </div>
    <div style={styles.mission}>
      <Header3
        content={'Our mission is to help accelerate the transition to renewable energy by improving the economics of bulk energy storage'}
        />
    </div>
    <div style={styles.purpose}>
      <p>{`${companyName} provides market intelligence by aggregating and distilling fine-grained, near-real-time data with proprietary algorithms`}</p>
    </div>
  </div>
)

const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: '[leftPanel] 45% [centerMargin] 10% [rightPanel] 45%',
    gridTemplateRows: '[row1] auto [ws1] 50px [row2] auto [ws2] 50px [row3] auto [ws3] 50px [row4] auto [ws4] 50px [row5] auto  [row6] auto [row7] auto [ws5] 100px',
  },
  logo: {
    gridColumnStart: 'leftPanel',
    gridRowStart: 'row1',
    alignSelf: 'center',
  },
  logoText: {
    color: '#fff',
    zIndex: 2,
  },
  logoImg: {
    width: '100%',
    height: '100%',
    gridColumn: 'leftPanel / 4',
    gridRowStart: 'row1',
    height: 400,
  },
  sub1: {
    gridColumnStart: 'rightPanel',
    gridRowStart: 'row2',
  },
  sub1Img: {
    width: '100%',
    height: '100%',
    gridColumn: 'leftPanel / 4',
    gridRowStart: 'row2',
    height: 300,
  },
  sub2: {
    gridColumnStart: 'leftPanel',
    gridRowStart: 'row3',
  },
  subText: {
    alignSelf: 'end',
    padding: '2em',
    zIndex: 2,
    color: '#fff',
  },
  sub2Img: {
    gridColumn: 'leftPanel / 4',
    gridRowStart: 'row3',
    height: 300,
  },
  sub3: {
    gridColumnStart: 'rightPanel',
    gridRowStart: 'row4',
  },
  sub3Img: {
    gridColumn: 'leftPanel / 4',
    gridRowStart: 'row4',
    height: 300,
  },
  sub4: {
    gridColumn: 'leftPanel / 4',
    gridRowStart: 'row5',
  },
  mission: {
    gridColumn: 'leftPanel / 4',
    gridRowStart: 'row6',
    padding: '1em 2em',
  },
  purpose: {
    gridColumn: 'leftPanel / 4',
    gridRowStart: 'row7',
    // padding: '1em 2em',
  },
}

export default Home
