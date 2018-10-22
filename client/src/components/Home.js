import React from 'react'

import Header1 from './Header1'
import Header2 from './Header2'
import Header3 from './Header3'
import Header4 from './Header4'
import Overlay from './Overlay'

import { colors } from '../config/styles'

const companyName = 'Enewably'
// http://unsplash.it/1200x800

const Home = () => (

  <div style={styles.root}>
    <img
      style={styles.logoImg}
      alt="batteries"
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
      <Header4
        content={'Accelerating Energy Storage'}
        />
    </div>
    <img
      style={styles.sub1Img}
      alt="wind turbines"
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
      alt="solar panels"
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
      alt="coal plants"
      src=""
    />
    <Overlay addlStyles={styles.sub3}/>
    <div style={{
        ...styles.sub3,
        ...styles.subText,
      }}>
      <Header2
        content={"But the transition to sustainable energy must move faster"}
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
      <p style={styles.text}>Renewable energy has expanded by leaps and bounds in the last decade and is already the lowest cost source of energy in many places in the world.  Unfortunately, most of its natural intermittency is currently handled by fossil fuel energy resources.  Plus the more renewable energy that is deployed in each location, the lower its value becomes.</p>

      <p style={styles.text}>Energy storage can solve these issues.  Storage provides a market for renewable power that would otherwise be curtailed and storage assets charged from this low-cost power can still profitably undercut fossil fuel generators.  Energy storage is widely seen as key for renewable energy supplying the majority of energy demand and setting us on the path to a sustainable future.</p>

      <p style={styles.text}>{companyName} is accelerating energy storage by:</p>
      <ul style={styles.list}>
        <li style={styles.listItem}>Providing real-time charge and discharge signals that maximize arbitrage value</li>
        <li style={styles.listItem}>Locating and evaluating arbitrage opportunities</li>
        <li style={styles.listItem}>Estimating project ROI</li>
      </ul>
    </div>
  </div>
)

const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: '[leftPanel] 45% [centerMargin] 10% [rightPanel] auto',
    gridTemplateRows: '[row1] auto [ws1] 80px [row2] auto [ws2] 80px [row3] auto [ws3] 80px [row4] auto [ws4] 80px [row5] auto  [row6] auto [row7] auto [ws5] 100px',
  },
  logo: {
    gridColumnStart: 'leftPanel',
    gridRowStart: 'row1',
  },
  logoText: {
    color: '#fff',
    zIndex: 2,
    alignSelf: 'end',
    padding: '5em',
    justifySelf: 'start',
    textAlign: 'left',
  },
  logoImg: {
    width: '100%',
    gridColumn: 'leftPanel / 4',
    gridRowStart: 'row1',
    height: 450,
  },
  sub1: {
    gridColumnStart: 'rightPanel',
    gridRowStart: 'row2',
  },
  sub1Img: {
    width: '100%',
    gridColumn: 'leftPanel / 4',
    gridRowStart: 'row2',
    height: 350,
  },
  sub2: {
    gridColumnStart: 'leftPanel',
    gridRowStart: 'row3',
    // justifySelf: 'start',
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
    height: 350,
  },
  sub3: {
    gridColumnStart: 'rightPanel',
    gridRowStart: 'row4',
  },
  sub3Img: {
    gridColumn: 'leftPanel / 4',
    gridRowStart: 'row4',
    height: 350,
  },
  sub4: {
    gridColumn: 'leftPanel / 4',
    gridRowStart: 'row5',
  },
  mission: {
    gridColumn: 'leftPanel / 4',
    gridRowStart: 'row6',
    padding: '1em 3em',
    color: colors.text,
  },
  purpose: {
    gridColumn: 'leftPanel / 4',
    gridRowStart: 'row7',
    padding: '0 6em',
    color: colors.text,
  },
  text: {
    padding: '.5em',
    textAlign: 'left',
  },
  list: {
    textAlign: 'left',
    padding: '0 2em',
  },
  listItem: {
    padding: '.2em 0',
  },
}

export default Home
