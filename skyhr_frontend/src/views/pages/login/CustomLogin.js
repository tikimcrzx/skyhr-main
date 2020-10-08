import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from "react-toastify"
import LinkedIn from "linkedin-login-for-react"
import QueryString from 'query-string'
import { connect } from "react-redux"

import "react-toastify/dist/ReactToastify.min.css"
import SocialButton from './components/SocialButton'
import { loginWithJWT } from '../../../redux/actions/auth/auth'
import { login, register, facebookLogin, googleLogin, linkedInLogin } from "../../../services/auth"


class CustomLogin extends Component {
  state = {
    data: [
      {
        image: "/img/login_1.svg"
      },
      {
        image: "/img/login_2.svg"
      },
      {
        image: "/img/login_3.svg"
      }
    ],
    email: '',
    pass: '',
    reg_username: '',
    reg_first_name: '',
    reg_middle_name: '',
    reg_last_name: '',
    reg_email: '',
    reg_pass: '',

    loginText: "Login",
    loginButtonText: "Login",
    signUpText: "Sign Up",
    signUpButtonText: "Sign Up",
    forgotText: "Forgot Password?",
    rememberText: "Remember Me",
    text_1: "with your social network",
    text_2: "By clicking, you are continue to receive newsletters & promotions from Appo"
  }

  componentDidMount(){
    const params = QueryString.parse(window.location.search);

    if (params.code || params.error) {
      this.linkedInAccessToken(params.code)
    }
  }

  register = async (e) => {
    e.preventDefault()

    const data = {
      'email': this.state.reg_email,
    }

    this.setState({signUpButtonText: 'Submitting...'})
    let response  = await register(data)
    if (response.status === 200)
      toast.info(response.data.message)
    else if (response.status === 400)
      toast.error(response.data)
    else
      toast.error("Authentication Failed")

    this.setState({signUpButtonText: 'Sign Up'})
  }

  login = async (e) => {
    e.preventDefault()

    const data = {
      'email': this.state.email,
      'password': this.state.pass,
    }

    this.setState({loginButtonText: 'Submitting...'})

    let response  = await login(data)

    if (response.status === 200) {
      this.props.loginWithJWT(response.data)

      localStorage.setItem('user', JSON.stringify(response.data.user))
      this.setState({loginButtonText: 'Login'})

      this.props.history.push('/dashboard')
    } else {
      if (response.status === 401)
        toast.error("You not signed up yet.")
      else
        toast.error("You not signed up yet.")
      this.setState({loginButtonText: 'Login'})
    }
  }

  responseFacebook = async (response) => {
    let fbResponse  = await facebookLogin(response._token.accessToken, response._profile.id, response._profile.email)

    if(fbResponse.status === 200) {
      this.props.loginWithJWT(fbResponse.data)
      localStorage.setItem('user', JSON.stringify(fbResponse.data.user))
      this.props.history.push('/social_setup')
    } else {
      toast.error("Authentication Failed")
    }
  }

  responseGoogle = async (response) => {
    let googleResponse  = await googleLogin(response._token.idToken)

    if (googleResponse.status === 200) {
      this.props.loginWithJWT(googleResponse.data)
      localStorage.setItem('user', JSON.stringify(googleResponse.data.user))
      this.props.history.push("/social_setup")
    } else {
      toast.error("Authentication Failed")
    }
  }

  responseLinkedIn = async (error) => {
    if (error) {
      toast.error("Authentication Failed")
    } else {

    }
  };

  linkedInAccessToken = async (code) => {
    let linkedInResponse = await linkedInLogin(code)

    if (linkedInResponse.status === 200) {
      this.props.loginWithJWT(linkedInResponse.data)
      localStorage.setItem('user', JSON.stringify(linkedInResponse.data.user))
      this.props.history.push("/social_setup")
    } else {
      toast.error("Authentication Failed")
    }
  }

  handleFailure = (e) => {
    console.log("Social Login Failed", e)
  }

