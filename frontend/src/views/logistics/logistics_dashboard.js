import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Select from 'react-select'
import BasicTable from '../../components/table/table'
import BarChartCategories from 'src/components/barcharts/BarChartCategories'
import LineChartAvgDelay from 'src/components/linecharts/LineChartAvgDelay'
import BarChartCatCountCust from 'src/components/barcharts/BarChartCatCountCust'
import BarChartCatCountCat from 'src/components/barcharts/BarChartCatCountCat'
import DataUploads from 'src/components/datauploads/DataUploads'
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import makeAnimated from 'react-select/animated'
import { CButtonGroup, CCard, CCardBody, CCol, CRow, CFormLabel, CFormCheck } from '@coreui/react'
import FormatDate from 'src/functions/Functions'

const LogisticsDashboard = () => {
  const [unitOptions, setUnitOptions] = useState([])
  const [unit, setUnit] = useState([])

  const [rail, setRail] = useState('false')
  const [truck, setTruck] = useState('false')

  const [csrOptions, setCSROptions] = useState([])
  const [csr, setCSR] = useState([])

  const [custOptions, setCustOptions] = useState([])
  const [cust, setCust] = useState([])

  const [daterange, setDateRange] = useState([])

  const [dateinputs, setDateInputs] = useState([])

  const [databarcat, setDataBarCat] = useState([])

  const [datatable, setDataTable] = useState([])

  const [databarcatavg, setDataBarCatAvg] = useState([])

  const [data, setData] = useState([])

  const [databarcust, setDataBarCust] = useState([])

  const [catbarfilterdata, setCatBarFilterData] = useState([])

  const [custbarfilterdata, setCustBarFilterData] = useState([])

  const [delaylinefilterdata, setDelayLineFilterData] = useState([])

  const [downloaddata, setDownloadData] = useState([])

  const fileName = 'DelayedShipmentReport'

  const [filters, setFilters] = useState({
    TRANSPORTATION: true,
    PRODUCTION: true,
    CUSTOMER: true,
    PLANNING: true,
    LOGISTICS: true,
    SERVICE: true,
  })

  const [unitvalue, setUnitValue] = useState([])
  const [csrvalue, setCSRValue] = useState([])
  const [custvalue, setCustValue] = useState([])
  const [datevalue, setDateValue] = useState([])
  const [truckvalue, setTruckValue] = useState('')
  const [railvalue, setRailValue] = useState('')

  const handleDateOptionChange = (selectValue) => {
    setDateInputs(selectValue ? selectValue : [])
    setDateValue(selectValue ? selectValue : [])
  }
  const handleUnitOptionChange = (option) => {
    setUnit(option ? option : [])
    setUnitValue(option ? option : [])
  }
  const handleCSROptionChange = (option) => {
    setCSR(option ? option : [])
    setCSRValue(option ? option : [])
  }
  const handleCustOptionChange = (option) => {
    setCust(option ? option : [])
    setCustValue(option ? option : [])
  }

  const handleRailOptionChange = (checked) => {
    setRail(checked ? checked : 'false')
    setRailValue(checked ? checked : 'false')
  }
  const handleTruckOptionChange = (checked) => {
    setTruck(checked ? checked : 'false')
    setTruckValue(checked ? checked : 'false')
  }

  const getUnitData = () => {
    let paramsToSend = {}
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    if (csr && csr.length > 0) paramsToSend.csr = csr.map((el) => el.value)
    if (cust && cust.length > 0) paramsToSend.cust = cust.map((el) => el.value)
    if (rail) paramsToSend.rail = rail
    if (truck) paramsToSend.truck = truck
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (catbarfilterdata && catbarfilterdata.length > 0)
      paramsToSend.catbarfilter = catbarfilterdata
    if (custbarfilterdata && custbarfilterdata.length > 0)
      paramsToSend.custbarfilter = custbarfilterdata
    if (delaylinefilterdata && delaylinefilterdata.length > 0)
      paramsToSend.delaylinefilter = delaylinefilterdata
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/delay_shipments/filters/units/`, config).then((res) => {
      setUnitOptions(res.data)
    })
  }

  const getCSRData = () => {
    let paramsToSend = {}
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    if (csr && csr.length > 0) paramsToSend.csr = csr.map((el) => el.value)
    if (cust && cust.length > 0) paramsToSend.cust = cust.map((el) => el.value)
    if (rail) paramsToSend.rail = rail
    if (truck) paramsToSend.truck = truck
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (catbarfilterdata && catbarfilterdata.length > 0)
      paramsToSend.catbarfilter = catbarfilterdata
    if (custbarfilterdata && custbarfilterdata.length > 0)
      paramsToSend.custbarfilter = custbarfilterdata
    if (delaylinefilterdata && delaylinefilterdata.length > 0)
      paramsToSend.delaylinefilter = delaylinefilterdata
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/delay_shipments/filters/csr/`, config).then((res) => {
      setCSROptions(res.data)
    })
  }

  const getCustData = () => {
    let paramsToSend = {}
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    if (csr && csr.length > 0) paramsToSend.csr = csr.map((el) => el.value)
    if (cust && cust.length > 0) paramsToSend.cust = cust.map((el) => el.value)
    if (rail) paramsToSend.rail = rail
    if (truck) paramsToSend.truck = truck
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (catbarfilterdata && catbarfilterdata.length > 0)
      paramsToSend.catbarfilter = catbarfilterdata
    if (custbarfilterdata && custbarfilterdata.length > 0)
      paramsToSend.custbarfilter = custbarfilterdata
    if (delaylinefilterdata && delaylinefilterdata.length > 0)
      paramsToSend.delaylinefilter = delaylinefilterdata
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/delay_shipments/filters/customer/`, config).then((res) => {
      setCustOptions(res.data)
    })
  }

  const getDateRangeData = () => {
    let paramsToSend = {}
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    if (csr && csr.length > 0) paramsToSend.csr = csr.map((el) => el.value)
    if (cust && cust.length > 0) paramsToSend.cust = cust.map((el) => el.value)
    if (rail) paramsToSend.rail = rail
    if (truck) paramsToSend.truck = truck
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (catbarfilterdata && catbarfilterdata.length > 0)
      paramsToSend.catbarfilter = catbarfilterdata
    if (custbarfilterdata && custbarfilterdata.length > 0)
      paramsToSend.custbarfilter = custbarfilterdata
    if (delaylinefilterdata && delaylinefilterdata.length > 0)
      paramsToSend.delaylinefilter = delaylinefilterdata
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/delay_shipments/filters/dates/`, config).then((res) => {
      setDateRange(res.data)
    })
  }

  const getDataTable = () => {
    let paramsToSend = {}
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    if (csr && csr.length > 0) paramsToSend.csr = csr.map((el) => el.value)
    if (cust && cust.length > 0) paramsToSend.cust = cust.map((el) => el.value)
    if (rail) paramsToSend.rail = rail
    if (truck) paramsToSend.truck = truck
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (catbarfilterdata && catbarfilterdata.length > 0)
      paramsToSend.catbarfilter = catbarfilterdata
    if (custbarfilterdata && custbarfilterdata.length > 0)
      paramsToSend.custbarfilter = custbarfilterdata
    if (delaylinefilterdata && delaylinefilterdata.length > 0)
      paramsToSend.delaylinefilter = delaylinefilterdata
    // ${window.API_URL}
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/delay_shipments/`, config).then((res) => {
      setDataTable(res.data)
    })
  }

  const getDataBarCat = () => {
    let paramsToSend = {}
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    if (csr && csr.length > 0) paramsToSend.csr = csr.map((el) => el.value)
    if (cust && cust.length > 0) paramsToSend.cust = cust.map((el) => el.value)
    if (rail) paramsToSend.rail = rail
    if (truck) paramsToSend.truck = truck
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (catbarfilterdata && catbarfilterdata.length > 0)
      paramsToSend.catbarfilter = catbarfilterdata
    if (custbarfilterdata && custbarfilterdata.length > 0)
      paramsToSend.custbarfilter = custbarfilterdata
    if (delaylinefilterdata && delaylinefilterdata.length > 0)
      paramsToSend.delaylinefilter = delaylinefilterdata
    // ${window.API_URL}
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios
      .get(`${window.API_URL}/api/delay_shipments/graph/bar/category_count/`, config)
      .then((res) => {
        setDataBarCat(res.data)
      })
  }

  const getDataBarCatAvg = () => {
    let paramsToSend = {}
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    if (csr && csr.length > 0) paramsToSend.csr = csr.map((el) => el.value)
    if (cust && cust.length > 0) paramsToSend.cust = cust.map((el) => el.value)
    if (rail) paramsToSend.rail = rail
    if (truck) paramsToSend.truck = truck
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (catbarfilterdata && catbarfilterdata.length > 0)
      paramsToSend.catbarfilter = catbarfilterdata
    if (custbarfilterdata && custbarfilterdata.length > 0)
      paramsToSend.custbarfilter = custbarfilterdata
    if (delaylinefilterdata && delaylinefilterdata.length > 0)
      paramsToSend.delaylinefilter = delaylinefilterdata
    // ${window.API_URL}
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }

    axios
      .get(`${window.API_URL}/api/delay_shipments/graph/bar/category_avg/`, config)
      .then((res) => {
        setDataBarCatAvg(res.data)
      })
  }

  const getData = () => {
    let paramsToSend = {}
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    if (csr && csr.length > 0) paramsToSend.csr = csr.map((el) => el.value)
    if (cust && cust.length > 0) paramsToSend.cust = cust.map((el) => el.value)
    if (rail) paramsToSend.rail = rail
    if (truck) paramsToSend.truck = truck
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (catbarfilterdata && catbarfilterdata.length > 0)
      paramsToSend.catbarfilter = catbarfilterdata
    if (custbarfilterdata && custbarfilterdata.length > 0)
      paramsToSend.custbarfilter = custbarfilterdata
    if (delaylinefilterdata && delaylinefilterdata.length > 0)
      paramsToSend.delaylinefilter = delaylinefilterdata
    // ${window.API_URL}
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/delay_shipments/graph/line/`, config).then((res) => {
      setData(res.data)
    })
  }

  const getDataBarCust = () => {
    let paramsToSend = {}
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    if (csr && csr.length > 0) paramsToSend.csr = csr.map((el) => el.value)
    if (cust && cust.length > 0) paramsToSend.cust = cust.map((el) => el.value)
    if (rail) paramsToSend.rail = rail
    if (truck) paramsToSend.truck = truck
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (catbarfilterdata && catbarfilterdata.length > 0)
      paramsToSend.catbarfilter = catbarfilterdata
    if (custbarfilterdata && custbarfilterdata.length > 0)
      paramsToSend.custbarfilter = custbarfilterdata
    if (delaylinefilterdata && delaylinefilterdata.length > 0)
      paramsToSend.delaylinefilter = delaylinefilterdata
    // ${window.API_URL}
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/delay_shipments/graph/bar/customer/`, config).then((res) => {
      setDataBarCust(res.data)
    })
  }
  const getExcelData = () => {
    let paramsToSend = {}
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    if (csr && csr.length > 0) paramsToSend.csr = csr.map((el) => el.value)
    if (cust && cust.length > 0) paramsToSend.cust = cust.map((el) => el.value)
    if (rail) paramsToSend.rail = rail
    if (truck) paramsToSend.truck = truck
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (catbarfilterdata && catbarfilterdata.length > 0)
      paramsToSend.catbarfilter = catbarfilterdata
    if (custbarfilterdata && custbarfilterdata.length > 0)
      paramsToSend.custbarfilter = custbarfilterdata
    if (delaylinefilterdata && delaylinefilterdata.length > 0)
      paramsToSend.delaylinefilter = delaylinefilterdata

    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/delay_shipments/excel-export/`, config).then((res) => {
      setDownloadData(res.data)
    })
  }

  const handleonClick = (data) => {
    setCatBarFilterData(data.indexValue ? data.indexValue : [])
    setFilters({ ...filters, [data.indexValue]: !filters[data.indexValue] })
  }

  const handleonClickCust = (data) => {
    setCustBarFilterData(data.indexValue ? data.indexValue : [])
  }

  const handleonClickLine = (data) => {
    setDelayLineFilterData(data.id ? [data.data.x, data.serieId] : [])
  }

  const updateAll = () => {
    getDataBarCat()
    getDataTable()
    getDataBarCatAvg()
    getData()
    getDataBarCust()
  }

  const ClearupdateAll = () => {
    setUnitOptions([])
    setUnitValue([])
    setUnit([])
    setRail('false')
    setRailValue('')
    setTruck('false')
    setTruckValue('')
    setCSROptions([])
    setCSRValue([])
    setCSR([])
    setCust([])
    setCustOptions([])
    setCustValue([])
    setDateRange([])
    setDateInputs([])
    setDateValue([])
    setDataBarCat([])
    setDataTable([])
    setDataBarCatAvg([])
    setData([])
    setDataBarCust([])
    setCatBarFilterData([])
    setCustBarFilterData([])
    setDelayLineFilterData([])
    getDataBarCat()
    getDataTable()
    getDataBarCatAvg()
    getData()
    getDataBarCust()
  }

  useEffect(() => {
    getExcelData()
  }, [
    ,
    csr,
    rail,
    truck,
    dateinputs,
    catbarfilterdata,
    custbarfilterdata,
    delaylinefilterdata,
    cust,
  ])

  useEffect(() => {
    getUnitData()
  }, [
    ,
    csr,
    rail,
    truck,
    dateinputs,
    catbarfilterdata,
    custbarfilterdata,
    delaylinefilterdata,
    cust,
  ])

  useEffect(() => {
    getCSRData()
  }, [
    ,
    unit,
    rail,
    truck,
    dateinputs,
    catbarfilterdata,
    custbarfilterdata,
    delaylinefilterdata,
    cust,
  ])

  useEffect(() => {
    getCustData()
  }, [
    ,
    csr,
    unit,
    rail,
    truck,
    dateinputs,
    catbarfilterdata,
    custbarfilterdata,
    delaylinefilterdata,
  ])

  useEffect(() => {
    getDateRangeData()
  }, [, unit, csr, rail, truck, catbarfilterdata, custbarfilterdata, delaylinefilterdata, cust])

  useEffect(() => {
    getDataBarCat()
  }, [
    ,
    unit,
    csr,
    rail,
    truck,
    dateinputs,
    catbarfilterdata,
    custbarfilterdata,
    delaylinefilterdata,
    cust,
  ])

  useEffect(() => {
    getDataTable()
  }, [
    ,
    unit,
    csr,
    rail,
    truck,
    dateinputs,
    catbarfilterdata,
    custbarfilterdata,
    delaylinefilterdata,
    cust,
  ])

  useEffect(() => {
    getDataBarCatAvg()
  }, [
    ,
    unit,
    csr,
    rail,
    truck,
    dateinputs,
    catbarfilterdata,
    custbarfilterdata,
    delaylinefilterdata,
    cust,
  ])

  useEffect(() => {
    getData()
  }, [
    ,
    unit,
    csr,
    rail,
    truck,
    dateinputs,
    catbarfilterdata,
    custbarfilterdata,
    delaylinefilterdata,
    cust,
  ])

  useEffect(() => {
    getDataBarCust()
  }, [
    ,
    unit,
    csr,
    rail,
    truck,
    dateinputs,
    catbarfilterdata,
    custbarfilterdata,
    delaylinefilterdata,
    cust,
  ])

  const { allowedRange } = DateRangePicker

  const button_style = {
    backgroundColor: 'white',
    borderColor: '#3c4b64',
    color: '#3c4b64',
    borderWidth: 'revert',
    width: '100%',
  }

  const fieldset = {
    minWidth: '0px',
    padding: '0.75em',
    borderRadius: '1em',
    color: '#3c4b64',
    border: '0.15em',
    borderStyle: 'solid',
  }
  const legend = {
    display: 'block',
    width: 'auto',
    padding: '0.5em',
    marginBottom: '0rem',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    lineHeight: 'inherit',
    color: '#3c4b64',
    whiteSpace: 'normal',
    float: 'none',
  }

  const first_button_padding = {
    paddingLeft: '1.25em',
    fontSize: 'medium',
    fontWeight: 'bold',
  }

  const dropdown_padding = {
    paddingLeft: '1.25em',
    fontFamily:
      'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
  }

  const animatedComponents = makeAnimated()

  return (
    <>
      <CRow>
        <DataUploads
          ClearupdateAll={ClearupdateAll}
          daterange={daterange}
          updateData={updateAll}
          apiData={downloaddata}
          fileName={fileName}
        ></DataUploads>
      </CRow>
      <CCardBody style={{ paddingTop: '0rem' }}>
        <fieldset style={fieldset}>
          <legend style={legend}>Delayed Shipments Filtering</legend>
          <CRow>
            <CCol
              style={{ borderRight: '0.15em solid', paddingLeft: '1em', paddingRight: '1.25em' }}
            >
              <CRow>
                <CFormLabel style={{ fontSize: 'medium', fontWeight: 'bold' }}>Unit</CFormLabel>
              </CRow>
              <CRow>
                <Select
                  width="100%"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={'Select Unit'}
                  isMulti
                  onChange={handleUnitOptionChange}
                  options={unitOptions}
                  value={unitvalue}
                />
              </CRow>
              <div style={{ height: '1.5rem' }}></div>
            </CCol>
            <CCol
              style={{ borderRight: '0.15em solid', paddingLeft: '1.25em', paddingRight: '1.25em' }}
            >
              <CRow>
                <CFormLabel style={{ fontSize: 'medium', fontWeight: 'bold' }}>
                  Rail | Truck
                </CFormLabel>
              </CRow>
              <CRow>
                <CButtonGroup
                  style={{
                    fontFamily:
                      'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                  }}
                  role="group"
                  aria-label="Basic checkbox toggle button group"
                >
                  <CFormCheck
                    button={{ color: 'dark', variant: 'outline' }}
                    name="btnradio"
                    id="btnradio1"
                    autoComplete="off"
                    label="Railcar"
                    onChange={(e) => handleRailOptionChange(e.target.checked)}
                    checked={railvalue}
                  />
                  <CFormCheck
                    button={{ color: 'dark', variant: 'outline' }}
                    name="btnradio"
                    id="btnradio2"
                    autoComplete="off"
                    label="Truck"
                    onChange={(e) => handleTruckOptionChange(e.target.checked)}
                    checked={truckvalue}
                  />
                </CButtonGroup>
              </CRow>
              <div style={{ height: '1.5rem' }}></div>
            </CCol>
            <CCol
              style={{ borderRight: '0.15em solid', paddingLeft: '1.25em', paddingRight: '1.25em' }}
            >
              <CRow>
                <CFormLabel style={{ fontSize: 'medium', fontWeight: 'bold' }}>CSR</CFormLabel>
              </CRow>
              <CRow>
                <Select
                  width="100%"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={'Select CSR'}
                  isMulti
                  onChange={handleCSROptionChange}
                  options={csrOptions}
                  style={button_style}
                  value={csrvalue}
                />
              </CRow>
              <div style={{ height: '1.5rem' }}></div>
            </CCol>
            <CCol
              style={{ borderRight: '0.15em solid', paddingLeft: '1.25em', paddingRight: '1.25em' }}
            >
              <CRow>
                <CFormLabel style={{ fontSize: 'medium', fontWeight: 'bold' }}>Customer</CFormLabel>
              </CRow>
              <CRow>
                <Select
                  width="100%"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={'Select Customer'}
                  isMulti
                  onChange={handleCustOptionChange}
                  options={custOptions}
                  value={custvalue}
                />
              </CRow>
              <div style={{ height: '1.5rem' }}></div>
            </CCol>
            <CCol style={{ paddingLeft: '1.25em', paddingRight: '1em' }}>
              <CRow>
                <CFormLabel style={{ fontSize: 'medium', fontWeight: 'bold' }}>Date</CFormLabel>
              </CRow>
              <CRow>
                <DateRangePicker
                  disabledDate={allowedRange(daterange.min_date, daterange.max_date)}
                  showOneCalendar={true}
                  appearance="default"
                  placeholder="Date"
                  onChange={handleDateOptionChange}
                  value={datevalue}
                />
              </CRow>
              <div style={{ height: '1.5rem' }}></div>
            </CCol>
          </CRow>
        </fieldset>
      </CCardBody>
      <CCardBody>
        <fieldset style={fieldset}>
          <legend style={legend}>Delayed Shipments</legend>
          <CRow>
            <CCol sm="6" style={{ paddingLeft: '1.5rem', paddingRight: '0.75rem' }}>
              <CCard className="mb-4">
                <CCardBody>
                  <CRow>
                    <h4 id="traffic" className="card-title mb-0" style={{ textAlign: 'center' }}>
                      Number of Delayed Shipments per Reason Category
                    </h4>
                  </CRow>
                  <BarChartCatCountCat
                    handleonClick={handleonClick}
                    databarcat={databarcat}
                  ></BarChartCatCountCat>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm="6" style={{ paddingRight: '1.5rem', paddingLeft: '0.75rem' }}>
              <CCard className="mb-4">
                <CCardBody>
                  <CRow>
                    <h4 id="traffic" className="card-title mb-0" style={{ textAlign: 'center' }}>
                      Number of Delayed Shipments per Customer
                    </h4>
                  </CRow>
                  <BarChartCatCountCust
                    handleonClickCust={handleonClickCust}
                    databarcust={databarcust}
                  ></BarChartCatCountCust>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
              <CCard className="mb-4">
                <CCardBody>
                  <CRow>
                    <h4 id="traffic" className="card-title mb-0" style={{ textAlign: 'center' }}>
                      Average Delay over Time
                    </h4>
                  </CRow>
                  <CCol>
                    <LineChartAvgDelay
                      handleonClickLine={handleonClickLine}
                      data={data}
                    ></LineChartAvgDelay>
                  </CCol>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
              <CCard className="mb-4">
                <CCardBody>
                  <CRow>
                    <h4 id="traffic" className="card-title mb-0" style={{ textAlign: 'center' }}>
                      Average Delay per Reason
                    </h4>
                  </CRow>
                  <CCol>
                    <BarChartCategories
                      onClick={(data, event) => console.log({ data, event })}
                      databarcatavg={databarcatavg}
                    ></BarChartCategories>
                  </CCol>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol
              style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingBottom: '1.25rem' }}
            >
              <BasicTable datatable={datatable}></BasicTable>
            </CCol>
          </CRow>
        </fieldset>
      </CCardBody>
    </>
  )
}

export default LogisticsDashboard
