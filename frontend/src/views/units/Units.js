import React, { lazy, useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { DateRangePicker } from 'rsuite'
import safety from '../../assets/images/safety.png'
import environment from '../../assets/images/environment.png'
import general from '../../assets/images/general.png'
import { startOfDay, endOfDay, addDays, subDays } from 'date-fns'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCardTitle,
  CCardText,
  CFormLabel,
  CButtonGroup,
  CFormCheck,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import makeAnimated from 'react-select/animated'
import FormatDate from '../../functions/Functions'
import OEE from '../../assets/images/Settings-Icon.png'
import quality from '../../assets/images/Speaker-Icon.png'
import availability from '../../assets/images/Guage-Icon.png'
import performance from '../../assets/images/Bar-Graph-Icon2.png'
import delays from '../../assets/images/Clock-Timer-Icon.png'
import WaterfallChart from '../../components/waterfallchart/WaterfallChart'
// import WaterfallChart2 from '../../components/waterfallchart/WaterfallChart2'

const Units = () => {
  const [data, setData] = useState([])

  const [datalineunitdate, setDataLineUnitDate] = useState([])

  const [databarunitsum, setDataBarUnitSum] = useState([])

  const [databarunitavg, setDataBarUnitAvg] = useState([])

  const [daterange, setDateRange] = useState([])
  const [dateinputs, setDateInputs] = useState([])
  const [datevalue, setDateValue] = useState([])

  const [unit, setUnit] = useState([])
  const [unitvalue, setUnitValue] = useState([])

  const unitOptions = [
    { value: 'ETO 1', label: 'ETO 1' },
    { value: 'ETO 2', label: 'ETO 2' },
    { value: 'ETO 3', label: 'ETO 3' },
    { value: 'ETO 4', label: 'ETO 4' },
    { value: 'ETO 5', label: 'ETO 5' },
  ]

  const handleDateOptionChange = (selectValue) => {
    setDateInputs(selectValue ? selectValue : [])
    setDateValue(selectValue ? selectValue : [])
  }
  const handleUnitOptionChange = (option) => {
    setUnit(option ? option : [])
    setUnitValue(option ? option : [])
  }

  const wfdata = [
    ['Losses', '', '', '', ''],
    ['Total Available Capacity', 0, 0, 100, 100],
    ['Availability Losses', 100, 100, 80, 80],
    ['Quality Losses', 80, 80, 70, 70],
    ['Performance Losses', 70, 70, 65, 65],
    ['Output', 0, 0, 65, 65],
  ]

  const optionswf = {
    legend: 'none',
    bar: { groupWidth: '100%' }, // Remove space between bars.
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
      risingColor: { strokeWidth: 0, fill: '#0f9d58' }, // green
    },
    is3D: false,
    title: 'OEE',
  }

  const [activeKey, setActiveKey] = useState(1)
  const [percRange, setPercRange] = useState(25)

  const getData = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/production/graph/line/last-30-days/`, config).then((res) => {
      setData(res.data)
    })
  }
  const getDataLineDate = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('access')}`,

        Accept: 'application/json',
      },
      params: paramsToSend,
    }
    axios.get(`${window.API_URL}/api/production/graph/line/unit-date/`, config).then((res) => {
      setDataLineUnitDate(res.data)
    })
  }

  const getDataBarSum = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
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

  const getDataBarAvg = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
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

  const getDateRangeData = () => {
    let paramsToSend = {}
    if (dateinputs && dateinputs.length > 0)
      paramsToSend.dateinputs = dateinputs.map((date) => FormatDate(date))
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

  useEffect(() => {
    getData()
  }, [, dateinputs])

  useEffect(() => {
    getDataLineDate()
  }, [, dateinputs])

  useEffect(() => {
    getDataBarSum()
  }, [, dateinputs])

  useEffect(() => {
    getDataBarAvg()
  }, [, dateinputs])

  useEffect(() => {
    getDateRangeData()
  }, [,])

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
  const icon_div_style = {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
  }
  const text_div = {
    marginLeft: '1rem',
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

  const { allowedRange } = DateRangePicker

  var perc_range = 10

  return (
    <>
      <div className="flex-wrapper">
        <div className="single-chart">
          <svg
            viewBox="0 0 36 36"
            className={
              percRange > 50
                ? 'circular-chart green'
                : percRange < 25
                ? 'circular-chart red'
                : 'circular-chart orange'
            }
          >
            <path
              className="circle-bg"
              d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle"
              strokeDasharray={percRange + ', 100'}
              d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="18.35" className="percentage">
              {percRange + '%'}
            </text>
            <text x="18" y="25.35" className="text">
              {activeKey === 1
                ? 'OEE Percentage'
                : activeKey === 2
                ? 'Quality Percentage'
                : activeKey === 3
                ? 'Availability Percentage'
                : activeKey === 4
                ? 'Performance Percentage'
                : 'Delays Percentage'}
            </text>
          </svg>
        </div>

        {/* <div className="single-chart">
          <svg viewBox="0 0 36 36" className="circular-chart green">
            <path
              className="circle-bg"
              d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle"
              strokeDasharray="25, 100"
              d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage">
              25%
            </text>
          </svg>
        </div>

        <div className="single-chart">
          <svg viewBox="0 0 36 36" className="circular-chart red">
            <path
              className="circle-bg"
              d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle"
              strokeDasharray="90, 100"
              d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage">
              90%
            </text>
          </svg>
        </div> */}
      </div>
      <CCardBody></CCardBody>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 1}
            onClick={() => {
              setActiveKey(1)
              setPercRange(75)
            }}
            style={{ fontSize: '16px', fontWeight: 'bold', color: 'gray' }}
          >
            <img
              style={{
                height: '35px',
                backgroundColor: 'rgba(44, 56, 74, 0.95)',
                borderRadius: '1.25rem',
                marginRight: '0.5rem',
              }}
              src={OEE}
            ></img>
            OEE
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 2}
            onClick={() => {
              setActiveKey(2)
              setPercRange(50)
            }}
            style={{ fontSize: '16px', fontWeight: 'bold', color: 'gray' }}
          >
            <img
              style={{
                height: '35px',
                backgroundColor: 'rgba(44, 56, 74, 0.95)',
                borderRadius: '1.25rem',
                marginRight: '0.5rem',
              }}
              src={quality}
            ></img>
            Quality
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 3}
            onClick={() => {
              setActiveKey(3)
              setPercRange(95)
            }}
            style={{ fontSize: '16px', fontWeight: 'bold', color: 'gray' }}
          >
            <img
              style={{
                height: '35px',
                backgroundColor: 'rgba(44, 56, 74, 0.95)',
                borderRadius: '1.25rem',
                marginRight: '0.5rem',
              }}
              src={availability}
            ></img>
            Availability
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 4}
            onClick={() => {
              setActiveKey(4)
              setPercRange(85)
            }}
            style={{ fontSize: '16px', fontWeight: 'bold', color: 'gray' }}
          >
            <img
              style={{
                height: '35px',
                backgroundColor: 'rgba(44, 56, 74, 0.95)',
                borderRadius: '1.25rem',
                marginRight: '0.5rem',
              }}
              src={performance}
            ></img>
            Performance
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 5}
            onClick={() => {
              setActiveKey(5)
              setPercRange(15)
            }}
            style={{ fontSize: '16px', fontWeight: 'bold', color: 'gray' }}
          >
            <img
              style={{
                height: '35px',
                backgroundColor: 'rgba(44, 56, 74, 0.95)',
                borderRadius: '1.25rem',
                marginRight: '0.5rem',
              }}
              src={delays}
            ></img>
            Delays
          </CNavLink>
        </CNavItem>
      </CNav>
      <CCard
        style={{
          boxShadow:
            '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
        }}
      >
        <CCardBody>
          <CTabContent>
            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
              <CRow>
                <h4 style={{ textAlign: 'center' }} id="eto-production" className="card-title mb-0">
                  OEE
                </h4>
              </CRow>
              <CRow>
                <div
                  style={{
                    height: '300px',
                    // width: '50%',
                    // backgroundColor: 'rgba(44, 56, 74, 0.95)',
                    // boxShadow:
                    //   '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                    // borderRadius: '0.25rem',
                    margin: '1rem',
                    padding: '1rem',
                  }}
                >
                  <ResponsiveLine
                    data={data}
                    margin={{ top: 50, right: 140, bottom: 50, left: 60 }}
                    colors={['#013A63', '#2A6F97', '#468FAF', '#61A5C2', '#A9D6E5']}
                    theme={{
                      // textColor: 'white',
                      fontSize: 11,
                      axis: {
                        domain: {
                          line: {
                            strokeWidth: 1,
                          },
                        },
                        ticks: {
                          line: {
                            strokeWidth: 1,
                          },
                        },
                      },
                      grid: {
                        line: {
                          strokeWidth: 1,
                        },
                      },
                    }}
                    xFormat="time:%Y-%m-%d"
                    xScale={{
                      type: 'time',
                      format: '%Y-%m-%d',
                      useUTC: false,
                      precision: 'day',
                    }}
                    yScale={{
                      type: 'linear',
                      min: 'auto',
                      max: 'auto',
                      stacked: false,
                      reverse: false,
                    }}
                    // onClick={(data, event) => handleonClickLine(data)}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      format: '%b %d',
                      orient: 'bottom',
                      tickSize: 5,
                      tickPadding: 5,
                      tickValues: 'every week',
                      tickRotation: 0,
                      legend: 'Date',
                      legendOffset: 36,
                      legendPosition: 'middle',
                      textColor: 'white',
                    }}
                    axisLeft={{
                      orient: 'left',
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: 'Production Volumes',
                      legendOffset: -45,
                      legendPosition: 'middle',
                    }}
                    pointSize={7}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                      {
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        toggleSerie: true,
                        effects: [
                          {
                            on: 'hover',
                            style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1,
                            },
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </CRow>
              <CRow>
                <WaterfallChart data={wfdata} options={optionswf}></WaterfallChart>
              </CRow>
              {/* <CRow>
                <WaterfallChart2></WaterfallChart2>
              </CRow> */}
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
              <CRow>
                <h4 style={{ textAlign: 'center' }} id="eto-production" className="card-title mb-0">
                  Quality
                </h4>
              </CRow>
              <CRow>
                <div
                  style={{
                    height: '300px',
                    // width: '50%',
                    // backgroundColor: 'rgba(44, 56, 74, 0.95)',
                    // boxShadow:
                    //   '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                    // borderRadius: '0.25rem',
                    margin: '1rem',
                    padding: '1rem',
                  }}
                >
                  <ResponsiveLine
                    data={data}
                    margin={{ top: 50, right: 140, bottom: 50, left: 60 }}
                    colors={['#013A63', '#2A6F97', '#468FAF', '#61A5C2', '#A9D6E5']}
                    theme={{
                      // textColor: 'white',
                      fontSize: 11,
                      axis: {
                        domain: {
                          line: {
                            strokeWidth: 1,
                          },
                        },
                        ticks: {
                          line: {
                            strokeWidth: 1,
                          },
                        },
                      },
                      grid: {
                        line: {
                          strokeWidth: 1,
                        },
                      },
                    }}
                    xFormat="time:%Y-%m-%d"
                    xScale={{
                      type: 'time',
                      format: '%Y-%m-%d',
                      useUTC: false,
                      precision: 'day',
                    }}
                    yScale={{
                      type: 'linear',
                      min: 'auto',
                      max: 'auto',
                      stacked: false,
                      reverse: false,
                    }}
                    // onClick={(data, event) => handleonClickLine(data)}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      format: '%b %d',
                      orient: 'bottom',
                      tickSize: 5,
                      tickPadding: 5,
                      tickValues: 'every week',
                      tickRotation: 0,
                      legend: 'Date',
                      legendOffset: 36,
                      legendPosition: 'middle',
                      textColor: 'white',
                    }}
                    axisLeft={{
                      orient: 'left',
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: 'Production Volumes',
                      legendOffset: -45,
                      legendPosition: 'middle',
                    }}
                    pointSize={7}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                      {
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        toggleSerie: true,
                        effects: [
                          {
                            on: 'hover',
                            style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1,
                            },
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </CRow>
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
              <CRow>
                <h4 style={{ textAlign: 'center' }} id="eto-production" className="card-title mb-0">
                  Availability
                </h4>
              </CRow>
              <CRow>
                <div
                  style={{
                    height: '300px',
                    // width: '50%',
                    // backgroundColor: 'rgba(44, 56, 74, 0.95)',
                    // boxShadow:
                    //   '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                    // borderRadius: '0.25rem',
                    margin: '1rem',
                    padding: '1rem',
                  }}
                >
                  <ResponsiveLine
                    data={data}
                    margin={{ top: 50, right: 140, bottom: 50, left: 60 }}
                    colors={['#013A63', '#2A6F97', '#468FAF', '#61A5C2', '#A9D6E5']}
                    theme={{
                      // textColor: 'white',
                      fontSize: 11,
                      axis: {
                        domain: {
                          line: {
                            strokeWidth: 1,
                          },
                        },
                        ticks: {
                          line: {
                            strokeWidth: 1,
                          },
                        },
                      },
                      grid: {
                        line: {
                          strokeWidth: 1,
                        },
                      },
                    }}
                    xFormat="time:%Y-%m-%d"
                    xScale={{
                      type: 'time',
                      format: '%Y-%m-%d',
                      useUTC: false,
                      precision: 'day',
                    }}
                    yScale={{
                      type: 'linear',
                      min: 'auto',
                      max: 'auto',
                      stacked: false,
                      reverse: false,
                    }}
                    // onClick={(data, event) => handleonClickLine(data)}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      format: '%b %d',
                      orient: 'bottom',
                      tickSize: 5,
                      tickPadding: 5,
                      tickValues: 'every week',
                      tickRotation: 0,
                      legend: 'Date',
                      legendOffset: 36,
                      legendPosition: 'middle',
                      textColor: 'white',
                    }}
                    axisLeft={{
                      orient: 'left',
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: 'Production Volumes',
                      legendOffset: -45,
                      legendPosition: 'middle',
                    }}
                    pointSize={7}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                      {
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        toggleSerie: true,
                        effects: [
                          {
                            on: 'hover',
                            style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1,
                            },
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </CRow>
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="performance-tab" visible={activeKey === 4}>
              <CRow>
                <h4 style={{ textAlign: 'center' }} id="eto-production" className="card-title mb-0">
                  Performance
                </h4>
              </CRow>
              <CRow>
                <div
                  style={{
                    height: '300px',
                    // width: '50%',
                    // backgroundColor: 'rgba(44, 56, 74, 0.95)',
                    // boxShadow:
                    //   '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                    // borderRadius: '0.25rem',
                    margin: '1rem',
                    padding: '1rem',
                  }}
                >
                  <ResponsiveLine
                    data={data}
                    margin={{ top: 50, right: 140, bottom: 50, left: 60 }}
                    colors={['#013A63', '#2A6F97', '#468FAF', '#61A5C2', '#A9D6E5']}
                    theme={{
                      // textColor: 'white',
                      fontSize: 11,
                      axis: {
                        domain: {
                          line: {
                            strokeWidth: 1,
                          },
                        },
                        ticks: {
                          line: {
                            strokeWidth: 1,
                          },
                        },
                      },
                      grid: {
                        line: {
                          strokeWidth: 1,
                        },
                      },
                    }}
                    xFormat="time:%Y-%m-%d"
                    xScale={{
                      type: 'time',
                      format: '%Y-%m-%d',
                      useUTC: false,
                      precision: 'day',
                    }}
                    yScale={{
                      type: 'linear',
                      min: 'auto',
                      max: 'auto',
                      stacked: false,
                      reverse: false,
                    }}
                    // onClick={(data, event) => handleonClickLine(data)}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      format: '%b %d',
                      orient: 'bottom',
                      tickSize: 5,
                      tickPadding: 5,
                      tickValues: 'every week',
                      tickRotation: 0,
                      legend: 'Date',
                      legendOffset: 36,
                      legendPosition: 'middle',
                      textColor: 'white',
                    }}
                    axisLeft={{
                      orient: 'left',
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: 'Production Volumes',
                      legendOffset: -45,
                      legendPosition: 'middle',
                    }}
                    pointSize={7}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                      {
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        toggleSerie: true,
                        effects: [
                          {
                            on: 'hover',
                            style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1,
                            },
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </CRow>
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="delay-tab" visible={activeKey === 5}>
              <CRow>
                <h4 style={{ textAlign: 'center' }} id="eto-production" className="card-title mb-0">
                  Delays
                </h4>
              </CRow>
              <CRow>
                <div
                  style={{
                    height: '300px',
                    // width: '50%',
                    // backgroundColor: 'rgba(44, 56, 74, 0.95)',
                    // boxShadow:
                    //   '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                    // borderRadius: '0.25rem',
                    margin: '1rem',
                    padding: '1rem',
                  }}
                >
                  <ResponsiveLine
                    data={data}
                    margin={{ top: 50, right: 140, bottom: 50, left: 60 }}
                    colors={['#013A63', '#2A6F97', '#468FAF', '#61A5C2', '#A9D6E5']}
                    theme={{
                      // textColor: 'white',
                      fontSize: 11,
                      axis: {
                        domain: {
                          line: {
                            strokeWidth: 1,
                          },
                        },
                        ticks: {
                          line: {
                            strokeWidth: 1,
                          },
                        },
                      },
                      grid: {
                        line: {
                          strokeWidth: 1,
                        },
                      },
                    }}
                    xFormat="time:%Y-%m-%d"
                    xScale={{
                      type: 'time',
                      format: '%Y-%m-%d',
                      useUTC: false,
                      precision: 'day',
                    }}
                    yScale={{
                      type: 'linear',
                      min: 'auto',
                      max: 'auto',
                      stacked: false,
                      reverse: false,
                    }}
                    // onClick={(data, event) => handleonClickLine(data)}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      format: '%b %d',
                      orient: 'bottom',
                      tickSize: 5,
                      tickPadding: 5,
                      tickValues: 'every week',
                      tickRotation: 0,
                      legend: 'Date',
                      legendOffset: 36,
                      legendPosition: 'middle',
                      textColor: 'white',
                    }}
                    axisLeft={{
                      orient: 'left',
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: 'Production Volumes',
                      legendOffset: -45,
                      legendPosition: 'middle',
                    }}
                    pointSize={7}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                      {
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        toggleSerie: true,
                        effects: [
                          {
                            on: 'hover',
                            style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1,
                            },
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </CRow>
            </CTabPane>
          </CTabContent>
        </CCardBody>
      </CCard>
      <CCardBody></CCardBody>
      {/* <CCard
        className={`mb-3 border-top-5`}
        style={{
          // minHeight: '450px',
          borderTopColor: '#69B34C',
          boxShadow:
            '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
        }}
      >
        <CCardBody> */}
      {/* <div
            style={{
              height: '50px',
              width: '43%',
              backgroundColor: 'rgba(44, 56, 74, 0.95)',
              position: 'absolute',
              left: '2%',
              top: '-5%',
              boxShadow:
                '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              color: 'white',
              borderRadius: '0.25rem',
            }}
          >
            <CCol>
              <h4 id="eto-production" className="card-title mb-0">
                ETO 1
              </h4>
            </CCol>
            <CCol style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div
                style={{
                  height: '20px',
                  width: '20px',
                  border: 'solid',
                  borderRadius: '50rem',
                  borderWidth: '2px',
                  marginRight: '0.5rem',
                  borderColor: 'rgb(105, 179, 76)',
                  backgroundColor: 'rgb(105, 179, 76)',
                }}
              ></div>
              <div
                style={{
                  height: '20px',
                  width: '20px',
                  border: 'solid',
                  borderRadius: '50rem',
                  borderWidth: '2px',
                  marginRight: '0.5rem',
                  borderColor: 'rgb(250, 183, 51)',
                }}
              ></div>
              <div
                style={{
                  height: '20px',
                  width: '20px',
                  border: 'solid',
                  borderRadius: '50rem',
                  borderWidth: '2px',
                  marginRight: '0.5rem',
                  borderColor: 'rgb(255, 78, 17)',
                }}
              ></div>
            </CCol>
          </div> */}
      {/* <div
            style={{
              // position: 'absolute',
              // left: '2%',
              // top: '10%',
              padding: '1rem',
              // width: '43%',
            }}
          >
            <CRow style={{ fontSize: '50px' }}>
              <div
                style={{
                  borderBottom: 'solid',
                  borderBottomWidth: 'thin',
                  borderBottomColor: 'lightgray',
                  fontWeight: 'bold',
                  paddingBottom: '0.5rem',
                  display: 'flex',
                }}
              >
                <CCol>ETO X</CCol>
                <CCol></CCol>
                <CCol></CCol>
              </div>
            </CRow>
            <CRow>
              <div
                style={{
                  paddingBottom: '1rem',
                  paddingTop: '1.5rem',
                  display: 'flex',
                }}
              >
                <CCol
                  style={{
                    textAlign: 'center',
                    backgroundColor: 'rgba(44, 56, 74, 0.95)',
                    borderRadius: '7px',
                    fontWeight: 'bold',
                    maxWidth: '4rem',
                    color: 'white',
                    boxShadow:
                      '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
                  }}
                >
                  <img
                    style={{
                      height: '50px',
                    }}
                    src={OEE}
                  ></img>
                </CCol>
                <CCol style={{ textAlign: 'left', padding: '0.75rem' }}>OEE</CCol>
                <CCol></CCol>
              </div>
            </CRow>
            <CRow>
              <div
                style={{
                  paddingBottom: '1rem',
                  paddingTop: '1rem',
                  display: 'flex',
                }}
              >
                <CCol
                  style={{
                    textAlign: 'center',
                    backgroundColor: 'rgba(44, 56, 74, 0.95)',
                    borderRadius: '7px',
                    fontWeight: 'bold',
                    maxWidth: '4rem',
                    minWidth: '4rem',
                    color: 'white',
                    boxShadow:
                      '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
                  }}
                >
                  <img
                    style={{
                      height: '50px',
                    }}
                    src={quality}
                  ></img>
                </CCol>
                <CCol style={{ textAlign: 'left', padding: '0.75rem' }}>Quality</CCol>
                <CCol></CCol>
              </div>
            </CRow>
            <CRow>
              <div
                style={{
                  paddingBottom: '1rem',
                  paddingTop: '1rem',
                  display: 'flex',
                }}
              >
                <CCol
                  style={{
                    textAlign: 'center',
                    backgroundColor: 'rgba(44, 56, 74, 0.95)',
                    borderRadius: '7px',
                    fontWeight: 'bold',
                    maxWidth: '4rem',
                    minWidth: '4rem',
                    color: 'white',
                    boxShadow:
                      '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
                  }}
                >
                  <img
                    style={{
                      height: '50px',
                    }}
                    src={availability}
                  ></img>
                </CCol>
                <CCol style={{ textAlign: 'left', padding: '0.75rem' }}>Availability</CCol>
                <CCol></CCol>
              </div>
            </CRow>
            <CRow>
              <div
                style={{
                  paddingBottom: '1rem',
                  paddingTop: '1rem',
                  display: 'flex',
                }}
              >
                <CCol
                  style={{
                    textAlign: 'center',
                    backgroundColor: 'rgba(44, 56, 74, 0.95)',
                    borderRadius: '7px',
                    fontWeight: 'bold',
                    maxWidth: '4rem',
                    minWidth: '4rem',
                    color: 'white',
                    boxShadow:
                      '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
                  }}
                >
                  <img
                    style={{
                      height: '50px',
                    }}
                    src={performance}
                  ></img>
                </CCol>
                <CCol style={{ textAlign: 'left', padding: '0.75rem' }}>Performance</CCol>
                <CCol></CCol>
              </div>
            </CRow>
            <CRow>
              <div
                style={{
                  paddingBottom: '1rem',
                  paddingTop: '1rem',
                  display: 'flex',
                }}
              >
                <CCol
                  style={{
                    textAlign: 'center',
                    backgroundColor: 'rgba(44, 56, 74, 0.95)',
                    borderRadius: '7px',
                    fontWeight: 'bold',
                    maxWidth: '4rem',
                    minWidth: '4rem',
                    color: 'white',
                    boxShadow:
                      '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
                  }}
                >
                  <img
                    style={{
                      height: '50px',
                    }}
                    src={delays}
                  ></img>
                </CCol>
                <CCol style={{ textAlign: 'left', padding: '0.75rem' }}>Delays</CCol>
                <CCol></CCol>
              </div>
            </CRow>
          </div> */}
      {/* <CCardBody>
            <div
              style={{
                height: '300px',
                width: '50%',
                backgroundColor: 'rgba(44, 56, 74, 0.95)',
                position: 'absolute',
                left: '48%',
                top: '-5%',
                boxShadow:
                  '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                borderRadius: '0.25rem',
                paddingLeft: '1rem',
                paddingBottom: '1rem',
              }}
            >
              <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 140, bottom: 50, left: 60 }}
                colors={['#013A63', '#2A6F97', '#468FAF', '#61A5C2', '#A9D6E5']}
                theme={{
                  textColor: 'white',
                  fontSize: 11,
                  axis: {
                    domain: {
                      line: {
                        strokeWidth: 1,
                      },
                    },
                    ticks: {
                      line: {
                        strokeWidth: 1,
                      },
                    },
                  },
                  grid: {
                    line: {
                      strokeWidth: 1,
                    },
                  },
                }}
                xFormat="time:%Y-%m-%d"
                xScale={{
                  type: 'time',
                  format: '%Y-%m-%d',
                  useUTC: false,
                  precision: 'day',
                }}
                yScale={{
                  type: 'linear',
                  min: 'auto',
                  max: 'auto',
                  stacked: false,
                  reverse: false,
                }}
                // onClick={(data, event) => handleonClickLine(data)}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  format: '%b %d',
                  orient: 'bottom',
                  tickSize: 5,
                  tickPadding: 5,
                  tickValues: 'every week',
                  tickRotation: 0,
                  legend: 'Date',
                  legendOffset: 36,
                  legendPosition: 'middle',
                  textColor: 'white',
                }}
                axisLeft={{
                  orient: 'left',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Production Volumes',
                  legendOffset: -45,
                  legendPosition: 'middle',
                }}
                pointSize={7}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    toggleSerie: true,
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </div>
          </CCardBody> */}
      {/* </CCardBody>
      </CCard> */}
      {/* <CCardBody></CCardBody> */}
    </>
  )
}

export default Units