  render() {
    const params = QueryString.parse(window.location.search);
    if (params.code || params.error) {
      return null
    }

    return (
      <section className="section login-area h-100vh py-4">
        <div className="container h-100">
          <div className="row align-items-center justify-content-center h-100">
            <div className="col-12 col-sm-10 col-md-6 col-lg-6 mx-auto d-none d-md-block">
              <div className="login-slider owl-carousel">
                {this.state.data.map((item, idx) => {
                  return(
                    <img key={`ld_${idx}`} src={item.image} alt="" />
                  );
                })}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-5">
              {/* Appo Modal */}
              <div className="appo-modal py-4 p-lg-4">
                {/* Modal Content */}
                <div className="modal-content">

                  {/* Modal Header */}
                  <div className="modal-header p-0 border-0">
                    <ul className="nav nav-pills" id="pills-tab">
                      <li className="nav-item">
                        <a className="nav-link active" id="login-tab" data-toggle="pill" href="#login">{this.state.loginText}</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" id="signup-tab" data-toggle="pill" href="#signup">{this.state.signUpText}</a>
                      </li>
                    </ul>
                    <button type="button" className="close m-0" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="modal-body">
                    <div className="tab-content" id="pills-tabContent">
                      {/* Login Form */}
                      <div className="tab-pane fade show active" id="login">
                        {/* Social Login */}
                        <div className="social-login text-center">
                          <h5 className="fw-4 mt-2 mb-3">{this.state.text_1}</h5>
                          {/* Social Icons */}
                          <div className="justify-content-center">
                            <SocialButton
                              provider='facebook'
                              appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                              onLoginSuccess={this.responseFacebook}
                              onLoginFailure={this.handleFailure}
                            >
                              <button type="button" className="facebook">
                                <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                              </button>
                            </SocialButton>

                            <SocialButton
                              provider='google'
                              appId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                              onLoginSuccess={this.responseGoogle}
                              onLoginFailure={this.handleFailure}
                            >
                              <button type="button" className="google">
                                <FontAwesomeIcon icon={['fab', 'google']} />
                              </button>
                            </SocialButton>

                            <div className="social-icons">
                              <LinkedIn
                                clientId="78b2saphywwdww"
                                callback={this.responseLinkedIn}
                                className="linkedin"
                                scope={["r_liteprofile","r_emailaddress"]}
                                text={<FontAwesomeIcon icon={['fab', 'linkedin-in']} />}
                              />
                            </div>
                          </div>
                        </div>

                        <form action="#" className="login-form">
                          {/* Profile Login */}
                          <div className="profile-login mb-2 p-4">
                            <span className="bg-white p-2">or</span>
                          </div>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="basic-addon1"><i className="fas fa-user" /></span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Username or Email"
                              value={this.state.email}
                              onChange={e => this.setState({ email: e.target.value })}
                            />
                          </div>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="basic-addon2"><i className="fas fa-unlock-alt" /></span>
                            </div>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              value={this.state.pass}
                              onChange={e => this.setState({ pass: e.target.value })}
                            />
                          </div>
                          <div className="custom-control custom-checkbox d-flex my-4">
                            <div className="remember">
                              <input type="checkbox" className="custom-control-input" id="customCheck1" />
                              <label className="custom-control-label" htmlFor="customCheck1">{this.state.rememberText}</label>
                            </div>
                            <div className="forgot-password ml-auto">
                              <span><a href="/forgot">{this.state.forgotText}</a></span>
                            </div>
                          </div>
                          {/* Login Button */}
                          <button className="btn btn-bordered d-block" onClick={this.login} style={{width: "100%"}}>{this.state.loginButtonText}</button>
                        </form>
                      </div>

                      {/* Signup Form */}
                      <div className="tab-pane fade" id="signup">
                        {/* Social Login */}
                        <div className="social-login text-center">
                          <h5 className="fw-4 mt-2 mb-3">{this.state.text_1}</h5>
                          {/* Social Icons */}
                          <div className="justify-content-center">
                            <SocialButton
                              provider='facebook'
                              appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                              onLoginSuccess={this.responseFacebook}
                              onLoginFailure={this.handleFailure}
                            >
                              <button type="button" className="facebook">
                                <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                              </button>
                            </SocialButton>

                            <SocialButton
                              provider='google'
                              appId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                              onLoginSuccess={this.responseGoogle}
                              onLoginFailure={this.handleFailure}
                            >
                              <button type="button" className="google">
                                <FontAwesomeIcon icon={['fab', 'google']} />
                              </button>
                            </SocialButton>

                            <div className="social-icons">
                              <LinkedIn
                                clientId="78b2saphywwdww"
                                callback={this.responseLinkedIn}
                                className="linkedin"
                                scope={["r_liteprofile","r_emailaddress"]}
                                text={<FontAwesomeIcon icon={['fab', 'linkedin-in']} />}
                              />
                            </div>
                          </div>
                        </div>

                        <form action="#" className="signup-form">
                          {/* Profile Signup */}
                          <div className="profile-login mb-2 p-4">
                            <span className="bg-white p-2">or</span>
                          </div>

                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="basic-addon4"><i className="fas fa-envelope" /></span>
                            </div>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              value={this.state.reg_email}
                              onChange={e => this.setState({ reg_email: e.target.value })}
                            />
                          </div>

                          <div className="custom-control custom-checkbox my-4">
                            <div className="remember">
                              <input type="checkbox" className="custom-control-input" id="customCheck2" />
                              <label className="custom-control-label" htmlFor="customCheck2">{this.state.text_2}</label>
                            </div>
                          </div>
                          {/* Signup Button */}
                          <button className="btn btn-bordered d-block" onClick={this.register} style={{width: "100%"}}>{this.state.signUpButtonText}</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ToastContainer />
        </div>
      </section>
    )
  }
}

export default connect(null, { loginWithJWT })(CustomLogin)
