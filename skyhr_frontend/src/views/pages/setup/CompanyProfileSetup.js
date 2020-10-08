import React, { lazy } from "react"

import '../../../scss/style.scss'
const CompanyProfile = lazy(() => import('../../users/CompanyProfile'))

class CompanyProfileSetup extends React.Component {
  render() {
    return (
      <CompanyProfile history={this.props.history} />
    )
  }
}

export default CompanyProfileSetup
