import React from 'react'

import { Route } from 'react-router-dom'

import CreateProject from './CreateProject'
import ProjectHome from './ProjectHome'
import ProjectRoi from './ProjectRoi'
import ProjectDashboard from './ProjectDashboard'
import HistoricalDisplay from './HistoricalDisplay'
import Insights from '../insights/'
import DevelopmentPlatform from './DevelopmentPlatform'

const Project = ({match}) => (

  <React.Fragment>
    <Route
      exact path={`${match.path}/create_project`}
      component={CreateProject}
    />
    <Route
      path={`${match.path}/project/:projectId`}
      component={ProjectHome}
    />
    <Route
      path={`${match.path}/roi/:projectId`}
      component={ProjectRoi}
    />
    <Route
      path={`${match.path}/dashboard/:projectId`}
      component={ProjectDashboard}
    />
    <Route
      path={`${match.path}/historical/:projectId`}
      component={HistoricalDisplay}
    />
    <Route
      path={`${match.path}/insights/:projectId`}
      component={Insights}
    />
    <Route
      path={`${match.path}/dev/:projectId`}
      component={DevelopmentPlatform}
    />
  </React.Fragment>
)

export default Project
