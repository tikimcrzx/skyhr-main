import React, {useState, useEffect } from "react"
import {
  CCard,
  CCardBody,
  CCol,
  CRow, CFormGroup, CLabel, CInput, CSelect, CButton, CCardHeader
} from "@coreui/react"
import axios from "axios"
import CheckboxGroup from 'react-checkbox-group'

import history from "../../../history"

const CreateJobStep2 = (props) => {
  let cachedJob = JSON.parse(localStorage.getItem('job'))
  const [jobKinds, setJobKinds] = useState([])
  const [jobKind, setJobKind] = useState(cachedJob && cachedJob.kind ? cachedJob.kind : '')
  const [paidType, setPaidType] = useState(cachedJob && cachedJob.paid_type ? cachedJob.paid_type : 'R')
  const [startRate, setStartRate] = useState("30")
  const [endRate, setEndRate] = useState("50")
  const [paidKind, setPaidKind] = useState(cachedJob && cachedJob.paid_kind ? cachedJob.paid_kind : 'PH')
  const [supplements, setSupplements] = useState([])
  const [supplement, setSupplement] = useState(cachedJob && cachedJob.supplement ? cachedJob.supplement : '')
  const [benefits, setBenefits] = useState([])
  const [hireCount, setHireCount] = useState(cachedJob && cachedJob.hire_count ? cachedJob.hire_count : '')
  const [deadline, setDeadline] = useState(cachedJob && cachedJob.deadline ? cachedJob.deadline : '')
  const [benefit, setBenefit] = useState(cachedJob && cachedJob.benefit ? cachedJob.benefit : [])

  // error states
  const [invalidJobKind, setInvalidJobKind] = useState(false)
  const [invalidStartRate, setInvalidStartRate] = useState(false)
  const [invalidEndRate, setInvalidEndRate] = useState(false)
  const [invalidBenefit, setInvalidBenefit] = useState(false)
  const [invalidHireCount, setInvalidHireCount] = useState(false)
  const [invalidDeadline, setInvalidDeadline] = useState(false)

  useEffect(() => {
    // Anything in here is fired on component mount.
    axios.get(
      `${process.env.REACT_APP_BACKEND_API}/job/kinds/`,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("access")
        }
      }
    ).then(response => {
      setJobKinds(response.data)
    }).catch(error => {
      if (error.response.status === 401)
      {
        localStorage.clear()
        history.push('/login')
      } else {
        setJobKinds([])
      }
    })

    axios.get(
      `${process.env.REACT_APP_BACKEND_API}/job/supplements/`,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("access")
        }
      }
    ).then(response => {
      setSupplements(response.data)
    }).catch(error => {
      if (error.response.status === 401)
      {
        localStorage.clear()
        history.push('/login')
      } else {
        setSupplements([])
      }
    })

    axios.get(
      `${process.env.REACT_APP_BACKEND_API}/job/benefits/`,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("access")
        }
      }
    ).then(response => {
      setBenefits(response.data)
    }).catch(error => {
      if (error.response.status === 401)
      {
        localStorage.clear()
        history.push('/login')
      } else {
        setBenefits([])
      }
    })
  }, [])

  const handlePrev = () => {
    history.push('/dashboard/post_job1')
  }

  const handleNext = () => {
    if (jobKind === "")
      setInvalidJobKind(true)
    else
      setInvalidJobKind(false)

    if (startRate === "")
      setInvalidStartRate(true)
    else
      setInvalidStartRate(false)

    if (endRate === "")
      setInvalidEndRate(true)
    else
      setInvalidEndRate(false)

    if (benefit.length === 0)
      setInvalidBenefit(true)
    else
      setInvalidBenefit(false)

    if (deadline === "")
      setInvalidDeadline(true)
    else
      setInvalidDeadline(false)

    if (hireCount === "")
      setInvalidHireCount(true)
    else
      setInvalidHireCount(false)

    if (jobKind === "" || startRate === "" || endRate === "" || benefit.length === 0 || deadline === "" || hireCount === "")
      return

    cachedJob.kind = jobKind
    cachedJob.paid_type = paidType
    cachedJob.supplement = supplement
    cachedJob.paid_kind = paidKind
    cachedJob.start_rate = startRate
    cachedJob.end_rate = endRate
    cachedJob.hire_count = hireCount
    cachedJob.deadline = deadline
    cachedJob.benefit = benefit

    localStorage.setItem('job', JSON.stringify(cachedJob))

    history.push('/dashboard/post_job3')
  }

  return (
    <>
      <div>
        <CRow className="justify-content-center">
          <CCol xs="12" md="12" lg="8">
            <CCard>
              <CCardBody className="card-body">
                {/*<div className="justify-content-center row">*/}
                {/*  <span className="block-title">Job Details</span>*/}
                {/*</div>*/}
                <h1>Job Details</h1>
              </CCardBody>
            </CCard>

            {/* Job kinds */}
            <CCard>
              <CCardBody className="card-body">
                <CFormGroup>
                  <CLabel
                    className={invalidJobKind ? "invalid-title" : ""}
                  >
                    What type of job is it? (*)
                  </CLabel>
                  {
                    jobKinds.map(kind => {
                      return (
                        <CFormGroup className="form-control" key={kind.id}>
                          <input
                            type="radio"
                            name="kind"
                            id={`kind_${kind.id}`}
                            value={kind.id}
                            onChange={e => setJobKind(e.target.value)}
                            checked={jobKind && jobKind === kind.id.toString()}
                          />
                          <label style={{marginLeft: "15px", width: "90%"}} htmlFor={`kind_${kind.id}`}>{kind.kind_name}</label>
                        </CFormGroup>
                      )
                    })
                  }
                </CFormGroup>
              </CCardBody>
            </CCard>

            {/* Paid Types */}
            <CCard>
              <CCardHeader className="card-sub-title">
                <h3>What's the pay?</h3>
                <h6>Tell job seekers the pay and receive up to two times more applications (*)</h6>
              </CCardHeader>
              <CCardBody className="card-body">
                <CFormGroup>
                  <CLabel>
                      <span>
                        <b>What is the pay for this job?</b><br />
                        Review the pay estimates we've pre-filled to ensure it aligns with your job.
                      </span>
                  </CLabel>

                  <CFormGroup row>
                    <CCol
                      lg={4}
                    >
                      <CSelect onChange={e => setPaidType(e.target.value)}>
                        <option value="R" selected={paidType === 'R'}>Range</option>
                        <option value="S" selected={paidType === 'S'}>Starting at</option>
                        <option value="U" selected={paidType === 'U'}>Up to</option>
                        <option value="E" selected={paidType === 'E'}>Exact rate</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                  {
                    paidType === "R" ?
                      <CFormGroup row>
                        <CCol lg={3} style={{display: "flex"}} >
                          $ &nbsp;&nbsp;&nbsp;
                          <CInput
                            type="number"
                            value={startRate}
                            onChange={e => setStartRate(e.target.value)}
                            invalid={invalidStartRate}
                          />
                        </CCol>

                        <CCol lg={3} style={{display: "flex", marginLeft: "-15px"}} >
                          to &nbsp;&nbsp;&nbsp;&nbsp;
                          <CInput
                            type="number"
                            value={endRate}
                            onChange={e => setEndRate(e.target.value)}
                            invalid={invalidEndRate}
                          />
                        </CCol>

                        <CCol lg={5} >
                          <CSelect onChange={e => setPaidKind(e.target.value)}>
                            <option value="PH" selected={paidKind === 'PH'}>per hour</option>
                            <option value="PD" selected={paidKind === 'PD'}>per day</option>
                            <option value="PW" selected={paidKind === 'PW'}>per week</option>
                            <option value="PM" selected={paidKind === 'PM'}>per month</option>
                            <option value="PY" selected={paidKind === 'PY'}>per year</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                      : paidType === "S" ?
                      <CFormGroup row>
                        <CCol lg={3} style={{display: "flex"}} >
                          $ &nbsp;&nbsp;&nbsp;
                          <CInput
                            type="number"
                            value={startRate}
                            onChange={e => setStartRate(e.target.value)}
                            invalid={invalidStartRate}
                          />
                        </CCol>

                        <CCol lg={5} >
                          <CSelect onChange={e => setPaidKind(e.target.value)}>
                            <option value="PH" selected={paidKind === 'PH'}>per hour</option>
                            <option value="PD" selected={paidKind === 'PD'}>per day</option>
                            <option value="PW" selected={paidKind === 'PW'}>per week</option>
                            <option value="PM" selected={paidKind === 'PM'}>per month</option>
                            <option value="PY" selected={paidKind === 'PY'}>per year</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                      : paidType === "U" ?
                        <CFormGroup row>
                          <CCol lg={3} style={{display: "flex"}} >
                            $ &nbsp;&nbsp;&nbsp;
                            <CInput
                              type="number"
                              value={endRate}
                              onChange={e => setEndRate(e.target.value)}
                              invalid={invalidEndRate}
                            />
                          </CCol>

                          <CCol lg={5}>
                            <CSelect onChange={e => setPaidKind(e.target.value)}>
                              <option value="PH" selected={paidKind === 'PH'}>per hour</option>
                              <option value="PD" selected={paidKind === 'PD'}>per day</option>
                              <option value="PW" selected={paidKind === 'PW'}>per week</option>
                              <option value="PM" selected={paidKind === 'PM'}>per month</option>
                              <option value="PY" selected={paidKind === 'PY'}>per year</option>
                            </CSelect>
                          </CCol>
                        </CFormGroup>
                        :
                        <CFormGroup row>
                          <CCol lg={3} style={{display: "flex"}} >
                            $ &nbsp;&nbsp;&nbsp;
                            <CInput
                              type="number"
                              value={startRate}
                              onChange={e => setStartRate(e.target.value)}
                              invalid={invalidStartRate}
                            />
                          </CCol>

                          <CCol lg={5} >
                            <CSelect onChange={e => setPaidKind(e.target.value)}>
                              <option value="PH" selected={paidKind === 'PH'}>per hour</option>
                              <option value="PD" selected={paidKind === 'PD'}>per day</option>
                              <option value="PW" selected={paidKind === 'PW'}>per week</option>
                              <option value="PM" selected={paidKind === 'PM'}>per month</option>
                              <option value="PY" selected={paidKind === 'PY'}>per year</option>
                            </CSelect>
                          </CCol>
                        </CFormGroup>
                  }

                </CFormGroup>
              </CCardBody>
            </CCard>

            {/* Supplements */}
            <CCard>
              <CCardBody className="card-body">
                <CFormGroup>
                  <CLabel>Are there any forms of supplemental pay offered?</CLabel>
                  {
                    supplements.map(sup => {
                      return (
                        <CFormGroup className="form-control" key={sup.id}>
                          <input
                            type="radio"
                            name="supplement"
                            id={`supplement_${sup.id}`}
                            value={sup.id}
                            onChange={e => setSupplement(e.target.value)}
                            checked={supplement && supplement === sup.id.toString()}
                          />
                          <label style={{marginLeft: "15px", width: "90%"}} htmlFor={`supplement_${sup.id}`}>
                            {sup.supplement_name}
                          </label>
                        </CFormGroup>
                      )
                    })
                  }
                </CFormGroup>
              </CCardBody>
            </CCard>

            {/* Benefits */}
            <CCard>
              <CCardBody className="card-body">
                <CFormGroup>
                  <CLabel
                    className={invalidBenefit ? "invalid-title" : ""}
                  >
                    Are any of the following benefits offered (*)?
                  </CLabel>
                  {
                    <CheckboxGroup name="fruits" value={benefit} onChange={setBenefit}>
                      {
                        (Checkbox) => (
                          <>
                            {
                              benefits.map(element => {
                                return (
                                  <CFormGroup className="form-control" key={element.id}>
                                    <label style={{width: "90%"}} htmlFor={`benefit_${element.id}`}>
                                      <Checkbox
                                        id={`benefit_${element.id}`}
                                        value={element.id}
                                        style={{marginRight: "15px"}}
                                      />
                                      {element.benefit_name}
                                    </label>
                                  </CFormGroup>
                                )
                              })
                            }
                          </>
                        )
                      }
                    </CheckboxGroup>
                  }
                </CFormGroup>
              </CCardBody>
            </CCard>

            {/* Hire & Urgent */}
            <CCard>
              <CCardBody className="card-body">
                <CFormGroup>
                  <CLabel>
                      <span>
                        <b>How many hires do you want to make for this position? (*)</b><br />
                        More hires will require more candidates.
                      </span>
                  </CLabel>
                  <CSelect
                    onChange={e => setHireCount(e.target.value)}
                    invalid={invalidHireCount}
                  >
                    <option></option>
                    <option value="ONE" selected={hireCount === "1"}>1</option>
                    <option value="TWO" selected={hireCount === "2"}>2</option>
                    <option value="THREE" selected={hireCount === "3"}>3</option>
                    <option value="FOUR" selected={hireCount === "4"}>4</option>
                    <option value="FIVE" selected={hireCount === "5"}>5</option>
                    <option value="SIX" selected={hireCount === "6"}>6</option>
                    <option value="SEVEN" selected={hireCount === "7"}>7</option>
                    <option value="EIGHT" selected={hireCount === "8"}>8</option>
                    <option value="NIGHT" selected={hireCount === "9"}>9</option>
                    <option value="TEN" selected={hireCount === "10"}>10</option>
                    <option value="MTEN" selected={hireCount === "10+"}>10+ hires</option>
                    <option value="ONGOING" selected={hireCount === "ongoing"}>I have an ongoing need to fill this role</option>
                  </CSelect>
                </CFormGroup>

                <CFormGroup>
                  <CLabel>
                      <span>
                        <b>How urgently do you need to make a hire? (*)</b><br />
                        Help us help you hit your deadline.
                      </span>
                  </CLabel>
                  <CSelect
                    onChange={e => setDeadline(e.target.value)}
                    invalid={invalidDeadline}
                  >
                    <option></option>
                    <option value="1:3:D" selected={deadline === "1:3:D"}>1 to 3 days</option>
                    <option value="3:7:D" selected={deadline === "3:7:D"}>3 to 7 days</option>
                    <option value="1:2:W" selected={deadline === "1:2:W"}>1 to 2 weeks</option>
                    <option value="2:4:W" selected={deadline === "2:4:W"}>2 to 4 weeks</option>
                    <option value="4::W" selected={deadline === "4::W"}>More than 4 weeks</option>
                  </CSelect>
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
                  onClick={handleNext}
                >
                  Continue
                </CButton>
              </CCardBody>
            </CCard>

          </CCol>
        </CRow>
      </div>
    </>
  )
}

export default CreateJobStep2
