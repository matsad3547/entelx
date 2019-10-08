import React from 'react'

import { Route } from 'react-router-dom'

import CreateProject from '../containers/CreateProject'
import Project from '../containers/Project'
import ProjectRoi from '../containers/ProjectRoi'
import ProjectDashboard from '../containers/ProjectDashboard'
import HistoricalDisplay from '../containers/HistoricalDisplay'
import InsightsDisplay from '../containers/InsightsDisplay'
import DevelopmentPlatform from '../containers/DevelopmentPlatform'

const ProjectTools = ({match}) => (

  <React.Fragment>
    <Route
      exact path={`${match.path}/create_project`}
      component={CreateProject}
    />
    <Route
      path={`${match.path}/project/:projectId`}
      component={Project}
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
      component={InsightsDisplay}
    />
    <Route
      path={`${match.path}/dev/:projectId`}
      component={DevelopmentPlatform}
    />
  </React.Fragment>
)

export default ProjectTools
