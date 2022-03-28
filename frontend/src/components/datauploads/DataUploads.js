import React, { useState } from 'react'
import axios from 'axios'
import { CButton, CModal, CModalHeader, CModalBody, CModalTitle, CModalFooter } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import Dropzone from 'react-dropzone'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

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

export default function DataUploads({ daterange, updateData, ClearupdateAll, apiData, fileName }) {
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
      .post(`${window.API_URL}/api/delay_shipments/data/fetch/`, formData, config)
      .then(() => {
        setVisible(false)
        setFile(null)
        updateData()
      })
      .catch((error) => console.log(error))
  }

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, fileName + fileExtension)
  }
  return (
    <>
      <div style={icon_upload}>
        <p
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          {daterange.max_date}
        </p>
        <CButton
          style={{ paddingRight: '0em' }}
          color="transparent"
          onClick={() => ClearupdateAll()}
        >
          <CIcon icon={icon.cilFilterX} size="xl" />
        </CButton>
        <CButton
          style={{ paddingRight: '0em' }}
          color="transparent"
          onClick={() => setVisible(!visible)}
        >
          <CIcon icon={icon.cilCloudUpload} size="xl" />
        </CButton>
        <CButton color="transparent" onClick={(e) => exportToCSV(apiData, fileName)}>
          <CIcon icon={icon.cilCloudDownload} size="xl" />
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
                    Drag and drop Delayed Shipment Report here, or click to select files.
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
