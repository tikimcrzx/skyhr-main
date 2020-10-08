import React, { lazy } from "react"

import '../../../scss/style.scss'
const Profile = lazy(() => import('../../users/Profile'))

class ProfileSetup extends React.Component {
  render() {
    return (
      <Profile history={this.props.history} />
    )
  }
}

export default ProfileSetup
