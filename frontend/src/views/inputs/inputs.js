import React from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CButton,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CCardHeader,
} from '@coreui/react'
import makeAnimated from 'react-select/animated'
import Select from 'react-select'
import { DataSheetGrid, checkboxColumn, textColumn, keyColumn } from 'react-datasheet-grid'
import { useState } from 'react'
const getBadge = (status) => {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Inactive':
      return 'secondary'
    case 'Pending':
      return 'warning'
    case 'Banned':
      return 'danger'
    default:
      return 'primary'
  }
}
const fields = ['name', 'registered', 'role', 'status']

const TheUserInputs = () => {
  const user_inputs = {
    fontSize: '0.8em',
    minHeight: '38px',
  }
  const mystyle = {
    flex: '0 0 8%',
    maxWidth: '8%',
    paddingRight: '0rem',
    paddingLeft: '1rem',
    paddingBottom: '0.75rem',
  }
  const mystyle_extralength = {
    flex: '0 0 17.5%',
    maxWidth: '17.5%',
    paddingRight: '0rem',
    paddingLeft: '1rem',
  }
  const mystyle_half = {
    flex: '0 0 25%',
    maxWidth: '25%',
  }
  const labelstyle = {
    fontWeight: 'bold',
    color: 'rgba(44, 56, 74, 0.95)',
    fontSize: '0.9em',
    wordSpacing: '30000px',
    fontFamily:
      'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
  }
  const cardbackground = {
    backgroundColor: '#636F87',
  }
  const cardbackground_dark = {
    backgroundColor: '#3c4b64!important',
  }

  const legend = {
    display: 'block',
    width: 'auto',
    padding: '0.5em',
    marginBottom: '0rem',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    lineHeight: 'inherit',
    color: 'white',
    whiteSpace: 'normal',
    float: 'none',
  }
  const fieldset = {
    minWidth: '0px',
    padding: '0.75em',
    borderRadius: '1em',
    color: 'white',
    border: '0.15em',
    borderStyle: 'solid',
  }

  const cardbody_dark = {
    flex: '1 1 auto',
    minHeight: '1px',
    padding: '1.25rem',
    borderRadius: '2em',
    backgroundColor: '#3c4b64',
  }
  const cardbody_light = {
    flex: '1 1 auto',
    minHeight: '1px',
    padding: '1.25rem',
    borderRadius: '2em',
    backgroundColor: '#636F87',
  }
  const card = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
    marginBottom: '1.5rem',
    wordWrap: 'break-word',
    backgroundClip: 'border-box',
    border: '1px solid',
    borderRadius: '0.25rem',
    backgroundColor: '#ebedef',
    borderColor: '#ebedef',
  }
  var someDate = new Date()
  var numberOfDaysToAdd = 0
  var date_today = someDate.getDate()

  const [data, setData] = useState([
    { active: true, firstName: 'Elon', lastName: 'Musk' },
    { active: false, firstName: 'Jeff', lastName: 'Bezos' },
  ])

  const unitOptions = [
    { value: 'Alcohol Quality', label: 'Alcohol Quality' },
    { value: 'By-product Production', label: 'By-product Production' },
    { value: 'Logistics', label: 'Logistics' },
    { value: 'No Alcohol Feed available', label: 'No Alcohol Feed available' },
    { value: 'No EO feed available', label: 'No EO feed available' },
    { value: 'Operator Resources', label: 'Operator Resources' },
    { value: 'PL delays', label: 'PL delays' },
    { value: 'Process Delays', label: 'Process Delays' },
    { value: 'QC lab awaiting results', label: 'QC lab awaiting results' },
    { value: 'Scheduled Downtime', label: 'Scheduled Downtime' },
    { value: 'Unscheduled Downtime', label: 'Unscheduled Downtime' },
  ]

  const batchdatatable = [
    {
      batch_number: 'xxxx',
      ethox_type: 'xxxx',
      alc_type: 'xxxx',
      alc_trans: 'xxxx',
      alc_amt: 'xxxx',
      eo: 'xxxx',
      run_tnk: 'xxxx',
      batch_dur: 'xxxx',
    },
    {
      batch_number: 'xxxx',
      ethox_type: 'xxxx',
      alc_type: 'xxxx',
      alc_trans: 'xxxx',
      alc_amt: 'xxxx',
      eo: 'xxxx',
      run_tnk: 'xxxx',
      batch_dur: 'xxxx',
    },
    {
      batch_number: 'xxxx',
      ethox_type: 'xxxx',
      alc_type: 'xxxx',
      alc_trans: 'xxxx',
      alc_amt: 'xxxx',
      eo: 'xxxx',
      run_tnk: 'xxxx',
      batch_dur: 'xxxx',
    },
    {
      batch_number: 'xxxx',
      ethox_type: 'xxxx',
      alc_type: 'xxxx',
      alc_trans: 'xxxx',
      alc_amt: 'xxxx',
      eo: 'xxxx',
      run_tnk: 'xxxx',
      batch_dur: 'xxxx',
    },
    {
      batch_number: 'xxxx',
      ethox_type: 'xxxx',
      alc_type: 'xxxx',
      alc_trans: 'xxxx',
      alc_amt: 'xxxx',
      eo: 'xxxx',
      run_tnk: 'xxxx',
      batch_dur: 'xxxx',
    },
  ]

  const fontfamily = {
    fontFamily:
      'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
  }
  const animatedComponents = makeAnimated()
  return (
    <>
      <CCard
        style={{
          boxShadow:
            '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
        }}
      >
        <CCardHeader component="h5">ETO 1</CCardHeader>
        <CCardBody>
          <CRow>
            <CForm>
              <CRow>
                <CCol style={mystyle}>
                  <CFormLabel style={labelstyle} htmlFor="batch-number">
                    Batch Number
                  </CFormLabel>
                </CCol>
                <CCol style={mystyle}>
                  <CFormLabel style={labelstyle} htmlFor="exthoxylate-type">
                    Exthoxylate Type
                  </CFormLabel>
                </CCol>
                <CCol style={mystyle}>
                  <CFormLabel style={labelstyle} htmlFor="alcohol-type">
                    Alcohol Type
                  </CFormLabel>
                </CCol>
                <CCol style={mystyle}>
                  <CFormLabel style={labelstyle} htmlFor="alcohol-transfer">
                    Alcohol Transfer
                  </CFormLabel>
                </CCol>
                <CCol style={mystyle}>
                  <CFormLabel style={labelstyle} htmlFor="alcohol-volume">
                    Alcohol (lbs)
                  </CFormLabel>
                </CCol>
                <CCol style={mystyle}>
                  <CFormLabel style={labelstyle} htmlFor="eo-volume">
                    EO (lbs)
                  </CFormLabel>
                </CCol>
                <CCol style={mystyle}>
                  <CFormLabel style={labelstyle} htmlFor="run-tank">
                    Run Tank
                  </CFormLabel>
                </CCol>
                <CCol style={mystyle}>
                  <CFormLabel style={labelstyle} htmlFor="batch-start">
                    Batch Duration
                  </CFormLabel>
                </CCol>
                <CCol style={mystyle_extralength}>
                  <CFormLabel style={labelstyle} htmlFor="name">
                    Delay Reasons
                  </CFormLabel>
                </CCol>
                <CCol style={mystyle_extralength}>
                  <CFormLabel style={labelstyle} htmlFor="free-comments">
                    Unit Comments
                  </CFormLabel>
                </CCol>
              </CRow>
              {batchdatatable.map((e) => (
                <CRow key={batchdatatable.batch_number}>
                  <CCol style={mystyle}>
                    <CFormInput
                      style={user_inputs}
                      id="batch-number"
                      required
                      defaultValue={e.batch_number}
                      disabled
                    />
                  </CCol>
                  <CCol style={mystyle}>
                    <CFormInput
                      style={user_inputs}
                      id="batch-number"
                      required
                      defaultValue={e.ethox_type}
                      disabled
                    />
                  </CCol>
                  <CCol style={mystyle}>
                    <CFormInput
                      style={user_inputs}
                      id="batch-number"
                      required
                      defaultValue={e.alc_type}
                      disabled
                    />
                  </CCol>
                  <CCol style={mystyle}>
                    <CFormInput
                      style={user_inputs}
                      id="batch-number"
                      required
                      defaultValue={e.alc_trans}
                      disabled
                    />
                  </CCol>
                  <CCol style={mystyle}>
                    <CFormInput
                      style={user_inputs}
                      id="batch-number"
                      required
                      defaultValue={e.alc_amt}
                      disabled
                    />
                  </CCol>
                  <CCol style={mystyle}>
                    <CFormInput
                      style={user_inputs}
                      id="batch-number"
                      required
                      defaultValue={e.eo}
                      disabled
                    />
                  </CCol>
                  <CCol style={mystyle}>
                    <CFormInput
                      style={user_inputs}
                      id="batch-number"
                      required
                      defaultValue={e.run_tnk}
                      disabled
                    />
                  </CCol>
                  <CCol style={mystyle}>
                    <CFormInput
                      style={user_inputs}
                      id="batch-number"
                      required
                      defaultValue={e.batch_dur}
                      disabled
                    />
                  </CCol>
                  <CCol
                    style={{
                      flex: '0 0 17.5%',
                      maxWidth: '17.5%',
                      paddingRight: '0rem',
                      paddingLeft: '1rem',
                      fontSize: '0.8em',
                    }}
                  >
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      defaultValue={'Select Unit'}
                      isMulti
                      options={unitOptions}
                      style={user_inputs}
                    />
                  </CCol>
                  <CCol
                    style={{
                      flex: '0 0 17.5%',
                      maxWidth: '17.5%',
                      paddingRight: '0rem',
                      paddingLeft: '1rem',
                      fontSize: '0.8em',
                    }}
                  >
                    <CFormInput
                      style={user_inputs}
                      id="free-comments"
                      required
                      defaultValue="XXXX"
                    />
                  </CCol>
                </CRow>
              ))}
            </CForm>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default TheUserInputs
