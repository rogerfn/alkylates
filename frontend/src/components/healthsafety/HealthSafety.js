import React, { useState } from 'react'
import safety from '../../assets/images/safety.png'
import environment from '../../assets/images/environment.png'
import general from '../../assets/images/general.png'
import * as moment from 'moment'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCardTitle,
  CCardText,
  CFormLabel,
  CForm,
  CFormInput,
  CFormCheck,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormTextarea,
} from '@coreui/react'
import updatedata from '../../assets/images/Cloud-Upload-Icon.png'

const HealthSafety = ({ user }) => {
  const [visible, setVisible] = useState(false)
  const [healthSafety, setHealthSafety] = useState({
    id: 1,
    date: '2022-01-03',
    safety_notes: 'There were no safety events since the last report.',
    environ_notes: 'There were no environmental events since the last report.',
    gen_notes: 'There were no safety or environmental events since the last report.',
    created_at: '2022-01-04T08:29:25.749283Z',
    modified_at: '2022-01-04',
    safety_status: 'green',
    environment_status: 'orange',
    general_status: 'red',
  })
  const fieldset = {
    minWidth: '0px',
    padding: '0.75em',
    borderRadius: '1em',
    color: '#3c4b64',
    border: '0.15em',
    borderStyle: 'solid',
  }
  const icon_div_style = {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
  const text_div = {
    marginLeft: '1rem',
  }

  return (
    <>
      <CRow>
        <CCol>
          <CModal visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
              <CModalTitle>Data Updates</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CRow>
                <CForm
                  onSubmit={(e) => {
                    e.preventDefault()
                    setHealthSafety({
                      ...healthSafety,
                      modified_at: moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD'),
                      safety_notes: e.target.safety_notes.value,
                      environ_notes: e.target.environ_notes.value,
                      gen_notes: e.target.gen_notes.value,
                      safety_status:
                        e.target.safetystatusred.checked === true
                          ? 'red'
                          : e.target.safetystatusorange.checked === true
                          ? 'orange'
                          : 'green',
                      environment_status:
                        e.target.environstatusred.checked === true
                          ? 'red'
                          : e.target.environstatusorange.checked === true
                          ? 'orange'
                          : 'green',
                      general_status:
                        e.target.genstatusred.checked === true
                          ? 'red'
                          : e.target.genstatusorange.checked === true
                          ? 'orange'
                          : 'green',
                    })
                    setVisible(false)
                  }}
                  action="#"
                >
                  <div
                    className="mb-3"
                    style={{
                      padding: '1em',
                      borderRadius: '0.75em',
                      boxShadow:
                        '0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%), 0 3px 5px -1px rgb(0 0 0 / 20%)',
                    }}
                  >
                    <CRow>
                      <CFormLabel
                        style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 'medium' }}
                        htmlFor="exampleInputEmail1"
                      >
                        Monthly Target Volume
                      </CFormLabel>
                      <CCol style={{ marginRight: '1em' }}>
                        <CFormLabel htmlFor="exampleInputEmail1">Date</CFormLabel>
                        <CFormInput
                          type="date"
                          id="targetvolumedate"
                          aria-describedby="emailHelp"
                          name="targetvolumedate"
                        />
                      </CCol>
                      <CCol>
                        <CFormLabel htmlFor="exampleInputEmail1">Monthly Volume</CFormLabel>
                        <CFormInput
                          type="number"
                          id="targetvolume"
                          aria-describedby="emailHelp"
                          name="targetvolume"
                        />
                      </CCol>
                    </CRow>
                  </div>
                  <div
                    className="mb-3"
                    style={{
                      padding: '1em',
                      borderRadius: '0.75em',
                      boxShadow:
                        '0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%), 0 3px 5px -1px rgb(0 0 0 / 20%)',
                    }}
                  >
                    <CRow>
                      <CFormLabel
                        style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 'medium' }}
                        htmlFor="exampleInputEmail1"
                      >
                        Safety Environment General
                      </CFormLabel>
                    </CRow>
                    <CRow>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleInputEmail1">Last Updated Date</CFormLabel>
                        <CFormInput
                          type="date"
                          id="dateinput"
                          aria-describedby="emailHelp"
                          name="date"
                          value={healthSafety.modified_at}
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleInputPassword1">Safety</CFormLabel>
                        <div style={{ marginBottom: '0.5rem' }}>
                          <CFormCheck
                            className="form-check-label-red"
                            inline
                            type="radio"
                            name="safetyinlineRadioOptions"
                            id="safetystatusred"
                            value="red-safety"
                            label="Red"
                            defaultChecked={healthSafety.safety_status === 'red' ? true : false}
                          />
                          <CFormCheck
                            className="form-check-label-orange"
                            inline
                            type="radio"
                            name="safetyinlineRadioOptions"
                            id="safetystatusorange"
                            value="orange-safety"
                            label="Orange"
                            defaultChecked={healthSafety.safety_status === 'orange' ? true : false}
                          />
                          <CFormCheck
                            className="form-check-label-green"
                            inline
                            type="radio"
                            name="safetyinlineRadioOptions"
                            id="safetystatusgreen"
                            value="green-safety"
                            label="Green"
                            defaultChecked={healthSafety.safety_status === 'green' ? true : false}
                          />
                        </div>
                        <CFormTextarea
                          type="text"
                          id="safety_notes"
                          name="safety_notes"
                          defaultValue={healthSafety.safety_notes}
                          rows="2"
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleInputPassword1">Environment</CFormLabel>
                        <div style={{ marginBottom: '0.5rem' }}>
                          <CFormCheck
                            className="form-check-label-red"
                            inline
                            type="radio"
                            name="envinlineRadioOptions"
                            id="environstatusred"
                            value="red-env"
                            label="Red"
                            defaultChecked={
                              healthSafety.environment_status === 'red' ? true : false
                            }
                          />
                          <CFormCheck
                            className="form-check-label-orange"
                            inline
                            type="radio"
                            name="envinlineRadioOptions"
                            id="environstatusorange"
                            value="orange-env"
                            label="Orange"
                            defaultChecked={
                              healthSafety.environment_status === 'orange' ? true : false
                            }
                          />
                          <CFormCheck
                            className="form-check-label-green"
                            inline
                            type="radio"
                            name="envinlineRadioOptions"
                            id="environstatusgreen"
                            value="green-env"
                            label="Green"
                            defaultChecked={
                              healthSafety.environment_status === 'green' ? true : false
                            }
                          />
                        </div>
                        <CFormTextarea
                          type="text"
                          id="environ_notes"
                          name="environ_notes"
                          defaultValue={healthSafety.environ_notes}
                          rows="2"
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleInputPassword1">General</CFormLabel>
                        <div style={{ marginBottom: '0.5rem' }}>
                          <CFormCheck
                            className="form-check-label-red"
                            inline
                            type="radio"
                            name="geninlineRadioOptions"
                            id="genstatusred"
                            value="red-gen"
                            label="Red"
                            defaultChecked={healthSafety.general_status === 'red' ? true : false}
                          />
                          <CFormCheck
                            className="form-check-label-orange"
                            inline
                            type="radio"
                            name="geninlineRadioOptions"
                            id="genstatusorange"
                            value="orange-gen"
                            label="Orange"
                            defaultChecked={healthSafety.general_status === 'orange' ? true : false}
                          />
                          <CFormCheck
                            className="form-check-label-green"
                            inline
                            type="radio"
                            name="geninlineRadioOptions"
                            id="genstatusgreen"
                            value="green-gen"
                            label="Green"
                            defaultChecked={healthSafety.general_status === 'green' ? true : false}
                          />
                        </div>
                        <CFormTextarea
                          type="text"
                          id="gen_notes"
                          name="gen_notes"
                          defaultValue={healthSafety.gen_notes}
                          rows="2"
                        />
                      </div>
                    </CRow>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="mb-3">
                    <CButton
                      style={{ marginRight: '0.5rem' }}
                      color="secondary"
                      onClick={() => setVisible(false)}
                    >
                      Close
                    </CButton>
                    <CButton
                      style={{
                        backgroundColor: 'rgba(44, 56, 74, 0.95)',
                        borderColor: 'rgba(44, 56, 74, 0.95)',
                      }}
                      type="submit"
                      color="primary"
                    >
                      Save changes
                    </CButton>
                  </div>
                </CForm>
              </CRow>
            </CModalBody>
          </CModal>
        </CCol>
      </CRow>
      <CCardBody style={{ paddingTop: '0rem' }}>
        <fieldset style={fieldset}>
          <legend
            style={{
              display: 'block',
              width: 'auto',
              paddingLeft: '0.5em',
              paddingRight: '0.5em',
              marginBottom: '0rem',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              lineHeight: 'inherit',
              color: '#3c4b64',
              whiteSpace: 'normal',
              float: 'none',
            }}
          >
            Health and Safety
            {user && user.globals_access && (
              <CButton
                style={{ paddingleft: '0em', paddingRight: '0.5em' }}
                color="transparent"
                onClick={() => setVisible(!visible)}
              >
                <img
                  style={{
                    height: '35px',
                    borderRadius: '58px',
                    border: 'solid',
                    borderColor: 'gray',
                    backgroundColor: 'rgba(44, 56, 74, 0.95)',
                  }}
                  src={updatedata}
                ></img>
              </CButton>
            )}
          </legend>
          <CRow>
            <CCol>
              <CCard
                style={{
                  margin: '1rem',
                  maxWidth: '400px',
                  borderTopColor:
                    healthSafety.safety_status === 'green'
                      ? '#69B34C'
                      : healthSafety.safety_status === 'orange'
                      ? 'rgb(250, 183, 51)'
                      : 'rgb(255, 78, 17)',
                  color: 'rgb(1, 58, 99)',
                  boxShadow:
                    '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                }}
                className={`mb-3 border-top-5`}
              >
                <CCardBody>
                  <div style={icon_div_style}>
                    <img
                      style={{
                        height: '100px',
                        marginBottom: '1.25rem',
                        marginTop: '1rem',
                        borderRadius: '58px',
                        border: 'solid',
                        borderColor:
                          healthSafety.safety_status === 'green'
                            ? '#69B34C'
                            : healthSafety.safety_status === 'orange'
                            ? 'rgb(250, 183, 51)'
                            : 'rgb(255, 78, 17)',
                      }}
                      src={safety}
                    ></img>
                    <div style={text_div}>
                      <CCardTitle
                        style={{
                          textAlign: 'right',
                          color:
                            healthSafety.safety_status === 'green'
                              ? '#69B34C'
                              : healthSafety.safety_status === 'orange'
                              ? 'rgb(250, 183, 51)'
                              : 'rgb(255, 78, 17)',
                        }}
                      >
                        {' '}
                        Safety
                      </CCardTitle>
                      <CCardText style={{ textAlign: 'right' }}>
                        {healthSafety.safety_notes}
                      </CCardText>
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol>
              <CCard
                style={{
                  margin: '1rem',
                  maxWidth: '400px',
                  borderTopColor:
                    healthSafety.environment_status === 'green'
                      ? '#69B34C'
                      : healthSafety.environment_status === 'orange'
                      ? 'rgb(250, 183, 51)'
                      : 'rgb(255, 78, 17)',
                  color: 'rgb(1, 58, 99)',
                  boxShadow:
                    '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                }}
                className={`mb-3 border-top-5`}
              >
                <CCardBody>
                  <div style={icon_div_style}>
                    <img
                      style={{
                        height: '100px',
                        marginBottom: '1.25rem',
                        marginTop: '1rem',
                        borderRadius: '58px',
                        border: 'solid',
                        borderColor:
                          healthSafety.environment_status === 'green'
                            ? '#69B34C'
                            : healthSafety.environment_status === 'orange'
                            ? 'rgb(250, 183, 51)'
                            : 'rgb(255, 78, 17)',
                      }}
                      src={environment}
                    ></img>
                    <div style={text_div}>
                      <CCardTitle
                        style={{
                          textAlign: 'right',
                          color:
                            healthSafety.environment_status === 'green'
                              ? '#69B34C'
                              : healthSafety.environment_status === 'orange'
                              ? 'rgb(250, 183, 51)'
                              : 'rgb(255, 78, 17)',
                        }}
                      >
                        {' '}
                        Environment
                      </CCardTitle>
                      <CCardText style={{ textAlign: 'right' }}>
                        {healthSafety.environ_notes}
                      </CCardText>
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol>
              <CCard
                style={{
                  margin: '1rem',
                  maxWidth: '400px',
                  borderTopColor:
                    healthSafety.general_status === 'green'
                      ? '#69B34C'
                      : healthSafety.general_status === 'orange'
                      ? 'rgb(250, 183, 51)'
                      : 'rgb(255, 78, 17)',
                  color: 'rgb(1, 58, 99)',
                  boxShadow:
                    '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                }}
                className={`mb-3 border-top-5`}
              >
                <CCardBody>
                  <div style={icon_div_style}>
                    <img
                      style={{
                        height: '100px',
                        marginBottom: '1.25rem',
                        marginTop: '1rem',
                        borderRadius: '58px',
                        border: 'solid',
                        borderColor:
                          healthSafety.general_status === 'green'
                            ? '#69B34C'
                            : healthSafety.general_status === 'orange'
                            ? 'rgb(250, 183, 51)'
                            : 'rgb(255, 78, 17)',
                      }}
                      src={general}
                    ></img>
                    <div style={text_div}>
                      <CCardTitle
                        style={{
                          textAlign: 'right',
                          color:
                            healthSafety.general_status === 'green'
                              ? '#69B34C'
                              : healthSafety.general_status === 'orange'
                              ? 'rgb(250, 183, 51)'
                              : 'rgb(255, 78, 17)',
                        }}
                      >
                        {' '}
                        General
                      </CCardTitle>
                      <CCardText style={{ textAlign: 'right' }}>{healthSafety.gen_notes}</CCardText>
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </fieldset>
      </CCardBody>
    </>
  )
}
export default HealthSafety
