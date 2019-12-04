import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
// import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
// import { RoutedTabs, NavTab } from 'react-router-tabs'

import ProjectPageTemplate from '../../components/projectPageTemplate/'
// import DisableableLink from '../../components/DisableableLink'

import Overview from './Overview'
import Aggregates from './Aggregates'

import {
  getBaseUrl,
} from '../../utils/'

import { useGetProject } from '../../hooks/'

import { colors } from '../../config/'

const Insights = ({match}) => {

  const {
    url,
    path,
    params,
  } = match

  const { projectId } = params

  const cleanUrl = getBaseUrl(url, 'insights', projectId)

  const [project, loadingProject] = useGetProject(projectId, cleanUrl)

  console.log('path:', path, 'url:', url);

  return (
    <ProjectPageTemplate
      title={project ? `${project.name} - Insights` : 'Project Data Insights'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      {/*<Tabs defaultIndex={0} onSelect={index => console.log(index)}>
        <TabList>
          <DisableableLink to={`${url}`}>
            <Tab>
              Overview
            </Tab>
          </DisableableLink>
          <DisableableLink to={`${url}/aggregates`}>
            <Tab>
              Aggregates
            </Tab>
          </DisableableLink>
        </TabList>
      </Tabs>*/}
      {/*<RoutedTabs
        startPathWith={url}
        tabClassName="tab-link"
        activeTabClassName="active"
      >
      </RoutedTabs>
      <NavTab to="">Overview</NavTab>
      <NavTab to="/aggregates">Aggregates</NavTab>*/}
      <div style={styles.tabs}>
        <NavLink exact to={`${url}`} activeStyle={styles.active} style={styles.tab}>
          <div >
            Overview
          </div>
        </NavLink>
        <NavLink to={`${url}/aggregates`} activeStyle={styles.active} style={styles.tab}>
          <div >
            Aggregates
          </div>
        </NavLink>
      </div>
      <Switch>
        <Route
          exact path={`${path}/`}
          component={Overview}
        />
        <Route
          path={`${path}/aggregates`}
          component={Aggregates}
        />
      </Switch>
    </ProjectPageTemplate>
  )
}

const styles = {
  tabs: {
    display: 'inline-flex',
    width: '100%',
    borderBottom: `1px solid ${colors.lightGray}`,
    padding: '0 0 2px',
  },
  active: {
    color: colors.deepGreen,
    background: colors.lightGreen,
  },
  tab: {
    fontSize: '1.2em',
    width: '8em',
    lineHeight: '3em',
    color: colors.darkGray,
    textDecoration: 'none',
  },
}

export default Insights
