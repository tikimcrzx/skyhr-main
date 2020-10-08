import React, {useState, useEffect } from "react"
import {
  CCard,
  CCardBody,
  CCol,
  CRow, CFormGroup, CLabel, CButton, CButtonGroup, CInput, CLink
} from "@coreui/react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus} from "@fortawesome/free-solid-svg-icons"
import {faTimes} from "@fortawesome/free-solid-svg-icons"
import axios from "axios"

import history from "../../../history"
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'

const CreateJobStep5 = (props) => {
  let cachedJob = JSON.parse(localStorage.getItem('job'))
  const [isEmail, setIsEmail] = useState(true)
  const [isSecondEmail, setIsSecondEmail] = useState(false)
  const [isThirdEmail, setIsThirdEmail] = useState(false)
  const [isPhone, setIsPhone] = useState(false)
  const [isPerson, setIsPerson] = useState(false)
  const [isDaily, setIsDaily] = useState(true)
  const [isIndividual, setIsIndividual] = useState(false)
  const [phone, setPhone] = useState('')
  const [firstEmail, setFirstEmail] = useState('')
  const [secondEmail, setSecondEmail] = useState('')
  const [thirdEmail, setThirdEmail] = useState('')

  // error states
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidSecondEmail, setInvalidSecondEmail] = useState(false)
  const [invalidThirdEmail, setInvalidThirdEmail] = useState(false)
  const [invalidPhone, setInvalidPhone] = useState(false)

  useEffect(() => {
    // Anything in here is fired on component mount.
  }, [])

  const handlePrev = () => {
    history.push('/dashboard/post_job4')
  }

  const emailIsValid = (email) => {
    // return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  const handlePost = () => {
    console.log("isPhone = ", isPhone)
    console.log("phone = ", phone)
    if (isEmail && firstEmail === "")
      setInvalidEmail(true)
    else
      setInvalidEmail(false)

    if (isPhone && phone === "")
      setInvalidPhone(true)
    else
      setInvalidPhone(false)

    if ((isEmail && firstEmail === "") || (isPhone && phone === ""))
      return

    if (isEmail) {
      cachedJob.receive_method = 'E'
      if (emailIsValid(firstEmail))
        cachedJob.first_email = firstEmail
      else
        setInvalidEmail(true)
      cachedJob.second_email = ''
      cachedJob.third_email = ''
      cachedJob.phone = ''
    }

    if (isSecondEmail)
      if (emailIsValid(secondEmail))
        cachedJob.second_email = secondEmail
      else
        setInvalidSecondEmail(true)

    if (isThirdEmail)
      if (emailIsValid(thirdEmail))
        cachedJob.third_email = thirdEmail
      else
        setInvalidThirdEmail(true)

    if (isPhone) {
      cachedJob.receive_method = 'P'
      cachedJob.phone = phone
      cachedJob.first_email = ''
      cachedJob.second_email = ''
      cachedJob.third_email = ''
    }
    if (isDaily) {
      cachedJob.inform_method = 'D'
    }
    if (isIndividual) {
      cachedJob.inform_method = 'I'
    }

    localStorage.setItem('job', JSON.stringify(cachedJob))

    axios.post(
      `${process.env.REACT_APP_BACKEND_API}/job/job/`,
      cachedJob,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("access")
        }
      }
    ).then(response => {
      localStorage.removeItem('job')
      history.push('/dashboard')
    }).catch(error => {
      console.log(error)
    })
  }

  const showAdditionalEmail = () => {
    if (!isSecondEmail) {
      setIsSecondEmail(true)
    } else if (!isThirdEmail) {
      setIsThirdEmail(true)
    }
  }

  const removeSecondEmail = () => {
    setIsSecondEmail(false)
  }

  const removeThirdEmail = () => {
    setIsThirdEmail(false)
  }

  return (
    <>
      <div>
        <CRow className="justify-content-center">
          <CCol xs="12" md="12" lg="9">
            <CCard>
              <CCardBody className="card-body">
                <h1>Application Settings</h1>
              </CCardBody>
            </CCard>

            <CCard>
              <CCardBody className="card-body">
                <CFormGroup>
                  <CLabel><b>How do you want to receive applications? (*)</b></CLabel>
                  <CFormGroup>
                    <CButtonGroup>
                      <CButton
                        color={isEmail ? "group-selected" : "group-primary"}
                        onClick={() => {
                          setIsEmail(true)
                          setIsPhone(false)
                          setIsPerson(false)
                        }}
                      >
                        Email
                      </CButton>
                      <CButton
                        color={isPhone ? "group-selected" : "group-primary"}
                        onClick={() => {
                          setIsEmail(false)
                          setIsSecondEmail(false)
                          setIsThirdEmail(false)
                          setIsPhone(true)
                          setIsPerson(false)
                        }}
                      >
                        Phone
                      </CButton>
                      <CButton
                        color={isPerson ? "group-selected" : "group-primary"}
                        onClick={() => {
                          setIsEmail(false)
                          setIsSecondEmail(false)
                          setIsThirdEmail(false)
                          setIsPhone(false)
                          setIsPerson(true)
                        }}
                      >
                        In-person
                      </CButton>
                    </CButtonGroup>
                  </CFormGroup>
                </CFormGroup>

                {
                  isEmail ?
                    <CFormGroup>
                      <CLabel><b>Applications for this job will be sent to the following email address(es) (*)</b></CLabel>

                      <CFormGroup>
                        <CInput
                          type='email'
                          className="col-5"
                          invalid={invalidEmail}
                          value={firstEmail}
                          onChange={e => setFirstEmail(e.target.value)}
                        />
                      </CFormGroup>

                      {
                        isSecondEmail ?
                          <CFormGroup>
                            <CInput
                              type='email'
                              className="col-5"
                              style={{float: "left"}}
                              invalid={invalidSecondEmail}
                              value={secondEmail}
                              onChange={e => setSecondEmail(e.target.value)}
                            />
                            &nbsp;&nbsp;
                            <FontAwesomeIcon
                              icon={faTimes}
                              style={{height: "35px"}}
                              onClick={removeSecondEmail}
                            />
                          </CFormGroup>
                          :
                          ""
                      }

                      {
                        isThirdEmail ?
                          <CFormGroup>
                            <CInput
                              type='email'
                              className="col-5"
                              style={{float: "left"}}
                              invalid={invalidThirdEmail}
                              value={thirdEmail}
                              onChange={e => setThirdEmail(e.target.value)}
                            />
                            &nbsp;&nbsp;
                            <FontAwesomeIcon
                              icon={faTimes}
                              style={{height: "35px"}}
                              onClick={removeThirdEmail}
                            />
                          </CFormGroup>
                          :
                          ""
                      }

                      <CFormGroup>
                        <FontAwesomeIcon icon={faPlus} /> &nbsp;&nbsp;
                        <CLink
                          onClick={showAdditionalEmail}
                        >
                          Add additional email
                        </CLink>
                      </CFormGroup>
                    </CFormGroup>
                    :
                    ""
                }

                {
                  isPhone ?
                    <CFormGroup>
                      <CLabel>Applications for this job will be sent to the following phone (*)</CLabel>
                      <PhoneInput
                        placeholder="Enter phone number"
                        country={'us'}
                        id="mobile"
                        value={phone}
                        enableAreaCodes={true}
                        enableSearch={true}
                        inputProps={invalidPhone ? {
                          id: 'phone',
                          className: 'form-control invalid-phone'
                        } : {
                          id: 'phone'
                        }}
                        onChange={phone => setPhone(phone)}
                      />
                    </CFormGroup>
                    :
                    ""
                }

                <CFormGroup>
                  <CLabel><b>How often would you like to be informed of new applicants for this job? (*)</b></CLabel>
                  <CFormGroup>
                    <CButtonGroup>
                      <CButton
                        color={isDaily ? "group-selected" : "group-primary"}
                        onClick={() => {
                          setIsDaily(true)
                          setIsIndividual(false)
                        }}
                      >
                        Daily
                      </CButton>
                      <CButton
                        color={isIndividual ? "group-selected" : "group-primary"}
                        onClick={() => {
                          setIsDaily(false)
                          setIsIndividual(true)
                        }}
                      >
                        Individually
                      </CButton>
                    </CButtonGroup>
                  </CFormGroup>
                </CFormGroup>
              </CCardBody>
            </CCard>

            {/* Actions */}
            <CCard>
              <CCardBody className="card-body">
                <CButton
                  className="btn-light"
                  style={{float: "left"}}
                  onClick={handlePrev}
                >
                  Back
                </CButton>

                <CButton
                  className="btn-primary"
                  style={{float: "right"}}
                  onClick={handlePost}
                >
                  Post
                </CButton>
              </CCardBody>
            </CCard>

          </CCol>
        </CRow>
      </div>
    </>
  )
}

export default CreateJobStep5
