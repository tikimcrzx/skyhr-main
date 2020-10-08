import React, {useState, useEffect } from "react"
import {
  CCard,
  CCardBody,
  CCol,
  CRow, CFormGroup, CLabel, CButton
} from "@coreui/react"
import 'font-awesome/css/font-awesome.css'
import FroalaEditor from 'react-froala-wysiwyg'

import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/js/plugins/emoticons.min.js'
import 'froala-editor/js/plugins/code_view.min.js'
// import 'froala-editor/js/plugins/file.min.js'
// import 'froala-editor/js/plugins/image.min.js'
// import 'froala-editor/js/plugins/video.min.js'
// import 'froala-editor/js/plugins/print.min.js'

import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'

import history from "../../../history"

const CreateJobStep4 = (props) => {
  let cachedJob = JSON.parse(localStorage.getItem('job'))
  const [model, setModel] = useState(cachedJob && cachedJob.description ? cachedJob.description : "")
  const [invalidDescription, setInvalidDescription] = useState(false)

  useEffect(() => {
    // Anything in here is fired on component mount.
  }, [])

  const handleModelChange = model => {
    setModel(model)
  }

  const handlePrev = () => {
    history.push('/dashboard/post_job3')
  }

  const handleNext = () => {
    if (model === "")
      setInvalidDescription(true)
    else
      setInvalidDescription(false)

    if (model === "")
      return

    cachedJob.description = model
    localStorage.setItem('job', JSON.stringify(cachedJob))

    history.push('/dashboard/post_job5')
  }

  return (
    <>
      <div>
        <CRow className="justify-content-center">
          <CCol xs="12" md="12" lg="9">
            <CCard>
              <CCardBody className="card-body">
                <h1>Job Description</h1>
              </CCardBody>
            </CCard>

            {/* Job kinds */}
            <CCard>
              <CCardBody className="card-body">
                <CFormGroup>
                  <CLabel
                    className={invalidDescription ? 'invalid-title': ''}
                  >
                    Describe the responsibilities of this job, required work experience, skills, or education. (*)
                  </CLabel>
                  <div  id="editor">
                    <FroalaEditor
                      tag="textarea"
                      config={{
                        placeholderText: 'Edit description of this job!',
                        charCounterCount: 2000,
                        // toolbarButtons: {
                        //   'moreText': {
                        //     'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
                        //     'buttonsVisible': 4,
                        //   },
                        //   'moreParagraph': {
                        //     'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
                        //     'buttonVisible': 4,
                        //   },
                        //   'moreRich': {
                        //     'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
                        //     'buttonVisible': 4,
                        //   },
                        //   'moreMisc': {
                        //     'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
                        //     'align': 'right',
                        //     'buttonsVisible': 2
                        //   }
                        // },
                        emoticonsStep: 4,
                        emoticonsSet: [{
                          id: 'people',
                          name: 'Smileys & People',
                          code: '1f600',
                          emoticons: [
                            { code: '1f600', desc: 'Grinning face' },
                            { code: '1f601', desc: 'Grinning face with smiling eyes' },
                            { code: '1f602', desc: 'Face with tears of joy' },
                            { code: '1f603', desc: 'Smiling face with open mouth' },
                            { code: '1f604', desc: 'Smiling face with open mouth and smiling eyes' },
                            { code: '1f605', desc: 'Smiling face with open mouth and cold sweat' },
                            { code: '1f606', desc: 'Smiling face with open mouth and tightly-closed eyes' },
                            { code: '1f607', desc: 'Smiling face with halo' }
                          ]
                        }, {
                          'id': 'nature',
                          'name': 'Animals & Nature',
                          'code': '1F435',
                          'emoticons': [
                            { code: '1F435', desc: 'Monkey Face' },
                            { code: '1F412', desc: 'Monkey' },
                            { code: '1F436', desc: 'Dog Face' },
                            { code: '1F415', desc: 'Dog' },
                            { code: '1F429', desc: 'Poodle' },
                            { code: '1F43A', desc: 'Wolf Face' },
                            { code: '1F431', desc: 'Cat Face' },
                            { code: '1F408', desc: 'Cat' },
                            { code: '1F42F', desc: 'Tiger Face' },
                            { code: '1F405', desc: 'Tiger' },
                            { code: '1F406', desc: 'Leopard' },
                            { code: '1F434', desc: 'Horse Face' },
                            { code: '1F40E', desc: 'Horse' },
                            { code: '1F42E', desc: 'Cow Face' },
                            { code: '1F402', desc: 'Ox' },
                            { code: '1F403', desc: 'Water Buffalo' },
                          ]
                        }]
                      }}
                      model={model}
                      onModelChange={handleModelChange}
                    />
                  </div>
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

export default CreateJobStep4
