import React, { Component } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.min.css"
import {connect} from "react-redux"
import {loginWithJWT} from "../../../../redux/actions/auth/auth"


class ActivateSection extends Component {
  state = {
    first_name: '',
    mid_name: '',
    last_name: '',
    password1: '',
    password2: '',
    buttonText: 'Create My Account',

    account_type: undefined,

    company_name: '',
    rfc: '',
    company_password1: '',
    company_password2: '',
  }

  handleSelectAccountType = (isCandidate) => {
    if (isCandidate)
      this.setState({account_type: "candidate"})
    else
      this.setState({account_type: "company"})
  }

  handleCandidateSubmit = () => {
    if (this.state.password1 !== this.state.password2) {
      toast.error("Password doesn't match", {hideProgressBar: false})
      return
    }

    if (this.state.first_name === "") {
      toast.error("Please input your first name", {hideProgressBar: false})
      return
    }

    if (this.state.last_name === "") {
      toast.error("Please input your first name", {hideProgressBar: false})
      return
    }

    this.setState({buttonText: "Creating..."})

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_BACKEND_API}/user/activate/${this.props.token}/`,
      data: {
        password: this.state.password1,
        first_name: this.state.first_name,
        mid_name: this.state.mid_name,
        last_name: this.state.last_name,
        account_type: this.state.account_type
      }
    }).then( response => {
      this.props.loginWithJWT(response.data)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      this.props.history.push("/profile_setup")
    }).catch(error => {
      this.setState({buttonText: "Create My Account"})

      if (error.response){
        const data = error.response.data

        toast.error(String(data[Object.keys(data)[0]]))
      }
      else{
        toast.error("Couldn't connect to server. Probably you are offline")
      }
    })
  }

  handleCompanySubmit = () => {
    if (this.state.company_password1 !== this.state.company_password2) {
      toast.error("Password doesn't match", {hideProgressBar: false})
      return
    }

    if (this.state.company_name === "") {
      toast.error("Please input company name", {hideProgressBar: false})
      return
    }

    if (this.state.rfc === "") {
      toast.error("Please input RFC", {hideProgressBar: false})
      return
    }

    this.setState({buttonText: "Creating..."})

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_BACKEND_API}/user/activate/${this.props.token}/`,
      data: {
        password: this.state.company_password1,
        company_name: this.state.company_name,
        rfc: this.state.rfc,
        account_type: this.state.account_type
      }
    }).then( response => {
      this.props.loginWithJWT(response.data)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      this.props.history.push("/company_profile_setup")
    }).catch(error => {
      this.setState({buttonText: "Create My Account"})

      if (error.response){
        const data = error.response.data

        toast.error(String(data[Object.keys(data)[0]]))
      }
      else{
        toast.error("Couldn't connect to server. Probably you are offline")
      }
    })
  }

  render() {
    return (
      <section id="contact" className="contact-area ptb_100">
        <ToastContainer hideProgressBar={true} />

        <div className="container" id="select_account_type" style={this.state.account_type ? {display: "none"} : {display: "block"}}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-6">
              {/* Section Heading */}
              <div className="section-heading text-center">
                <h2 className="text-capitalize">Welcome to SkyHR</h2>
                <p className="d-none d-sm-block mt-4">Please select account type</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {/* Candidate Box */}
              <div className="contact-box text-center">
                {/* Candidate Form */}
                <button type="button" className="btn btn-bordered col-12 col-md-10 col-lg-5" onClick={() => this.handleSelectAccountType(false)}>Company</button>
                <p className="form-message" />
              </div>
            </div>

            <div className="col-12">
              {/* Candidate Box */}
              <div className="contact-box text-center">
                {/* Candidate Form */}
                <button type="button" className="btn btn-bordered col-12 col-md-10 col-lg-5" onClick={() => this.handleSelectAccountType(true)}>Candidate</button>
                <p className="form-message" />
              </div>
            </div>
          </div>
        </div>

        <div className="container" style={this.state.account_type ? {display: "block"} : {display: "none"}}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-6">
              {/* Section Heading */}
              <div className="section-heading text-center">
                <h2 className="text-capitalize">Welcome to SkyHR</h2>
                <p className="d-none d-sm-block mt-4">Please activate your account</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/* Contact Box */}
              <div className="contact-box text-center">
                {/* Contact Form */}
                <form id="form" action="#">
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-5" id="candidate" style={this.state.account_type === "candidate" ? {display: "block"} : {display: "none"}}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          required="required"
                          value={this.state.first_name}
                          onChange={e => this.setState({ first_name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          required="required"
                          value={this.state.last_name}
                          onChange={e => this.setState({ last_name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mid Name"
                          required="required"
                          value={this.state.mid_name}
                          onChange={e => this.setState({ mid_name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          required="required"
                          value={this.state.password1}
                          onChange={e => this.setState({ password1: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password"
                          required="required"
                          value={this.state.password2}
                          onChange={e => this.setState({ password2: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <button type="button" className="btn btn-bordered mt-3 mt-sm-4" onClick={this.handleCandidateSubmit}>{this.state.buttonText}</button>
                      </div>
                    </div>

                    <div className="col-12 col-md-10 col-lg-5" id="company" style={this.state.account_type === "company" ? {display: "block"} : {display: "none"}}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Company Name"
                          required="required"
                          value={this.state.company_name}
                          onChange={e => this.setState({ company_name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="RFC"
                          required="required"
                          value={this.state.rfc}
                          onChange={e => this.setState({ rfc: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          required="required"
                          value={this.state.company_password1}
                          onChange={e => this.setState({ company_password1: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password"
                          required="required"
                          value={this.state.company_password2}
                          onChange={e => this.setState({ company_password2: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <button type="button" className="btn btn-bordered mt-3 mt-sm-4" onClick={this.handleCompanySubmit}>{this.state.buttonText}</button>
                      </div>
                    </div>
                  </div>
                </form>
                <p className="form-message" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(null, { loginWithJWT })(ActivateSection)
