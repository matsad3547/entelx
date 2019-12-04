import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ProjectPageTemplate from '../../components/projectPageTemplate/'
import Tabs from '../../components/tabs/'

import Overview from './Overview'
import Aggregates from './Aggregates'

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

  const [project] = useGetProject(projectId, cleanUrl)

  const tabValues = [
    {
      path: url,
      label: 'Overview',
    },
    {
      path: `${url}/aggregates`,
      label: 'Aggregates',
    },
  ]

  return (
    <ProjectPageTemplate
      title={project ? `${project.name} - Insights` : 'Project Data Insights'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      <Tabs values={tabValues}/>
      <Switch>
        <Route
          exact path={`${path}/`}
          render={({match}) => <Overview
            match={match}
            projectId={projectId}
          />}
        />
        <Route
          path={`${path}/aggregates`}
          render={({match}) => <Aggregates
            match={match}
            projectId={projectId}
          />}
        />
      </Switch>
    </ProjectPageTemplate>
  )
}

export default Insights
