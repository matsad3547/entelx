import React from 'react'
import { Route } from 'react-router-dom'

import ProjectPageTemplate from '../../components/projectPageTemplate/'

import InsightsOverview from './InsightsOverview'

import {
  getBaseUrl,
} from '../../utils/'

import { useGetProject } from '../../hooks/'

const Insights = ({match}) => {

  const {
    url,
    path,
    params,
  } = match

  const { projectId } = params

  const cleanUrl = getBaseUrl(url, 'insights', projectId)

  const [project, loadingProject] = useGetProject(projectId, cleanUrl)

  return (
    <ProjectPageTemplate
      title={project ? `${project.name} - Insights` : 'Project Data Insights'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      {/*Tabs go here*/}
      <React.Fragment>
        <Route
          exact path={`${path}/`}
          component={InsightsOverview}
        />
      </React.Fragment>
    </ProjectPageTemplate>
  )
}

export default Insights
