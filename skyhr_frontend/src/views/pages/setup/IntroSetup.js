import React from "react"
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup, CInvalidFeedback,
  CRow
} from "@coreui/react"
import Webcam from "react-webcam"
import axios from "axios"

import '../../../scss/style.scss'

class IntroSetup extends React.Component {
  constructor(props) {
    super(props);
    this.webcamRef = React.createRef();
    this.mediaRecorderRef = React.createRef();

    this.state = {
      capturing: false,
      recordedChunks: [],
      maxFileSizeError: false,

      currentVideo: '',
    }
  }

  componentWillMount() {
    axios.get(
      `${process.env.REACT_APP_BACKEND_API}/user/video/`,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("access")
        }
      }
    ).then(response => {
      if (response.data.video)
        this.setState({currentVideo: response.data.video})
    }).catch(error => {
      console.log(error.response)
    })
  }

  handleStartCaptureClick = () => {
    this.setState({capturing: true, recordedChunks: []})
    this.mediaRecorderRef.current = new MediaRecorder(this.webcamRef.current.stream, {
      mimeType: "video/webm"
    })
    this.mediaRecorderRef.current.addEventListener(
      "dataavailable",
      this.handleDataAvailable
    )

    this.mediaRecorderRef.current.start()
  }

  handleDataAvailable = (data) => {
    if (data.data.size > 0) {
      this.setState({recordedChunks: this.state.recordedChunks.concat(data.data)})
    }
  }

  handleStopCaptureClick = () => {
    this.mediaRecorderRef.current.stop()
    this.setState({capturing: false})
  }

  handleDelete = () => {
    axios.delete(
      `${process.env.REACT_APP_BACKEND_API}/user/video/`,
      {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem("access")
        }
      }
    ).then(response => {
      if (response.status === 204)
        this.setState({currentVideo: ''})
    }).catch(error => {
      if (error.response.data.error === "max_limited_size")
        this.setState({maxFileSizeError: true})
    })
  }

  handleUpload = () => {
    const video = new Blob(this.state.recordedChunks, {
      type: "video/webm"
    })

    let form_data = new FormData()
    form_data.append('video', video, 'intro.webm')

    axios.put(
      `${process.env.REACT_APP_BACKEND_API}/user/video/`,
      form_data,
      {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem("access")
        }
      }
    ).then(response => {
      if (response.data.video)
        this.setState({
          currentVideo: response.data.video,
          recordedChunks: []
        })
    }).catch(error => {
      if (error.response.data.error === "max_limited_size")
        this.setState({maxFileSizeError: true})
    })
  }

  handleNext = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <>
        <div className="">
          <CRow className="justify-content-center">
            <CCol xs="12" md="12" lg="7">
              <CCard>
                <CCardHeader className="card-title">
                  <span className="block-title">Introduction Video</span>
                </CCardHeader>
                <CCardBody>
                  <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    {/* Video */}
                    <CFormGroup>
                      {
                        this.state.currentVideo !== '' ?
                          <video src={this.state.currentVideo} className="col-12 col-md-9 col-lg-9" controls />
                          :
                          <Webcam className="col-12 col-md-9 col-lg-9" audio={true} ref={this.webcamRef} />
                      }

                      <div className="col-12 col-md-9 col-lg-9">
                        {
                          this.state.capturing && this.state.currentVideo === "" ?
                            <CButton variant="outline" color="light" onClick={this.handleStopCaptureClick}>Stop Capture</CButton>
                            :
                            !this.state.capturing && this.state.currentVideo === "" ?
                              <CButton variant="outline" color="light" onClick={this.handleStartCaptureClick}>Start Capture</CButton>
                              :
                              <></>
                        }

                        {
                          this.state.currentVideo !== "" ?
                            <CButton variant="outline" color="light" onClick={this.handleDelete} style={{float: "right"}}> Delete </CButton>
                            :
                            <CButton
                              variant="outline"
                              color="light"
                              onClick={this.handleUpload}
                              disabled={this.state.recordedChunks.length <= 0}
                              style={{float: "right"}}
                            >
                              Upload
                            </CButton>
                        }
                      </div>

                      <CInvalidFeedback
                        style={this.state.maxFileSizeError ? {"display" : "block"} : {"display" : "none"}}
                      >
                        Max file size limited
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CForm>
                </CCardBody>
                <CCardFooter className="justify-content-end">
                  <CButton className="btn-primary" onClick={this.handleNext} disabled={this.state.currentVideo === ''}> Next </CButton>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </>
    )
  }
}

export default IntroSetup
