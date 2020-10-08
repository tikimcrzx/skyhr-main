import React from 'react'
import SocialLogin from 'react-social-login'

class SocialButton extends React.Component {
  render() {
    return (
      <div className="social-icons" onClick={this.props.triggerLogin} {...this.props}>
        {this.props.children}
      </div>
    )
  }
}

export default SocialLogin(SocialButton)
