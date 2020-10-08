import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import Home from './views/pages/home/Home'
import CustomLogin from './views/pages/login/CustomLogin'
import Activate from './views/pages/login/Activate'
import PrivateRoute from './reusable/PrivateRoute'
import ProfileSetup from './views/pages/setup/ProfileSetup'
import EmploymentSetup from './views/pages/setup/EmploymentSetup'
import SkillSetup from './views/pages/setup/SkillSetup'
import CompanyProfileSetup from './views/pages/setup/CompanyProfileSetup'
import CompanySectorSetup from './views/pages/setup/CompanySectorSetup'
import SocialSetup from './views/pages/setup/SocialSetup'
import IntroSetup from './views/pages/setup/IntroSetup'

import history from "./history"

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'))

// Pages
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))


class App extends Component {

  render() {
    return (
      <Router history={history}>
        <React.Suspense fallback={loading}>
          <Switch>
            <PrivateRoute path="/dashboard" name="Dashboard" component={TheLayout} />
            <Route exact path="/" name="Home" component={Home} />
            <Route exact path="/login" name="Login Page" component={CustomLogin} />
            <Route exact path="/activate/:token" name="Activation Page" component={Activate} />
            <Route exact path="/profile_setup" name="Profile Setup Page" component={ProfileSetup} />
            <Route exact path="/experience_setup" name="Profile Setup Page" component={EmploymentSetup} />
            <Route exact path="/skill_setup" name="Skill Setup Page" component={SkillSetup} />
            <Route exact path="/social_setup" name="Profile Setup Page from Social" component={SocialSetup} />
            <Route exact path="/company_profile_setup" name="Skill Setup Page" component={CompanyProfileSetup} />
            <Route exact path="/company_sector_setup" name="Skill Setup Page" component={CompanySectorSetup} />
            <Route exact path="/intro" name="Introduction Page" component={IntroSetup} />

            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App
