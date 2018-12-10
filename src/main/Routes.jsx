import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { PrivateRoute } from '../services/PrivateRoute';

import Home from '../components/home/Home'
import AdminUserCrud from '../components/adminUser/AdminUserCrud'
import ModelCrud from '../components/model/ModelCrud'
import MakeCrud from '../components/make/MakeCrud'
import YearCrud from '../components/year/YearCrud'
import MileageCrud from '../components/mileage/MileageCrud'
import PriceCrud from '../components/price/PriceCrud'
import StateCrud from '../components/state/StateCrud'
import RegionCrud from '../components/region/RegionCrud'
import LoginPage from '../components/login/LoginPage'

export default props =>
    <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute path='/makes' component={MakeCrud} />
        <PrivateRoute path='/models' component={ModelCrud} />
        <PrivateRoute path='/years' component={YearCrud} />
        <PrivateRoute path='/mileages' component={MileageCrud} />
        <PrivateRoute path='/prices' component={PriceCrud} />
        <PrivateRoute path='/states' component={StateCrud} />
        <PrivateRoute path='/regions' component={RegionCrud} />
        <PrivateRoute path='/adminusers' component={AdminUserCrud} />
        <Route path='/login' component={LoginPage} />
        <Redirect from='*' to='/' />
    </Switch>
