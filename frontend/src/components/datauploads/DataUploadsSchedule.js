import React, { useState } from 'react'
import axios from 'axios'
import { CButton, CModal, CModalHeader, CModalBody, CModalTitle, CModalFooter } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import Dropzone from 'react-dropzone'

const icon_upload = {
  display: 'flex',
  justifyContent: 'flex-end',
  paddingRight: '1rem',
}
const container_style = {
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: '2px',
  borderRadius: '2px',
  borderColor: '#aeaeae',
  borderStyle: 'dashed',
  backgroundColor: '#ebebeb',
  color: '#333',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  margin: '1rem 0',
}

const btn_blue = {
  color: '#fff',
  backgroundColor: '#007bff',
  borderColor: '#007bff',
}

const btn_grey = {
  color: '#fff',
  backgroundColor: '#6c757d',
  borderColor: '#6c757d',
}

export default function DataUploadsSchedule({ updateData }) {
  const [visible, setVisible] = useState(false)
  const [file, setFile] = useState(null)
  const onDrop = (files) => {
    setFile(files[0])
  }

  const submitData = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
    }
    let formData = new FormData()
    formData.append('excel', file)
    axios
      .post(`${window.API_URL}/api/production/schedule-data/fetch/`, formData, config)
      .then(() => {
        setVisible(false)
        setFile(null)
        updateData()
      })
      .catch((error) => console.log(error))
  }
  return (
    <>
      <div style={icon_upload}>
        <CButton
          className="button-effect"
          // style={{
          //   borderRadius: '0.5em',
          //   display: 'flex',
          //   backgroundColor: '#013A63',
          //   borderColor: '#013A63',
          //   alignItems: 'center',
          //   boxShadow:
          //     'rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px, rgb(0 0 0 / 20%) 0px 3px 5px -1px',
          // }}
          // color="rgba(44, 56, 74, 0.95)"
          onClick={() => setVisible(!visible)}
        >
          <CIcon icon={icon.cilCloudUpload} style={{ marginRight: '0.25em' }} size="xl" />
          <p>Schedule Upload</p>
        </CButton>
      </div>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Upload Data</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            <label className="fw-bold">File</label>
            {file ? (
              <li>
                {' '}
                {file.name} {'('}
                {parseFloat(file.size / 1024).toFixed(1)}
                {')'}
                {'KB'}{' '}
              </li>
            ) : (
              <div> </div>
            )}
          </div>
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section className="container">
                <div {...getRootProps({ className: 'dropzone' })} style={container_style}>
                  <input {...getInputProps()} />
                  <p style={{ marginBottom: 0 }}>
                    Drag and drop ETO Schedule here, or click to select files.
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </CModalBody>
        <CModalFooter>
          <CButton style={btn_grey} onClick={submitData}>
            Close
          </CButton>
          <CButton style={btn_blue} onClick={submitData}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
