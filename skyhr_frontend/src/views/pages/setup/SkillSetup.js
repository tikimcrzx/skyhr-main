import React, { lazy } from "react"

import '../../../scss/style.scss'
const Skill = lazy(() => import('../../users/Skill'))

class SkillSetup extends React.Component {
  render() {
    return (
      <Skill history={this.props.history} />
    )
  }
}

export default SkillSetup
