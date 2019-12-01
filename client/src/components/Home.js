import React from 'react'

import Header1 from './Header1'
import Header2 from './Header2'
import Header3 from './Header3'
import Header4 from './Header4'
import Footer from './Footer'
import Logo from './logo/'

import { colors } from '../config/'

import { companyName } from '../config/'

const Home = () => (

  <div>
    <div style={styles.root}>
      <div style={styles.primary}>
        <Logo
          height={'9.5em'}
          />
        <Header1
          content={companyName}
          />
        <Header4
          content={'Accelerating Energy Intelligence'}
          />
      </div>

      <div style={styles.secondary}>
        <div></div>
        <div style={styles.secondaryText}>
          <Header2
            content={'Renewable energy has arrived...'}
            />
          <Header2
            content={'But the transition to sustainable energy must move faster'}
            />
        </div>
      </div>

      <div style={styles.banner}>
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
        <div></div>
        <div>
          <p style={styles.text}>Renewable energy has expanded by leaps and bounds in the last decade and is already the lowest cost source of energy in many places in the world.  Unfortunately, most of its natural intermittency is currently handled by fossil fuel energy resources.  Plus the more renewable energy that is deployed in each location, the lower its value becomes.</p>

          <p style={styles.text}>Energy storage can solve these issues.  Storage provides a market for renewable power that would otherwise be curtailed and storage assets charged from this low-cost power can then profitably undercut the dirtiest fossil fuel generators.  Energy storage is widely seen as essential for renewable energy supplying the majority of energy demand and setting us on the path to a sustainable future.</p>

          <p style={styles.text}>{companyName} is accelerating energy intelligence by:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Providing real-time charge and discharge signals that maximize arbitrage value</li>
            <li style={styles.listItem}>Locating and evaluating arbitrage opportunities</li>
            <li style={styles.listItem}>Estimating storage project ROI</li>
          </ul>
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

const styles = {
  root: {
  },
  primary: {
    background: 'url("/images/solarPanels1wo.jpg") no-repeat left top',
    backgroundSize: 'cover',
    backgroundPosition: '0% 50%',
    color: '#fff',
    padding: '0 0 2rem 2rem',
    height: '36em',
    display: 'grid',
    gridTemplateRows: 'auto 4em 2em',
    gridRowGap: '.6em',
    justifyContent: 'flex-start',
    justifyItems: 'flex-start',
    alignItems: 'flex-end',
  },
  secondary: {
    color: '#fff',
    background: 'url("/images/windTurbines3wo.jpg") no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '90% 50%',
    marginTop: '6em',
    height: '30em',
    padding: '2em',
    display: 'grid',
    alignItems: 'flex-end',
    gridTemplateColumns: 'auto 20em',
  },
  secondaryText: {
    textAlign: 'right',
    lineHeight: 1.4,
  },
  banner: {
    backgroundImage: `linear-gradient(${colors.deepGreen}, ${colors.brightGreen})`,
    color: '#fff',
    marginTop: '5em',
    height: '8em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mission: {
    gridColumn: 'leftCol1 / end',
    gridRowStart: 'row4',
    padding: '1em 3em',
    color: colors.text,
    zIndex: 2,
  },
  purpose: {
    display: 'grid',
    gridTemplateColumns: 'auto 80% auto',
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
  },
}

export default Home
