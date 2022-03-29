import React from 'react'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

export const ExportToExcel = ({ apiData, fileName }) => {
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
    <CButton color="transparent" onClick={(e) => exportToCSV(apiData, fileName)}>
      <CIcon icon={icon.cilCloudDownload} size="xl" />
    </CButton>
  )
}
