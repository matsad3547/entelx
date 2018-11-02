import React from 'react'
import { Route } from 'react-router-dom'

import PublicPageTemplate from './PublicPageTemplate'

import CreateProject from '../containers/CreateProject'
import Project from '../containers/Project'
import ProjectRoi from '../containers/ProjectRoi'
import ProjectDashboard from '../containers/ProjectDashboard'

const Demo = ({ match }) => (

  <PublicPageTemplate
    title={'Demo'}
    >
    <div>
      <Route
        exact path={`${match.path}`}
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
    </div>
  </PublicPageTemplate>
)

export default Demo
