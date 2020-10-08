import React, { lazy } from "react"

import '../../../scss/style.scss'
import {getEmployments} from "../../../redux/actions/user/user"
import {connect} from "react-redux"
const Employment = lazy(() => import('../../users/Employment'))

class EmploymentSetup extends React.Component {
  UNSAFE_componentWillMount() {
    this.props.getEmployments(this.props.history)
  }

  render() {
    return (
      <Employment history={this.props.history} />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEmployments: (history) => dispatch(getEmployments(history)),
  }
}

export default connect(null, mapDispatchToProps)(EmploymentSetup)
