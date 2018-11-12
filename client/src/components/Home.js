import React from 'react'

import Header1 from './Header1'
import Header2 from './Header2'
import Header3 from './Header3'
import Header4 from './Header4'
import Overlay from './Overlay'
import Footer from './Footer'
import GradientBackground from './GradientBackground'

import { colors } from '../config/styles'

import { companyName } from '../config/'

// http://unsplash.it/1200x800

const Home = () => (

  <div>
    <div style={styles.root}>
      <img
        style={styles.logoImg}
        alt="solar panels"
        src="/images/solarPanels1.jpeg"
        />
      <Overlay
        addlStyles={styles.logo}
        />
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
        src="/images/windTurbines3.jpeg"
        />
      <Overlay
        addlStyles={styles.sub1}
        />
      <div style={{
          ...styles.sub1,
          ...styles.subText,
        }}>
        <Header2
          content={'Renewable energy has arrived...'}
          />
        <Header2
          content={'But the transition to sustainable energy must move faster'}
          />
      </div>
      <GradientBackground
        addlStyles={styles.banner}
        />
      <div style={{
          ...styles.banner,
          ...styles.bannerText,
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
    <Footer />
  </div>
)

const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: '[leftCol1] 22% [leftCol2] 22% [centerMargin] 10% [rightCol1] 22% [rightCol2] auto [end]',
    gridTemplateRows: '[row1] auto [ws1] 75px [row2] auto [ws2] 50px [row3] auto [row4] auto [row5] auto [ws5] 50px',
  },
  logo: {
    gridColumn: 'leftCol1 / centerMargin',
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
    gridColumn: 'leftCol1 / end',
    gridRowStart: 'row1',
    height: '85vh',
    objectFit: 'cover',
    objectPosition: '100% 70%',
  },
  sub1: {
    gridColumn: 'rightCol1 / end',
    gridRowStart: 'row2',
  },
  sub1Img: {
    width: '100%',
    gridColumn: 'leftCol1 / end',
    gridRowStart: 'row2',
    height: '70vh',
    objectFit: 'cover',
    objectPosition: '100% 50%',
  },
  subText: {
    textAlign: 'right',
    alignSelf: 'end',
    padding: '2em 3em',
    zIndex: 2,
    color: '#fff',
  },
  banner: {
    gridColumn: 'leftCol1 / end',
    gridRowStart: 'row3',
  },
  bannerText: {
    alignSelf: 'end',
    padding: '2em',
    zIndex: 2,
    color: '#fff',
  },
  mission: {
    gridColumn: 'leftCol1 / end',
    gridRowStart: 'row4',
    padding: '1em 3em',
    color: colors.text,
    zIndex: 2,
  },
  purpose: {
    gridColumn: 'leftCol1 / end',
    gridRowStart: 'row5',
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
  footerLinks: {
    gridRowStart: 'row6'
  }
}

export default Home
