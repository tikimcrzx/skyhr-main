import React, { lazy } from "react"

import '../../../scss/style.scss'
const CompanySector = lazy(() => import('../../users/CompanySector'))

class CompanySectorSetup extends React.Component {
  render() {
    return (
      <CompanySector history={this.props.history} />
    )
  }
}

export default CompanySectorSetup
