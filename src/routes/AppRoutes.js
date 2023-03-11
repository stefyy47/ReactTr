/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { Switch } from 'react-router-dom'

import CustomRoute from '../components/routing/CustomRoute'

import { NotFound } from '@totalsoft_oss/rocket-ui.core'
import Forbidden from '../components/feedback/Forbidden'
import Dashboard from 'features/dashboard/Dashboard'
import { MyProfile } from 'features/myProfile/myProfile'
import { BuildingListContainer } from 'features/buildings/BuildingListContainer'
import { RecruitListContainer } from 'features/recruiting/RecruitListContainer'
import { SpierContainer } from 'features/spier/SpierContainer'

export default function AppRoutes() {
  return (
    <Switch>
      <CustomRoute isPrivate={false} exact path='/buildings' component={BuildingListContainer} />
      <CustomRoute isPrivate={false} exact path='/recruit' component={RecruitListContainer} />
      <CustomRoute isPrivate={false} exact path='/spy' component={SpierContainer} />
      <CustomRoute isPrivate={false} exact path='/dashboard' component={Dashboard} />
      {/* <Redirect exact from='/' to='/login' /> */}
      <CustomRoute isPrivate={false} exact path='/forbidden' component={Forbidden} />
      <CustomRoute isPrivate={false} exact path='/myProfile' component={MyProfile} />
      <CustomRoute isPrivate={false} render={() => <NotFound title='PageNotFound'></NotFound>} />
    </Switch>
  )
}
