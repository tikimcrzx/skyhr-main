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
  CRow
} from "@coreui/react"
import axios from "axios"
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import Avatar from 'react-avatar-edit'
import PhoneInput from 'react-phone-input-2'

import 'react-phone-input-2/lib/style.css'
import {getUserInfo} from "../../services/user"


class Profile extends React.Component {
  state = {
    first_name: getUserInfo().first_name ? getUserInfo().first_name : '',
    last_name: getUserInfo().last_name ? getUserInfo().last_name : '',
    mid_name: getUserInfo().mid_name ? getUserInfo().mid_name : '',
    rfc: getUserInfo().rfc ? getUserInfo().rfc : '',
    curp: getUserInfo().curp ? getUserInfo().curp : '',
    birth: getUserInfo().birth ? getUserInfo().birth : '',
    email: getUserInfo().email ? getUserInfo().email : '',
    mobile: getUserInfo().mobile ? getUserInfo().mobile : '',
    country: getUserInfo().country ? getUserInfo().country : '',
    state: getUserInfo().state ? getUserInfo().state : '',
    zipcode: getUserInfo().zipcode ? getUserInfo().zipcode : '',
    address1: getUserInfo().address1 ? getUserInfo().address1 : '',
    address2: getUserInfo().address2 ? getUserInfo().address2 : '',
    linkedin_profile: getUserInfo().linkedin_profile ? getUserInfo().linkedin_profile : '',
    facebook_profile: getUserInfo().facebook_profile ? getUserInfo().facebook_profile : '',
    twitter_profile: getUserInfo().twitter_profile ? getUserInfo().twitter_profile : '',
    photo: getUserInfo().photo ? getUserInfo().photo : '',

    src: undefined,

    invalid_first_name: false,
    invalid_last_name: false,
    invalid_rfc: false,
    invalid_curp: false,
    invalid_mobile: false,
    invalid_country: false,
    invalid_state: false,
    invalid_zipcode: false,
    invalid_address1: false,
  }

  selectCountry (val) {
    this.setState({ country: val, state: '' });
  }

  selectRegion (val) {
    this.setState({ state: val });
  }

  handleImageChange = (e) => {
    this.setState({
      photo: e.target.files[0]
    })
  };

