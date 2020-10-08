import React, {useState, useEffect } from "react"
import {
  CCard,
  CCardBody,
  CCol,
  CRow, CForm, CFormGroup, CLabel, CInput, CSelect, CButton, CCardFooter
} from "@coreui/react"
import axios from "axios"
import {CountryDropdown, RegionDropdown} from "react-country-region-selector"
import history from "../../../history"

const CreateJobStep1 = (props) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const cachedJob = JSON.parse(localStorage.getItem('job'))
  const [companyName, setCompanyName] = useState(cachedJob &&cachedJob.company_name ? cachedJob.company_name : user.company_name)
  const [invalidCompanyName, setInvalidCompanyName] = useState(false)
  const [jobTitle, setJobTitle] = useState(cachedJob && cachedJob.title ? cachedJob.title : '')
  const [invalidJobTitle, setInvalidJobTitle] = useState(false)
  const [jobCategory, setJobCategory] = useState(cachedJob && cachedJob.category ? cachedJob.category : '')
  const [invalidJobCategory, setInvalidJobCategory] = useState(false)
  const [jobCategories, setJobCategories] = useState([])
  const [jobStreet, setJobStreet] = useState(cachedJob && cachedJob.street ? cachedJob.street : '')
  const [jobZipcode, setJobZipcode] = useState(cachedJob && cachedJob.zipcode ? cachedJob.zipcode : '')
  const [jobCountry, setJobCountry] = useState(cachedJob && cachedJob.country ? cachedJob.country : '')
  const [jobState, setJobState] = useState(cachedJob && cachedJob.state ? cachedJob.state : '')

  const [showAddress, setShowAddress] = useState(true)
  const [hideAddress, setHideAddress] = useState(false)

  useEffect(() => {
    // Anything in here is fired on component mount.
    axios.get(
      `${process.env.REACT_APP_BACKEND_API}/job/categories/`,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("access")
        }
      }
    ).then(response => {
      setJobCategories(response.data)
    }).catch(error => {
      if (error.response.status === 401)
      {
        localStorage.clear()
        history.push('/login')
      } else {
        setJobCategories([])
      }
    })
  }, [])

  const handleNext = () => {
    if (companyName === '')
      setInvalidCompanyName(true)
    else
      setInvalidCompanyName(false)

    if (jobTitle === '')
      setInvalidJobTitle(true)
    else
      setInvalidJobTitle(false)

    if (jobCategory === "")
      setInvalidJobCategory(true)
    else
      setInvalidJobCategory(false)

    if (companyName === "" || jobCategory === "" || jobTitle === "")
      return

    let job = {}
    job.company_name = companyName
    job.title = jobTitle
    job.category = jobCategory
    job.country = jobCountry
    job.state = jobState
    job.street = jobStreet
    job.zipcode = jobZipcode

    localStorage.setItem('job', JSON.stringify(job))
    history.push('/dashboard/post_job2')
  }

  return (
    <>
      <div>
        <CRow className="justify-content-center">
          <CCol xs="12" md="12" lg="8">
            <CCard>
              <CCardBody className="card-body">
                <div className="justify-content-center row">
                  <span className="block-title">Welcome to post your job</span>
                </div>
              </CCardBody>
            </CCard>

            <CCard>
              <CCardBody className="card-body">
                <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <CFormGroup>
                    <CLabel><b>Company Name (*)</b></CLabel>
                    {
                      !invalidCompanyName ?
                        <CInput onChange={e => setCompanyName(e.target.value)} value={companyName} />
                        :
                        <CInput invalid onChange={e => setCompanyName(e.target.value)} />
                    }
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel><b>Job Title (*)</b></CLabel>
                    {
                      !invalidJobTitle ?
                        <CInput
                          value={jobTitle}
                          onChange={e => setJobTitle(e.target.value)}
                          placeholder="Senior Full stack developer" />
                        :
                        <CInput invalid onChange={e => setJobTitle(e.target.value)} />
                    }
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel><b>What category does this job fall under? (*)</b></CLabel>
                    <CSelect
                      invalid={invalidJobCategory}
                      onChange={e => setJobCategory(e.target.value)}
                    >
                      <option>Select category</option>
                      {
                        jobCategories && jobCategories.map(category => {
                          return (
                            <option
                              key={category.id}
                              value={category.id}
                              selected={cachedJob && cachedJob.category === category.id.toString()}
                            >
                              {category.category_name}
                            </option>
                          )
                        })
                      }
                    </CSelect>
                  </CFormGroup>

                  <CFormGroup row>
                    <CLabel style={{marginLeft: "15px"}}>
                      <b>How do you want your location displayed to job seekers?</b>
                    </CLabel>
                    <CCol lg={6}>
                      <CCard
                        style={showAddress ? {borderColor: 'blue'} : {borderColor: '#d8dbe0'}}
                        onClick={e => {
                          setShowAddress(true)
                          setHideAddress(false)
                        }}
                      >
                        <CCardBody style={{padding: "0px"}}>
                          <img src="/img/show_address.png" alt="Show address"/>
                        </CCardBody>
                        <CCardFooter>
                          <span>
                            <b>Show street address</b><br />
                            Job seekser will see a map with a location pin.
                          </span>
                        </CCardFooter>
                      </CCard>
                    </CCol>
                    <CCol lg={6}>
                      <CCard
                        style={hideAddress ? {borderColor: 'blue'} : {borderColor: '#d8dbe0'}}
                        onClick={e => {
                          setShowAddress(false)
                          setHideAddress(true)
                        }}
                      >
                        <CCardBody style={{padding: "0px"}}>
                          <img src="/img/hide_address.png" alt="Hide address" />
                        </CCardBody>
                        <CCardFooter>
                          <span>
                            <b>Hide street address</b><br />
                            Job seekser will see a map with a highlighted radius.
                          </span>
                        </CCardFooter>
                      </CCard>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel>
                      <b>Enter a street address</b><br />
                      {
                        showAddress ?
                          'We will share your street address with job seeksers to help them calculate their commute.'
                        :
                          'We won\'t share your street address. We use your location to find candidates in your area.'
                      }
                    </CLabel>
                    <CInput value={jobStreet} onChange={e => setJobStreet(e.target.value)} />
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol lg={4}>
                      <CFormGroup>
                        <CLabel htmlFor="text-input">Country</CLabel>
                        <CountryDropdown
                          value={jobCountry}
                          className="form-control"
                          onChange={(country) => setJobCountry(country)}
                        />
                      </CFormGroup>
                    </CCol>

                    <CCol lg={4}>
                      <CFormGroup>
                        <CLabel htmlFor="text-input">State</CLabel>
                        <RegionDropdown
                          country={jobCountry}
                          value={jobState}
                          className="form-control"
                          onChange={(state) => setJobState(state)}
                        />
                      </CFormGroup>
                    </CCol>

                    <CCol lg={4}>
                      <CFormGroup>
                        <CLabel htmlFor="text-input">Zipcode</CLabel>
                        <CInput value={jobZipcode} onChange={(e) => setJobZipcode(e.target.value)} />
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCard>

            <CCard>
              <CCardBody className="card-body">
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

export default CreateJobStep1
