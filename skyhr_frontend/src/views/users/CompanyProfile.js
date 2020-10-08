import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
  CInvalidFeedback,
} from "@coreui/react"
import {connect} from 'react-redux'

import axios from "axios"
import {getUserInfo} from "../../services/user"

class CompanyProfile extends React.Component {
  state = {
    company_name: getUserInfo().company_name,
    rfc: getUserInfo().rfc,

    invalid_company_name: false,
    invalid_rfc: false,
    errorText: '',
  }

  handleNext = () => {
    let form_data = new FormData()
    form_data.append('company_name', this.state.company_name)
    form_data.append('rfc', this.state.rfc)
    form_data.append('is_company', 'true')

    axios.post(
      `${process.env.REACT_APP_BACKEND_API}/user/profile/`,
      form_data,
      {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem("access")
        }
      }
    ).then(response => {
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data))
        this.props.history.push('/company_sector_setup')
      } else if (response.status === 226)
        this.setState({errorText: response.data.error})
    }).catch(error => {
      console.log(error)
    })

  }

  render() {
    return (
      <>
        <div className="">
          <CRow className="justify-content-center">
            <CCol xs="9" md="7" lg="4">
              <CCard>
                <CCardBody>

                  <div className="justify-content-center row">
                    <span className="block-title">Welcome to SkyHR</span>
                  </div>
                  <div className="justify-content-center row heading">
                    <span className="block-small-title">Complete your account setup</span>
                  </div>

                  <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    <CFormGroup>
                      <CLabel>Company Name</CLabel>
                      {
                        this.state.invalid_company_name ?
                          <CInput
                            type="text"
                            invalid
                            value={this.state.company_name}
                            onChange={(e) =>
                              this.setState({
                                company_name: e.target.value,
                                invalid_company_name: e.target.value === "",
                              })
                            }
                          />
                          :
                          <CInput
                            type="text"
                            value={this.state.company_name}
                            onChange={(e) =>
                              this.setState({
                                company_name: e.target.value,
                                invalid_company_name: e.target.value === "",
                              })
                            }
                          />
                      }
                      <CFormText>* Required</CFormText>
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel>RFC</CLabel>
                      {
                        this.state.invalid_rfc ?
                          <CInput
                            type="text"
                            invalid
                            value={this.state.rfc}
                            onChange={(e) =>
                              this.setState({
                                rfc: e.target.value,
                                invalid_rfc: e.target.value === "",
                              })
                            }
                          />
                          :
                          <CInput
                            type="text"
                            value={this.state.rfc}
                            onChange={(e) =>
                              this.setState({
                                rfc: e.target.value,
                                invalid_rfc: e.target.value === "",
                              })
                            }
                          />
                      }
                      <CFormText>* Required</CFormText>
                      <CInvalidFeedback className="help-block" style={{display: "block"}}>{this.state.errorText}</CInvalidFeedback>
                    </CFormGroup>
                  </CForm>
                </CCardBody>
                <CCardFooter className="justify-content-end">
                  <CButton className="btn-primary" onClick={this.handleNext} disabled={this.state.company_name === '' || this.state.rfc === ''}> Next </CButton>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  }
}

export default connect(mapStateToProps, null)(CompanyProfile);
