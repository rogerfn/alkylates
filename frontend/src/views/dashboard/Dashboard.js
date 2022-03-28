import React, { lazy, useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { DateRangePicker } from 'rsuite'
import { useSelector } from 'react-redux'
import { CCard, CCardBody, CCol, CRow, CFormLabel, CForm, CFormCheck } from '@coreui/react'
import makeAnimated from 'react-select/animated'
import FormatDate from 'src/functions/Functions'
import HealthSafety from 'src/components/healthsafety/HealthSafety'
import UnitSummary from 'src/components/unitsummary/UnitSummary'
import BarMonthlyProduction from 'src/components/barcharts/BarMonthlyProduction'
import BarProductionUnit from 'src/components/barcharts/BarProductionUnit'
import PieProductionUnit from 'src/components/piecharts/PieProductionUnit'
import BarProductionProduct from 'src/components/barcharts/BarProductionProduct'
import BarProductionLateProduct from 'src/components/barcharts/BarProductionLateProduct'
import DataUploadsSchedule from 'src/components/datauploads/DataUploadsSchedule'
import GantNivoLine from 'src/components/gantt/GantNivoLine'

const Dashboard = () => {
  const [productionscheduledata, setProductionScheduleData] = useState([])
  const [productionschedulebardata, setProductionScheduleBarData] = useState([])
  const [productionschedulebardevdata, setProductionScheduleBarDeviationData] = useState([])
  const [unitlatedata, setUnitLateData] = useState([])

  const [batch, setBatch] = useState('false')

  const [average, setAverage] = useState(false)
  const [batchbar, setBatchBar] = useState(false)

  const [databarunitsum, setDataBarUnitSum] = useState([])

  const [databatchbarunitsum, setDataBatchBarUnitSum] = useState([])

  const [databarunitmonthsum, setDataBarUnitMonthSum] = useState([])
  const [keysbarunitmonthsum, setKeysBarUnitMonthSum] = useState([])

  const [databatchbarunitmonthsum, setBatchDataBarUnitMonthSum] = useState([])
  const [keysbatchbarunitmonthsum, setBatchKeysBarUnitMonthSum] = useState([])

  const [databarunitavg, setDataBarUnitAvg] = useState([])

  const [databatchbarunitavg, setDataBatchBarUnitAvg] = useState([])

  const [datapievolume, setDataPieVolume] = useState([])
  const [datapiebatch, setDataPieBatch] = useState([])
  const [datapievolumeavg, setDataPieVolumeAvg] = useState([])
  const [datapiebatchavg, setDataPieBatchAvg] = useState([])

  const [averagepie, setAveragePie] = useState(false)
  const [batchpie, setBatchPie] = useState(false)

  const [daterange, setDateRange] = useState([])

  const [datevalue, setDateValue] = useState([
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    new Date(),
  ])
  const [dateinputs, setDateInputs] = useState(datevalue)

  const [unit, setUnit] = useState([])
  const [unitvalue, setUnitValue] = useState([])

  const [productoptions, setProductOptions] = useState([])
  const [product, setProduct] = useState([])
  const [productvalue, setProductValue] = useState([])

  const [batchnumberoptions, setBatchNumberOptions] = useState([])
  const [batchnumber, setBatchNumber] = useState([])
  const [batchnumbervalue, setBatchNumberValue] = useState([])

  const [unitgant, setUnitGant] = useState('VISTA')

  const [unitOptions, setUnitOptions] = useState([])

  const handleDateOptionChange = (selectValue) => {
    setDateInputs(selectValue ? selectValue : [])
    setDateValue(selectValue ? selectValue : [])
  }
  const handleUnitOptionChange = (option) => {
    setUnit(option ? option : [])
    setUnitValue(option ? option : [])
  }

  const handleProductOptionChange = (option) => {
    setProduct(option ? option : [])
    setProductValue(option ? option : [])
  }

  const handleBatchNumberOptionChange = (option) => {
    setBatchNumber(option ? option : [])
    setBatchNumberValue(option ? option : [])
  }

  const handleBatchToggle = (checked) => {
    setBatch(checked ? checked : 'false')
  }

  const handleAverage = (checked) => {
    setAverage(checked ? checked : false)
  }

  const handleBatchBar = (checked) => {
    setBatchBar(checked ? checked : false)
  }
  const handleAveragePie = (checked) => {
    setAveragePie(checked ? checked : false)
  }
  const handleBatchPie = (checked) => {
    setBatchPie(checked ? checked : false)
  }

  const handleProductionScheduleGraphOptions = (id) => {
    setUnitGant(id)
  }

  const getProductionScheduleData = () => {
    let paramsToSend = {}
    paramsToSend.unit = unitgant

    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/production/graph/gant/schedule/`, config).then((res) => {
      setProductionScheduleData(res.data)
    })
  }

  const getProductionScheduleBarData = () => {
    let paramsToSend = {}
    paramsToSend.unit = unitgant

    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/production/graph/bar/schedule/`, config).then((res) => {
      setProductionScheduleBarData(res.data)
    })
  }

  const getProductionScheduleBarDeviationData = () => {
    let paramsToSend = {}
    paramsToSend.unit = unitgant

    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios
      .get(`${window.API_URL}/api/production/graph/bar-deviation/schedule/`, config)
      .then((res) => {
        setProductionScheduleBarDeviationData(res.data.data)
        setUnitLateData(res.data.key)
      })
  }

  const getDataBarMonthSum = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (product && product.length > 0) paramsToSend.products = product.map((el) => el.value)
    if (batchnumber && batchnumber.length > 0)
      paramsToSend.batch = batchnumber.map((el) => el.value)
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios
      .get(`${window.API_URL}/api/production/graph/bar/unit-month-total/`, config)
      .then((res) => {
        setDataBarUnitMonthSum(res.data.data)
        setKeysBarUnitMonthSum(res.data.keys)
      })
  }

  const getBatchDataBarMonthSum = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (product && product.length > 0) paramsToSend.products = product.map((el) => el.value)
    if (batchnumber && batchnumber.length > 0)
      paramsToSend.batch = batchnumber.map((el) => el.value)
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios
      .get(`${window.API_URL}/api/production/graph/bar/unit-batch-month-total/`, config)
      .then((res) => {
        setBatchDataBarUnitMonthSum(res.data.data)
        setBatchKeysBarUnitMonthSum(res.data.keys)
      })
  }

  const getDataBarSum = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (product && product.length > 0) paramsToSend.products = product.map((el) => el.value)
    if (batchnumber && batchnumber.length > 0)
      paramsToSend.batch = batchnumber.map((el) => el.value)
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    // ${window.API_URL}
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/production/graph/bar/unit-total/`, config).then((res) => {
      setDataBarUnitSum(res.data)
    })
  }

  const getBatchDataBarSum = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (product && product.length > 0) paramsToSend.products = product.map((el) => el.value)
    if (batchnumber && batchnumber.length > 0)
      paramsToSend.batch = batchnumber.map((el) => el.value)
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
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
      .get(`${window.API_URL}/api/production/graph/bar/unit-batch-total/`, config)
      .then((res) => {
        setDataBatchBarUnitSum(res.data)
      })
  }

  const getDataBarAvg = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (product && product.length > 0) paramsToSend.products = product.map((el) => el.value)
    if (batchnumber && batchnumber.length > 0)
      paramsToSend.batch = batchnumber.map((el) => el.value)
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    // ${window.API_URL}
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/production/graph/bar/unit-avg/`, config).then((res) => {
      setDataBarUnitAvg(res.data)
    })
  }

  const getBatchDataBarAvg = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (product && product.length > 0) paramsToSend.products = product.map((el) => el.value)
    if (batchnumber && batchnumber.length > 0)
      paramsToSend.batch = batchnumber.map((el) => el.value)
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    // ${window.API_URL}
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/production/graph/bar/unit-batch-avg/`, config).then((res) => {
      setDataBatchBarUnitAvg(res.data)
    })
  }

  const getDataPieVolume = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (product && product.length > 0) paramsToSend.products = product.map((el) => el.value)
    if (batchnumber && batchnumber.length > 0)
      paramsToSend.batch = batchnumber.map((el) => el.value)
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/production/graph/pie/volumes-sum/`, config).then((res) => {
      setDataPieVolume(res.data)
    })
  }

  const getDataPieBatch = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (product && product.length > 0) paramsToSend.products = product.map((el) => el.value)
    if (batchnumber && batchnumber.length > 0)
      paramsToSend.batch = batchnumber.map((el) => el.value)
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/production/graph/pie/batch-sum/`, config).then((res) => {
      setDataPieBatch(res.data)
    })
  }

  const getDataPieVolumeAvg = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (product && product.length > 0) paramsToSend.products = product.map((el) => el.value)
    if (batchnumber && batchnumber.length > 0)
      paramsToSend.batch = batchnumber.map((el) => el.value)
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/production/graph/pie/volumes-avg/`, config).then((res) => {
      setDataPieVolumeAvg(res.data)
    })
  }

  const getDataPieBatchAvg = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (product && product.length > 0) paramsToSend.products = product.map((el) => el.value)
    if (batchnumber && batchnumber.length > 0)
      paramsToSend.batch = batchnumber.map((el) => el.value)
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/production/graph/pie/batch-avg/`, config).then((res) => {
      setDataPieBatchAvg(res.data)
    })
  }

  const getDateRangeData = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (product && product.length > 0) paramsToSend.products = product.map((el) => el.value)
    if (batchnumber && batchnumber.length > 0)
      paramsToSend.batch = batchnumber.map((el) => el.value)
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/production/filters/dates/`, config).then((res) => {
      setDateRange(res.data)
    })
  }

  const getProductOptions = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/production/filters/products/`, config).then((res) => {
      setProductOptions(res.data)
    })
  }
  const getBatchNumberOptions = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/production/filters/batch-id/`, config).then((res) => {
      setBatchNumberOptions(res.data)
    })
  }

  const getUnitOptions = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    if (product && product.length > 0) paramsToSend.products = product.map((el) => el.value)
    if (batchnumber && batchnumber.length > 0)
      paramsToSend.batch = batchnumber.map((el) => el.value)
    if (unit && unit.length > 0) paramsToSend.unit = unit.map((el) => el.value)
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/production/filters/units/`, config).then((res) => {
      setUnitOptions(res.data)
    })
  }

  useEffect(() => {
    getProductionScheduleData()
  }, [, unitgant])

  useEffect(() => {
    getProductionScheduleBarData()
  }, [, unitgant])

  useEffect(() => {
    getProductionScheduleBarDeviationData()
  }, [, unitgant])

  useEffect(() => {
    getDataBarSum()
  }, [, dateinputs, unit, product, batchnumber])

  useEffect(() => {
    getBatchDataBarSum()
  }, [, dateinputs, unit, product, batchnumber])

  useEffect(() => {
    getDataBarMonthSum()
  }, [, dateinputs, unit, product, batchnumber])

  useEffect(() => {
    getBatchDataBarMonthSum()
  }, [, dateinputs, unit, product, batchnumber])

  useEffect(() => {
    getDataBarAvg()
  }, [, dateinputs, unit, product, batchnumber])

  useEffect(() => {
    getBatchDataBarAvg()
  }, [, dateinputs, unit, product, batchnumber])

  useEffect(() => {
    getDateRangeData()
  }, [, dateinputs, unit, product, batchnumber])

  useEffect(() => {
    getProductOptions()
  }, [, dateinputs, unit, batchnumber])

  useEffect(() => {
    getBatchNumberOptions()
  }, [, dateinputs, unit, product])

  useEffect(() => {
    getUnitOptions()
  }, [, dateinputs, batchnumber, product])

  useEffect(() => {
    getDataPieVolume()
  }, [, dateinputs, unit, product, batchnumber])

  useEffect(() => {
    getDataPieBatch()
  }, [, dateinputs, unit, product, batchnumber])

  useEffect(() => {
    getDataPieVolumeAvg()
  }, [, dateinputs, unit, product, batchnumber])

  useEffect(() => {
    getDataPieBatchAvg()
  }, [, dateinputs, unit, product, batchnumber])

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
    paddingRight: '1.25em',
    fontFamily:
      'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
  }

  const { allowedRange } = DateRangePicker
  const animatedComponents = makeAnimated()
  const user = useSelector((state) => state.auth.user)

  const updateAll = () => {
    getProductionScheduleData()
    getDateRangeData()
  }

  return (
    <>
      {user && user.planning && <DataUploadsSchedule updateData={updateAll} />}
      <HealthSafety user={user} />
      <UnitSummary />
      <CCardBody style={{ paddingTop: '0rem' }}>
        <fieldset style={fieldset}>
          <legend style={legend}> ETO Status </legend>
          <CRow>
            <CCol>
              <CCard
                className="mb-4"
                style={{
                  marginLeft: '1rem',
                  marginRight: '1rem',
                  boxShadow:
                    '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                }}
              >
                <CCardBody>
                  <CRow>
                    <CCol style={{ textAlign: 'center' }}>
                      <h4 id="eto-production" className="card-title mb-0">
                        ETO Production Overview
                      </h4>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: '1em',
                        marginBottom: '1em',
                      }}
                    >
                      <CForm
                        onChange={(e) => {
                          handleProductionScheduleGraphOptions(e.target.id)
                        }}
                      >
                        <CFormCheck
                          inline
                          type="radio"
                          name="production-line-graph-options"
                          id="VISTA"
                          label="ETO 1"
                          defaultChecked
                          style={
                            unitlatedata === 'late'
                              ? { boxShadow: 'rgb(255 78 17 / 50%) 0px 0px 10px 4px' }
                              : { boxShadow: 'none' }
                          }
                        />
                        <CFormCheck
                          inline
                          type="radio"
                          name="production-line-graph-options"
                          id="BUSS"
                          label="ETO 2"
                        />
                        <CFormCheck
                          inline
                          type="radio"
                          name="production-line-graph-options"
                          id="LASER"
                          label="ETO 3"
                        />
                        <CFormCheck
                          inline
                          type="radio"
                          name="production-line-graph-options"
                          id="ETO4"
                          label="ETO 4"
                        />
                        <CFormCheck
                          inline
                          type="radio"
                          name="production-line-graph-options"
                          id="ETO5"
                          label="ETO 5"
                        />
                      </CForm>
                    </CCol>
                  </CRow>
                  <GantNivoLine
                    data={productionscheduledata}
                    linethick={20}
                    style_input={{ height: '300px' }}
                  />
                  <div style={{ marginTop: '2rem' }}>
                    <CRow>
                      <CCol>
                        <CRow>
                          <CCol className="mb-4" style={{ textAlign: 'center' }}>
                            <h4 id="eto-production" className="card-title mb-0">
                              Production Volumes per Product
                            </h4>
                          </CCol>
                        </CRow>
                        <BarProductionProduct data={productionschedulebardata} />
                      </CCol>
                      <CCol>
                        <CRow>
                          <CCol className="mb-4" style={{ textAlign: 'center' }}>
                            <h4 id="eto-production" className="card-title mb-0">
                              What is my current Schedule Deviation?
                            </h4>
                          </CCol>
                        </CRow>
                        <BarProductionLateProduct data={productionschedulebardevdata} />
                      </CCol>
                    </CRow>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </fieldset>
      </CCardBody>
      <CCardBody style={{ paddingTop: '0rem' }}>
        <fieldset style={fieldset}>
          <legend style={legend}>Production Filtering</legend>
          <CRow>
            <CCol style={{ borderRight: '0.15em solid' }}>
              <CRow>
                <CFormLabel style={first_button_padding}>Date</CFormLabel>
              </CRow>
              <CRow>
                <DateRangePicker
                  disabledDate={allowedRange(daterange.min_date, daterange.max_date)}
                  showOneCalendar={true}
                  style={dropdown_padding}
                  appearance="default"
                  placeholder="Date"
                  onChange={handleDateOptionChange}
                  value={datevalue}
                />
              </CRow>
              <div style={{ height: '1.5rem' }}></div>
            </CCol>
            <CCol
              style={{ borderRight: '0.15em solid', paddingLeft: '1.25em', paddingRight: '1.25em' }}
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
                  style={dropdown_padding}
                />
              </CRow>
              <div style={{ height: '1.5rem' }}></div>
            </CCol>
            <CCol
              style={{ borderRight: '0.15em solid', paddingLeft: '1.25em', paddingRight: '1.25em' }}
            >
              <CRow>
                <CFormLabel style={{ fontSize: 'medium', fontWeight: 'bold' }}>Products</CFormLabel>
              </CRow>
              <CRow>
                <Select
                  width="100%"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={'Select Product'}
                  isMulti
                  onChange={handleProductOptionChange}
                  options={productoptions}
                  value={productvalue}
                  style={dropdown_padding}
                />
              </CRow>
              <div style={{ height: '1.5rem' }}></div>
            </CCol>
            <CCol style={{ paddingLeft: '1.25em', paddingRight: '1.25em' }}>
              <CRow>
                <CFormLabel style={{ fontSize: 'medium', fontWeight: 'bold' }}>
                  Batch Number
                </CFormLabel>
              </CRow>
              <CRow>
                <Select
                  width="100%"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={'Select Batch ID'}
                  isMulti
                  onChange={handleBatchNumberOptionChange}
                  options={batchnumberoptions}
                  value={batchnumbervalue}
                  style={dropdown_padding}
                />
              </CRow>
              <div style={{ height: '1.5rem' }}></div>
            </CCol>
          </CRow>
        </fieldset>
      </CCardBody>
      <CCardBody style={{ paddingTop: '0rem' }}>
        <fieldset style={fieldset}>
          <legend style={legend}> Production </legend>
          <CRow>
            <CCol>
              <CCard
                className="mb-4"
                style={{
                  marginLeft: '1rem',
                  marginRight: '1rem',
                  boxShadow:
                    '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                }}
              >
                <CCardBody>
                  <CRow>
                    <CCol style={{ textAlign: 'center', minWidth: '80%' }}>
                      <h4 id="traffic" className="card-title mb-0" style={{ textAlign: 'center' }}>
                        Monthly Production Figures per Unit
                      </h4>
                    </CCol>
                    <CCol
                      style={{
                        minWidth: '20%',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <CFormCheck
                        label="Batches"
                        id="formSwitchCheckDefault"
                        inline
                        style={{ fontWeight: 'bolder' }}
                        onChange={(e) => {
                          handleBatchToggle(e.target.checked)
                        }}
                      />
                    </CCol>
                  </CRow>
                  <BarMonthlyProduction
                    keys={batch === 'false' ? keysbarunitmonthsum : keysbatchbarunitmonthsum}
                    data={batch === 'false' ? databarunitmonthsum : databatchbarunitmonthsum}
                    legend={
                      batch === 'false'
                        ? 'Total Production Volumes (mT)'
                        : 'Total Production Batches'
                    }
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6">
              <CCard
                className="mb-4"
                style={{
                  marginLeft: '1rem',
                  marginRight: '1rem',
                  boxShadow:
                    '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                }}
              >
                <CCardBody>
                  <CRow>
                    <h4 id="traffic" className="card-title mb-0" style={{ textAlign: 'center' }}>
                      Production Actual Figures Broken down by Unit
                    </h4>
                  </CRow>
                  <CRow>
                    <CCol
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: '1em',
                        marginBottom: '1em',
                      }}
                    >
                      <CFormCheck
                        onChange={(e) => {
                          handleAverage(e.target.checked)
                        }}
                        inline
                        id="Average"
                        value="Average"
                        label="Average"
                      />
                      <CFormCheck
                        onChange={(e) => {
                          handleBatchBar(e.target.checked)
                        }}
                        inline
                        id="BatchBar"
                        value="BatchBar"
                        label="Batch"
                      />
                    </CCol>
                  </CRow>
                  <BarProductionUnit
                    keys={average ? ['total_production'] : ['total_production']}
                    data={
                      average && batchbar
                        ? databatchbarunitavg
                        : average
                        ? databarunitavg
                        : batchbar
                        ? databatchbarunitsum
                        : databarunitsum
                    }
                    legend={
                      average && batchbar
                        ? 'Average Number of Batches'
                        : average
                        ? 'Average Production Volumes (mT)'
                        : batchbar
                        ? 'Total Number of Batches'
                        : 'Total Production Volumes (mT)'
                    }
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm="6">
              <CCard
                className="mb-4"
                style={{
                  marginLeft: '1rem',
                  marginRight: '1rem',
                  boxShadow:
                    '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                }}
              >
                <CCardBody>
                  <CRow>
                    {/* <CCol style={{ textAlign: 'center', minWidth: '80%' }}> */}
                    <h4 id="traffic" className="card-title mb-0" style={{ textAlign: 'center' }}>
                      {averagepie && batchpie
                        ? 'Daily Average Batches per Unit'
                        : averagepie
                        ? 'Daily Average Volume (mT) per Unit'
                        : batchpie
                        ? 'Total Number of Batches per Unit'
                        : 'Total Volume (mT) per Unit'}
                    </h4>
                  </CRow>
                  <CRow>
                    {/* </CCol> */}
                    <CCol
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: '1em',
                        marginBottom: '1em',
                      }}
                    >
                      <CFormCheck
                        onChange={(e) => {
                          handleAveragePie(e.target.checked)
                        }}
                        inline
                        id="AveragePie"
                        value="AveragePie"
                        label="Average"
                      />
                      <CFormCheck
                        onChange={(e) => {
                          handleBatchPie(e.target.checked)
                        }}
                        inline
                        id="BatchPie"
                        value="BatchPie"
                        label="Batch"
                      />
                    </CCol>
                  </CRow>
                  <PieProductionUnit
                    data={
                      averagepie && batchpie
                        ? datapiebatchavg
                        : averagepie
                        ? datapievolumeavg
                        : batchpie
                        ? datapiebatch
                        : datapievolume
                    }
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </fieldset>
      </CCardBody>
    </>
  )
}

export default Dashboard
