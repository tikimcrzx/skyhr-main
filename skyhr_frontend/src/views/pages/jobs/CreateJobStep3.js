import React, {useState, useEffect } from "react"
import {
  CCard,
  CCardBody,
  CCol,
  CRow, CFormGroup, CLabel, CButton
} from "@coreui/react"
import axios from "axios"
import history from "../../../history"
import CheckboxGroup from "react-checkbox-group"

const CreateJobStep3 = (props) => {
  let cachedJob = JSON.parse(localStorage.getItem('job'))
  const [jobAvailabilities, setJobAvailabilities] = useState([])
  const [jobAvailability, setJobAvailability] = useState(cachedJob && cachedJob.availability ? cachedJob.availability : [])

  // error states
  const [invalidAvailability, setInvalidAvailability] = useState(false)

  useEffect(() => {
    // Anything in here is fired on component mount.
    axios.get(
      `${process.env.REACT_APP_BACKEND_API}/job/availabilities/`,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("access")
        }
      }
    ).then(response => {
      setJobAvailabilities(response.data)
    }).catch(error => {
      if (error.response.status === 401)
      {
        localStorage.clear()
        history.push('/login')
      } else {
        setJobAvailabilities([])
      }
    })
  }, [])

  const handlePrev = () => {
    history.push('/dashboard/post_job2')
  }

  const handleNext = () => {
    if (jobAvailability.length === 0)
      setInvalidAvailability(true)
    else
      setInvalidAvailability(false)

    if (jobAvailability.length === 0)
      return

    cachedJob.availability = jobAvailability
    localStorage.setItem('job', JSON.stringify(cachedJob))

    history.push('/dashboard/post_job4')
  }

  return (
    <>
      <div>
        <CRow className="justify-content-center">
          <CCol xs="12" md="12" lg="8">
            <CCard>
              <CCardBody className="card-body">
                <h1>Additional Job Details</h1>
              </CCardBody>
            </CCard>

            {/* Availability */}
            <CCard>
              <CCardBody className="card-body">
                <CFormGroup>
                  <CLabel
                    className={invalidAvailability ? "invalid-title" : ""}
                  >
                    What availability is needed for this job? (*)
                  </CLabel>
                  {
                    <CheckboxGroup name="fruits" value={jobAvailability} onChange={setJobAvailability}>
                      {
                        (Checkbox) => (
                          <>
                            {
                              jobAvailabilities.map(element => {
                                return (
                                  <CFormGroup className="form-control" key={element.id}>
                                    <label style={{width: "90%"}} htmlFor={`availability_${element.id}`}>
                                      <Checkbox
                                        id={`availability_${element.id}`}
                                        value={element.id}
                                        style={{marginRight: "15px"}}
                                      />
                                      {element.availability_name}
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

export default CreateJobStep3
