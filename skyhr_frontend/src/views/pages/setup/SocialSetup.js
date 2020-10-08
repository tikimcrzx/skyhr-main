import React from "react"

import {Redirect} from "react-router-dom"
import {getUserInfo} from '../../../services/user'
import '../../../scss/style.scss'

class SocialSetup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCandidate: false,
      isCompany: false,

      is_profile_completed: getUserInfo().is_profile_completed
    }
  }

  handleSelectAccountType = (account_type) => {
    if (account_type)
      this.setState({isCandidate: true, isCompany: false})
    else
      this.setState({isCompany: true, isCandidate: false})
  }

  render() {
    if (this.state.is_profile_completed)
      return <Redirect to={{pathname: '/dashboard'}} />

    if (this.state.isCandidate && !this.state.isCompany)
      return <Redirect to={{pathname: '/profile_setup'}} />

    if (this.state.isCompany && !this.state.isCandidate)
      return <Redirect to={{pathname: '/company_profile_setup'}} />

    return (
      <section id="contact" className="contact-area ptb_100" style={!this.state.isCandidate && !this.state.isCompany ? {display: "block"} : {display: "none"}}>
        <div className="container" id="select_account_type">
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
      </section>
    )
  }
}


export default SocialSetup
