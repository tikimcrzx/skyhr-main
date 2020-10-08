import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CTextarea,
  CLabel, CModal, CModalBody,
  CRow,
  CInvalidFeedback
} from "@coreui/react"
import {connect} from 'react-redux'
import axios from "axios"

import { YearPicker, MonthPicker } from 'react-dropdown-date'
import {getEmployments, setEmployment, deleteEmployment, updateEmployment} from "../../redux/actions/user/user"

let FA = require('react-fontawesome')

class Employment extends React.Component {
  state = {
    employmentModal: false,

    id: '',
    company: '',
    position: '',
    description: '',
    start_year: 'Year',
    start_month: 'Month',
    end_year: 'Year',
    end_month: 'Month',
    is_current_work: '',

    isEdit: false,

    invalid_company: false,
    invalid_position: false,
    invalid_start_year: false,
    invalid_start_month: false,
    invalid_end_year: false,
    invalid_end_month: false,
  }

  openEmploymentModal = () => {
    this.setState({employmentModal: true})
  }

  toggleEmploymentModal = () => {
    this.setState({
      employmentModal: !this.state.employmentModal,
      isEdit: false
    })
  }

  handleSubmit = () => {
    let error_counter = 0
    if (this.state.company === "") {
      this.setState({invalid_company: true})
      error_counter++
    } else {
      this.setState({invalid_company: false})
    }

    if (this.state.position === "") {
      this.setState({invalid_position: true})
      error_counter++
    } else {
      this.setState({invalid_position: false})
    }

    if (this.state.start_year === "Year") {
      this.setState({invalid_start_year: true})
      error_counter++
    } else {
      this.setState({invalid_start_year: false})
    }

    if (this.state.start_month === "Month") {
      this.setState({invalid_start_month: true})
      error_counter++
    } else {
      this.setState({invalid_start_month: false})
    }

    if (this.state.end_year === "Year" && !this.state.is_current_work) {
      this.setState({invalid_end_year: true})
      error_counter++
    } else {
      this.setState({invalid_end_year: false})
    }

    if (this.state.end_month === "Month" && !this.state.is_current_work) {
      this.setState({invalid_end_month: true})
      error_counter++
    } else {
      this.setState({invalid_end_month: false})
    }


    if (!this.state.is_current_work) {
      if (parseInt(this.state.start_year) >= parseInt(this.state.end_year))
        if (parseInt(this.state.start_year) === parseInt(this.state.end_year) && parseInt(this.state.start_month) >= parseInt(this.state.end_month)) {
          this.setState({invalid_start_month: true, invalid_end_month: true})
        }
    } else {
      this.setState({end_year: 'Year', end_month: 'Month'})
    }

    if (error_counter > 0)
      return

    let form_data = new FormData()
    form_data.append('company', this.state.company)
    form_data.append('position', this.state.position)
    form_data.append('enter_date', this.state.start_year + '-' + (parseInt(this.state.start_month) + 1))
    if (this.state.is_current_work)
      form_data.append('end_date', '')
    else
      form_data.append('end_date', this.state.end_year + '-' + (parseInt(this.state.end_month)+1))
    form_data.append('achievement', this.state.description);
    form_data.append('is_current_work', this.state.is_current_work);

    if (!this.state.isEdit) {
      axios.put(
        `${process.env.REACT_APP_BACKEND_API}/user/employment/`,
        form_data,
        {
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem("access")
          }
        }
      ).then(response => {
        this.setState({employmentModal: false})
        this.props.setEmployment(response.data)
      }).catch(error => {
        console.log(error)
      })
    } else {
      form_data.append('id', this.state.id);
      axios.post(
        `${process.env.REACT_APP_BACKEND_API}/user/employment/`,
        form_data,
        {
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem("access")
          }
        }
      ).then(response => {
        this.setState({employmentModal: false})
        this.props.updateEmployment(response.data)
      }).catch(error => {
        console.log(error)
      })
    }

    return null
  }

  handleEdit = (id) => {
    return this.props.employments.map((employment, index) => {
      if (employment.id === id)
        this.setState({
          id: employment.id,
          company: employment.company,
          position: employment.position,
          description: employment.description,
          start_year: employment.enter_date.split('-')[0],
          start_month: parseInt(employment.enter_date.split('-')[1]) - 1,
          end_year: employment.end_date.split('-')[0],
          end_month: parseInt(employment.end_date.split('-')[1]) - 1,
          is_current_work: employment.is_current_work,
          employmentModal: true,
          isEdit: true
        })

      return null
    })
  }

  handleRemove = (id) => {
    axios.delete(
      `${process.env.REACT_APP_BACKEND_API}/user/employment/${id}`,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("access")
        }
      }).then(response => {
      console.log(response)
      this.props.deleteEmployment(id)
    }).catch(error => {
      console.log(error)
    })
  }

  handleNext = () => {
    this.props.history.push('/skill_setup')
  }

  render() {
    return (
      <>
        <div className="">
          <CRow className="justify-content-center">
            <CCol xs="12" md="12" lg="7">
              <CCard>
                <CCardHeader className="card-title">
                  <span className="block-title">Employment history</span>
                  <div className="card-header-actions">
                    <CButton color="link" className="card-header-action btn-setting" onClick={this.openEmploymentModal}>
                      <FA name="plus" />
                    </CButton>
                  </div>
                </CCardHeader>
                <CCardBody>
                  {this.props.employments && this.props.employments.length > 0 ? this.props.employments.map(employment => {
                    return (
                      <CRow key={employment.id}>
                        <CForm action="" method="post" className="form-horizontal col-12">
                          <CFormGroup row>
                            <CCol xs={8}>
                              <CFormGroup>
                                <span>{employment.position} / {employment.company}</span><br />
                                <span>{employment.enter_date} ~ {employment.end_date}</span>
                              </CFormGroup>
                            </CCol>
                            <CCol xs={4} >
                              <CFormGroup>
                                <CButton color="link" className="card-header-action" onClick={() => this.handleEdit(employment.id)}><FA name="edit" /></CButton>
                                <CButton color="link" className="card-header-action" onClick={() => this.handleRemove(employment.id)} style={{marginLeft: "10px"}}><FA name="trash" /></CButton>
                              </CFormGroup>
                            </CCol>
                          </CFormGroup>
                        </CForm>
                      </CRow>
                    )
                  }) : "No items to display"}
                </CCardBody>
                <CCardFooter className="justify-content-end">
                  <CButton className="btn-primary" onClick={this.handleNext} disabled={this.props.employments && this.props.employments.length > 0 ? false : true}> Next </CButton>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>

          <CModal
            show={this.state.employmentModal}
            onClose={() => this.toggleEmploymentModal()}
            size="lg"
          >
            <CModalBody style={{paddingLeft: "70px", paddingRight: "70px", paddingTop: "70px"}}>
              <h4>{this.state.isEdit ? 'Save' : 'Add'} employment</h4><br />

              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">

                {/* Position & Company */}
                <CFormGroup row>
                  <CCol xs={6}>
                    <CFormGroup>
                      <CLabel>Position</CLabel>
                      {
                        this.state.invalid_position ?
                          <CInput type="text" invalid value={this.state.position} onChange={(e) => this.setState({position: e.target.value})} />
                          :
                          <CInput type="text" value={this.state.position} onChange={(e) => this.setState({position: e.target.value})} />
                      }
                    </CFormGroup>
                  </CCol>

                  <CCol xs={6}>
                    <CFormGroup>
                      <CLabel>Company</CLabel>
                      {
                        this.state.invalid_company ?
                          <CInput type="text" invalid value={this.state.company} onChange={(e) => this.setState({company: e.target.value})} />
                          :
                          <CInput type="text" value={this.state.company} onChange={(e) => this.setState({company: e.target.value})} />
                      }
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                {/* Description */}
                <CFormGroup>
                  <CLabel>Description</CLabel>
                  <CTextarea
                    rows="6"
                    placeholder=""
                    value={this.state.description}
                    onChange={(e) => this.setState({description: e.target.value})}
                  />
                </CFormGroup>

                {/* Duration */}
                <CFormGroup row>
                  <CCol xs={4}>
                    <CFormGroup>
                      <CLabel>Start Date</CLabel>
                      <CFormGroup row>
                        <CCol xs={6}>
                          <CFormGroup>
                            <MonthPicker
                              defaultValue={this.state.start_month}
                              numeric
                              // default is full name
                              short
                              // default is Titlecase
                              caps
                              // mandatory if end={} is given in YearPicker
                              endYearGiven
                              // mandatory
                              year={this.state.start_year}
                              // default is false
                              required={true}
                              // default is false
                              disabled={false}
                              // mandatory
                              value={this.state.start_month}
                              // mandatory
                              onChange={(start_month) => {
                                this.setState({ start_month });
                              }}
                              classes={this.state.invalid_start_month ? 'form-control is-invalid col-md-12' : 'form-control col-md-12'}
                            />
                            {
                              this.state.invalid_start_year ?
                                <CInvalidFeedback className="help-block" style={{display: "block"}}>* required</CInvalidFeedback>
                                :
                                <CInvalidFeedback className="help-block" style={{display: "none"}}>* required</CInvalidFeedback>
                            }
                          </CFormGroup>
                        </CCol>
                        <CCol xs={6}>
                          <CFormGroup>
                            <YearPicker
                              defaultValue={this.state.start_year}
                              reverse
                              required={true}
                              disabled={false}
                              value={this.state.start_year}
                              onChange={(start_year) => {
                                this.setState({ start_year });
                              }}
                              classes={this.state.invalid_start_year ? 'form-control is-invalid col-md-12' : 'form-control col-md-12'}
                              optionClasses={'option classes'}
                            />
                            {
                              this.state.invalid_start_month ?
                                <CInvalidFeedback className="help-block" style={{display: "block"}}>* required</CInvalidFeedback>
                                :
                                <CInvalidFeedback className="help-block" style={{display: "none"}}>* required</CInvalidFeedback>
                            }
                          </CFormGroup>
                        </CCol>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>

                  <CCol xs={4}>
                    <CFormGroup>
                      <CLabel>End Date</CLabel>
                      <CFormGroup row>
                        <CCol xs={6}>
                          <CFormGroup>
                            <MonthPicker
                              defaultValue={this.state.end_month}
                              numeric
                              // default is full name
                              short
                              // default is Titlecase
                              caps
                              // mandatory if end={} is given in YearPicker
                              endYearGiven
                              // mandatory
                              year={this.state.end_year}
                              // default is false
                              required={true}
                              // default is false
                              disabled={this.state.is_current_work ? true : false}
                              // mandatory
                              value={this.state.end_month}
                              // mandatory
                              onChange={(end_month) => {
                                this.setState({ end_month })
                              }}
                              classes={this.state.invalid_end_month ? 'form-control is-invalid col-md-12' : 'form-control col-md-12'}
                            />
                            {
                              this.state.invalid_end_month ?
                                <CInvalidFeedback className="help-block" style={{display: "block"}}>* required</CInvalidFeedback>
                                :
                                <CInvalidFeedback className="help-block" style={{display: "none"}}>* required</CInvalidFeedback>
                            }
                          </CFormGroup>
                        </CCol>
                        <CCol xs={6}>
                          <CFormGroup>
                            <YearPicker
                              defaultValue={this.state.end_year}
                              reverse
                              required={true}
                              disabled={this.state.is_current_work ? true : false}
                              value={this.state.end_year}
                              onChange={(end_year) => {
                                this.setState({ end_year })
                              }}
                              classes={this.state.invalid_end_year ? 'form-control is-invalid col-md-12' : 'form-control col-md-12'}
                              optionClasses={'option classes'}
                            />
                            {
                              this.state.invalid_end_year ?
                                <CInvalidFeedback className="help-block" style={{display: "block"}}>* required</CInvalidFeedback>
                                :
                                <CInvalidFeedback className="help-block" style={{display: "none"}}>* required</CInvalidFeedback>
                            }
                          </CFormGroup>
                        </CCol>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>

                  <CCol xs={4}>
                    <CFormGroup style={{marginTop: "30px", marginLeft: "30px"}}>
                      <input
                        type="checkbox"
                        checked={this.state.is_current_work ? true : false}
                        onClick={() => this.setState({is_current_work: !this.state.is_current_work})}
                      />
                      <CLabel>I currently work here</CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup>
                  <CButton className="" color="info" onClick={this.handleSubmit}>{this.state.isEdit ? 'Save' : 'Add'}</CButton>{' '}
                  <CButton className="" color="secondary" onClick={this.toggleEmploymentModal}>Cancel</CButton>
                </CFormGroup>
              </CForm>
            </CModalBody>
          </CModal>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    employments: state.user.employments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEmployments: user => dispatch(getEmployments(user)),
    setEmployment: employment => dispatch(setEmployment(employment)),
    deleteEmployment: id => dispatch(deleteEmployment(id)),
    updateEmployment: employment => dispatch(updateEmployment(employment)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employment);
