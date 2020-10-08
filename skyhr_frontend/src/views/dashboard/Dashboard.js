import React  from 'react'
import {getUserInfo} from "../../services/user"

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    const current_user = getUserInfo()
    this.state = {
      is_profile_completed: current_user.is_profile_completed ? current_user.is_profile_completed : false,
    }
  }

  render() {
    setTimeout(() => {
      if (!this.state.is_profile_completed)
        this.props.history.push("/social_setup")
    }, 100)
    return (
      <>
      </>
    )
  }
}

export default Dashboard
