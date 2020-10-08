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

let FA = require('react-fontawesome')

class Skill extends React.Component {
  state = {
    id: '',
    skills: [],
    subSkills: [],

    currentSkill: 0,
    currentSubSkills: [],
  }

  componentWillMount () {
    axios.get(
      `${process.env.REACT_APP_BACKEND_API}/skill/skill/`,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("access")
        }
      }
    ).then(response => {
      if (response.data && response.data[0].length) {
        this.setState({
          skills: response.data[0],
          subSkills: response.data[1],
          currentSkill: response.data[0][0]['id']
        })

        axios.get(
          `${process.env.REACT_APP_BACKEND_API}/user/skill/`,
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("access")
            }
          }
        ).then(response => {
          if (response.data && response.data.skills) {
            const skills = response.data.skills.split(',')
            const currentSubSkills = this.state.subSkills.filter(subSkill => skills.includes(subSkill.id.toString()))

            this.setState({
              currentSubSkills: currentSubSkills
            })
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  handleSkillSelect = (selectedSubSkill) => {
    let subSkills = this.state.currentSubSkills
    subSkills.push(selectedSubSkill)
    this.setState({currentSubSkills: subSkills})
  }

  handleSkillUnSelect = (id) => {
    let subSkills = this.state.currentSubSkills.filter(currentSubSkill => currentSubSkill.id !== id)
    this.setState({currentSubSkills: subSkills})
  }

  handleNext = () => {
    const currentSubSkillIds = this.state.currentSubSkills.map((currentSubSkill) => currentSubSkill.id)
    let form_data = new FormData()
    form_data.append('skills', currentSubSkillIds.toString())
    form_data.append('is_profile_completed', 'true')

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
      this.props.history.push('/intro')
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
                  <span className="block-title">Expertise</span>
                </CCardHeader>
                <CCardBody>
                  <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    {/* Area */}
                    <CFormGroup row>
                      <CCol xs={6} lg={4}>
                        <CFormGroup>
                          <CLabel>Area</CLabel>
                          <CSelect custom name="select" id="select" onChange={e => this.setState({currentSkill: parseInt(e.target.value)})}>
                            {
                              this.state.skills.map(skill => {
                                return (
                                  <option key={skill.id} value={skill.id}>{skill.name}</option>
                                )
                              })
                            }
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs={12} lg={12} md={12} style={{height: "100px"}}>
                        {
                          this.state.currentSubSkills.map(skill => {
                            return (
                              <CButton key={skill.id} shape="pill" color="secondary" style={{marginBottom: "5px", marginRight: "5px"}} onClick={() => this.handleSkillUnSelect(skill.id)}>
                                <FA name="check" /> {skill.name}
                              </CButton>
                            )
                          })
                        }
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs={6} lg={4}>
                        <CLabel>SubArea</CLabel><br />
                      </CCol>
                      <CCol xs={12} lg={12} md={12}>
                        {
                          this.state.subSkills.map(skill => {
                            const currentSubSkillIds = this.state.currentSubSkills.map((currentSubSkill) => currentSubSkill.id)
                            if (skill.parent === this.state.currentSkill && !currentSubSkillIds.includes(skill.id))
                              return (
                                <CButton key={skill.id} variant="outline" color="light" style={{marginBottom: "5px", marginRight: "5px"}} onClick={() => this.handleSkillSelect(skill)}>
                                  <FA name="plus" /> {skill.name}
                                </CButton>
                              )
                            return null
                          })
                        }
                      </CCol>
                    </CFormGroup>
                  </CForm>
                </CCardBody>
                <CCardFooter className="justify-content-end">
                  <CButton className="btn-primary" onClick={this.handleNext} disabled={!(this.state.currentSubSkills && this.state.currentSubSkills.length > 0)}> Next </CButton>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </>
    )
  }
}

export default Skill
