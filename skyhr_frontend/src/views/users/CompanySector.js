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
  CLabel,
  CRow,
  CSelect
} from "@coreui/react"
import axios from "axios"
import {getUserInfo} from "../../services/user"


class CompanySector extends React.Component {
  state = {
    id: '',
    sectors: [],

    currentSector: parseInt(getUserInfo().sector) ? parseInt(getUserInfo().sector) : 0,
  }

  componentWillMount () {
    axios.get(
      `${process.env.REACT_APP_BACKEND_API}/user/sectors/`,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("access")
        }
      }
    ).then(response => {
      if (response.data && response.data.length) {
        this.setState({
          sectors: response.data,
        })
      }
    }).catch(() => {
      this.props.history.push('/login')
    })
  }

  handleNext = () => {
    let form_data = new FormData()
    form_data.append('sector', this.state.currentSector)
    form_data.append('is_profile_completed', 'true')
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
      localStorage.setItem('user', JSON.stringify(response.data))
      this.props.history.push('/dashboard')
    }).catch(error => {
      console.log(error)
    })

  }

  render() {
    return (
      <>
        <div className="">
          <CRow className="justify-content-center">
            <CCol xs="12" md="12" lg="7">
              <CCard>
                <CCardHeader className="card-title">
                  <span className="block-title">Company Sector</span>
                </CCardHeader>
                <CCardBody>
                  <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    {/* Area */}
                    <CFormGroup row>
                      <CCol xs={8} lg={6}>
                        <CFormGroup>
                          <CLabel>Sector</CLabel>
                          <CSelect
                            onChange={e => this.setState({currentSector: parseInt(e.target.value)})}
                          >
                            <option>Select sector</option>
                            {
                              this.state.sectors.map(sector => {
                                return (
                                  <option
                                    key={sector.id}
                                    value={sector.id}
                                    selected={sector.id === parseInt(getUserInfo().sector)}
                                  >
                                    {sector.sector_name}
                                  </option>
                                )
                              })
                            }
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                    </CFormGroup>
                  </CForm>
                </CCardBody>
                <CCardFooter className="justify-content-end">
                  <CButton
                    className="btn-primary"
                    onClick={this.handleNext}
                    disabled={!(this.state.currentSector && this.state.currentSector !== 0)}
                  >
                    Next
                  </CButton>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </>
    )
  }
}

export default CompanySector