  b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = window.atob(b64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)

      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    return new Blob(byteArrays, {type: contentType})
  }

  onSubmit = () => {
    let error_counter = 0
    if (this.state.first_name === "") {
      this.setState({invalid_first_name: true})
      error_counter++
    } else {
      this.setState({invalid_first_name: false})
    }

    if (this.state.last_name === "") {
      this.setState({invalid_last_name: true})
      error_counter++
    } else {
      this.setState({invalid_last_name: false})
    }

    if (this.state.rfc === "") {
      this.setState({invalid_rfc: true})
      error_counter++
    } else {
      this.setState({invalid_rfc: false})
    }

    if (this.state.curp === "") {
      this.setState({invalid_curp: true})
      error_counter++
    } else {
      this.setState({invalid_curp: false})
    }

    if (this.state.mobile === "") {
      this.setState({invalid_mobile: true})
      error_counter++
    } else {
      this.setState({invalid_mobile: false})
    }

    if (this.state.country === "") {
      this.setState({invalid_country: true})
      error_counter++
    } else {
      this.setState({invalid_country: false})
    }

    if (this.state.state === "") {
      this.setState({invalid_state: true})
      error_counter++
    } else {
      this.setState({invalid_state: false})
    }

    if (this.state.zipcode === "") {
      this.setState({invalid_zipcode: true})
      error_counter++
    } else {
      this.setState({invalid_zipcode: false})
    }

    if (this.state.address1 === "") {
      this.setState({invalid_address1: true})
      error_counter++
    } else {
      this.setState({invalid_address1: false})
    }

    if (error_counter > 0)
      return

    let form_data = new FormData();
    form_data.append('first_name', this.state.first_name)
    form_data.append('last_name', this.state.last_name)
    form_data.append('mid_name', this.state.mid_name)
    form_data.append('rfc', this.state.rfc)
    form_data.append('curp', this.state.curp)
    form_data.append('birth', this.state.birth)
    form_data.append('email', this.state.email)
    form_data.append('mobile', this.state.mobile)
    form_data.append('country', this.state.country)
    form_data.append('state', this.state.state)
    form_data.append('zipcode', this.state.zipcode)
    form_data.append('address1', this.state.address1)
    form_data.append('address2', this.state.address2)
    form_data.append('linkedin_profile', this.state.linkedin_profile)
    form_data.append('facebook_profile', this.state.facebook_profile)
    form_data.append('twitter_profile', this.state.twitter_profile)
    form_data.append('is_company', 'false')

    if (this.state.photo){
      try {
        const contentType = this.state.photo.split(':')[1].split(';')[0]
        const b64Data = this.state.photo.split(',')[1]
        const blob = this.b64toBlob(b64Data, contentType);
        form_data.append('photo', blob, "blob."+contentType.split('/')[1]);
      } catch (e) {
      }
    }

    axios.post(
      `${process.env.REACT_APP_BACKEND_API}/user/profile/`,
      form_data,
      {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('access')
        }
      }
    ).then(response => {
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data))
        this.props.history.push('/experience_setup')
      } else if (response.status === 226)
        this.setState({errorText: response.data.error})
    }).catch(error => {
      console.log(error)
    })
  }

  onClose = () => {
    this.setState({photo: null})
  }

  onCrop = (photo) => {
    this.setState({photo})
  }

  onBeforeFileLoad = (elem) => {
    if(elem.target.files[0].size > 2097152){
      alert("File is too big!")
      elem.target.value = ""
    }
  }

  onFileLoad = (data) => {
    console.log(data)
  }

  render() {
    return (
      <>
        <div>
          <CRow className="justify-content-center">
            <CCol xs="12" md="12" lg="7">
              <CCard>
                <CCardBody className="card-body">
                  <div className="justify-content-center row">
                    <span className="block-title">Welcome to SkyHR</span>
                  </div>
                  <div className="justify-content-center row heading">
                    <span className="block-small-title">Complete your account setup</span>
                  </div>
                  <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    {/* Name */}
                    <CFormGroup row>
                      <CCol lg={4}>
                        <CFormGroup>
                          <CLabel htmlFor="text-input">First Name</CLabel>
                          {
                            this.state.invalid_first_name ?
                              <CInput id="first_name" invalid name="first_name" value={this.state.first_name} onChange={(e) => this.setState({first_name: e.target.value})} />
                              :
                              <CInput id="first_name" name="first_name" value={this.state.first_name} onChange={(e) => this.setState({first_name: e.target.value})} />
                          }
                          <CFormText>* Required</CFormText>
                        </CFormGroup>
                      </CCol>

                      <CCol lg={4}>
                        <CFormGroup>
                          <CLabel htmlFor="text-input">Last Name</CLabel>
                          {
                            this.state.invalid_last_name ?
                              <CInput invalid value={this.state.last_name} onChange={(e) => this.setState({last_name: e.target.value})} />
                              :
                              <CInput value={this.state.last_name} onChange={(e) => this.setState({last_name: e.target.value})} />
                          }
                          <CFormText>* Required</CFormText>
                        </CFormGroup>
                      </CCol>

                      <CCol lg={4}>
                        <CFormGroup>
                          <CLabel htmlFor="text-input">Mid Name</CLabel>
                          <CInput value={this.state.mid_name} onChange={(e) => this.setState({mid_name: e.target.value})} />
                        </CFormGroup>
                      </CCol>
                    </CFormGroup>

                    {/* Email & Phone */}
                    <CFormGroup row>
                      <CCol xs={6}>
                        <CFormGroup>
                          <CLabel>Email</CLabel>
                          <CInput type="email" value={this.state.email} autoComplete="email" disabled />
                          <CFormText>* Required</CFormText>
                        </CFormGroup>
                      </CCol>

                      <CCol xs={6}>
                        <CFormGroup>
                          <CLabel>Phone</CLabel>

                          <PhoneInput
                            placeholder="Enter phone number"
                            country={'us'}
                            id="mobile"
                            value={this.state.mobile}
                            enableAreaCodes={true}
                            enableSearch={true}
                            inputProps={{
                              id: 'mobile',
                            }}
                            onChange={mobile => this.setState({mobile})}
                          />

                          <CFormText>* Required</CFormText>
                        </CFormGroup>
                      </CCol>
                    </CFormGroup>

                    {/* RFC & CURP */}
                    <CFormGroup row>
                      <CCol xs={6}>
                        <CFormGroup>
                          <CLabel htmlFor="text-input">RFC</CLabel>
                          {
                            this.state.invalid_rfc ?
                              <CInput invalid value={this.state.rfc} onChange={(e) => this.setState({rfc: e.target.value})} />
                              :
                              <CInput value={this.state.rfc} onChange={(e) => this.setState({rfc: e.target.value})} />
                          }
                          <CFormText>* Required</CFormText>
                        </CFormGroup>
                      </CCol>

                      <CCol xs={6}>
                        <CFormGroup>
                          <CLabel htmlFor="text-input">CURP</CLabel>
                          {
                            this.state.invalid_curp ?
                              <CInput invalid value={this.state.curp} onChange={(e) => this.setState({curp: e.target.value})} />
                              :
                              <CInput value={this.state.curp} onChange={(e) => this.setState({curp: e.target.value})} />
                          }
                          <CFormText>* Required</CFormText>
                        </CFormGroup>
                      </CCol>
                    </CFormGroup>

                    {/* Country & State & Zip Code */}
                    <CFormGroup row>
                      <CCol lg={4}>
                        <CFormGroup>
                          <CLabel htmlFor="text-input">Country</CLabel>

                          <CountryDropdown
                            value={this.state.country}
                            className={this.state.invalid_country ? "form-control is-invalid" : "form-control"}
                            onChange={(val) => this.selectCountry(val)}
                          />

                          <CFormText>* Required</CFormText>
                        </CFormGroup>
                      </CCol>

                      <CCol lg={4}>
                        <CFormGroup>
                          <CLabel htmlFor="text-input">State</CLabel>

                          <RegionDropdown
                            country={this.state.country}
                            value={this.state.state}
                            className={this.state.invalid_state ? "form-control is-invalid" : "form-control"}
                            onChange={(val) => this.selectRegion(val)}
                          />

                          <CFormText>* Required</CFormText>
                        </CFormGroup>
                      </CCol>

                      <CCol lg={4}>
                        <CFormGroup>
                          <CLabel htmlFor="text-input">Zip Code</CLabel>
                          {
                            this.state.invalid_state ?
                              <CInput invalid value={this.state.zipcode} onChange={(e) => this.setState({zipcode: e.target.value})} />
                              :
                              <CInput value={this.state.zipcode} onChange={(e) => this.setState({zipcode: e.target.value})} />
                          }
                          <CFormText>* Required</CFormText>
                        </CFormGroup>
                      </CCol>
                    </CFormGroup>

                    {/* Address1 & Address2 */}
                    <CFormGroup row>
                      <CCol xs={6}>
                        <CFormGroup>
                          <CLabel>Address1</CLabel>
                          {
                            this.state.invalid_address1 ?
                              <CInput type="text" invalid value={this.state.address1} onChange={(e) => this.setState({address1: e.target.value})} />
                              :
                              <CInput type="text" value={this.state.address1} onChange={(e) => this.setState({address1: e.target.value})} />
                          }
                          <CFormText>* Required</CFormText>
                        </CFormGroup>
                      </CCol>

                      <CCol xs={6}>
                        <CFormGroup>
                          <CLabel>Address2</CLabel>
                          <CInput type="text" value={this.state.address2} onChange={(e) => this.setState({address2: e.target.value})} />
                        </CFormGroup>
                      </CCol>
                    </CFormGroup>

                    {/* Birth & Photo */}
                    <CFormGroup row>
                      <CCol xs={6}>
                        <CFormGroup>
                          <CLabel>Birthday</CLabel>
                          <CInput type="date" value={this.state.birth} onChange={(e) => this.setState({birth: e.target.value})} />
                        </CFormGroup>
                      </CCol>

                      <CCol xs={6}>
                        <CFormGroup>
                          <CLabel>Photo</CLabel>
                          {/*<CInputFile id="photo" name="photo" accept="image/png, image/jpeg" onChange={this.handleImageChange} />*/}

                          <Avatar
                            width={300}
                            height={250}
                            // imageHeight={170}
                            onCrop={this.onCrop}
                            onClose={this.onClose}
                            onBeforeFileLoad={this.onBeforeFileLoad}
                            onFileLoad={this.onFileLoad}
                            src={this.state.src}
                          />

                        </CFormGroup>
                      </CCol>
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel>LinkedIn</CLabel>
                      <CInput value={this.state.linkedin_profile} onChange={(e) => this.setState({linkedin_profile: e.target.value})} />
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel>Facebook</CLabel>
                      <CInput value={this.state.facebook_profile} onChange={(e) => this.setState({facebook_profile: e.target.value})} />
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel>Twitter</CLabel>
                      <CInput value={this.state.twitter_profile} onChange={(e) => this.setState({twitter_profile: e.target.value})} />
                    </CFormGroup>

                  </CForm>
                </CCardBody>
                <CCardFooter>
                  <CButton type="button" size="sm" color="primary" onClick={this.onSubmit} > Next </CButton>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </>
    )
  }
}

export default Profile
