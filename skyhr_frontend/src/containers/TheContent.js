import React, { Suspense } from 'react'
import {
  Route,
  Switch,
  // Redirect
} from 'react-router-dom'
import { CContainer } from '@coreui/react'

// import routes from '../routes'
// import Home from "../views/pages/home/Home"
import Dashboard from "../views/dashboard/Dashboard"
import Tables from "../views/base/tables/Tables"
import CreateJobStep1 from "../views/pages/jobs/CreateJobStep1"
import CreateJobStep2 from "../views/pages/jobs/CreateJobStep2"
import CreateJobStep3 from "../views/pages/jobs/CreateJobStep3"
import CreateJobStep4 from "../views/pages/jobs/CreateJobStep4"
import CreateJobStep5 from "../views/pages/jobs/CreateJobStep5"

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer>
        <Suspense fallback={loading}>
          <Switch>
            {/*{routes.map((route, idx) => {*/}
            {/*  return route.component && (*/}
            {/*    <Route*/}
            {/*      key={idx}*/}
            {/*      path={route.path}*/}
            {/*      exact={route.exact}*/}
            {/*      name={route.name}*/}
            {/*      render={props => (*/}
            {/*        <CFade>*/}
            {/*          <route.component {...props} />*/}
            {/*        </CFade>*/}
            {/*      )}*/}
            {/*    />*/}
            {/*  )*/}
            {/*})}*/}

            {/*<Redirect from="/" to="/dashboard" />*/}

            <Route path='/dashboard' name='Dashboard' component={Dashboard} exact />
            <Route path='/dashboard/post_job1' name='Create Job1' component={CreateJobStep1} exact />
            <Route path='/dashboard/post_job2' name='Create Job2' component={CreateJobStep2} exact />
            <Route path='/dashboard/post_job3' name='Create Job3' component={CreateJobStep3} exact />
            <Route path='/dashboard/post_job4' name='Create Job4' component={CreateJobStep4} exact />
            <Route path='/dashboard/post_job5' name='Create Job5' component={CreateJobStep5} exact />
            <Route path='/dashboard/tables' name='Buttons' component={Tables} exact />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
