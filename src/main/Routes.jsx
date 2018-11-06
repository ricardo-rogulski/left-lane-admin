import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import ModelCrud from '../components/model/ModelCrud'
import MakeCrud from '../components/make/MakeCrud'
import YearCrud from '../components/year/YearCrud'
import MileageCrud from '../components/mileage/MileageCrud'
import PriceCrud from '../components/price/PriceCrud'
import StateCrud from '../components/state/StateCrud'
import CityCrud from '../components/city/CityCrud'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/makes' component={MakeCrud} />
        <Route path='/models' component={ModelCrud} />
        <Route path='/years' component={YearCrud} />
        <Route path='/mileages' component={MileageCrud} />
        <Route path='/prices' component={PriceCrud} />
        <Route path='/states' component={StateCrud} />
        <Route path='/cities' component={CityCrud} />
        <Route path='/users' component={UserCrud} />
        <Redirect from='*' to='/' />
    </Switch>
