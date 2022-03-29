import React from 'react'
import axios from 'axios'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'

const WidgetsDropdown = () => {
  const mystyle = {
    flex: '0 0 20%',
    maxWidth: '20%',
  }
  const baseURL = 'https://jsonplaceholder.typicode.com/posts/1'
  const [post, setPost] = React.useState(null)
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data)
    })
  }, [])
  if (!post) return null
  return (
    <CRow>
      <CCol sm={2} lg={2} style={mystyle}>
        <CWidgetStatsA
          className="mb-4"
          color="success"
          value={
            <>
              0.9{' '}
              <span className="fs-6 fw-normal">
                (+12% <CIcon icon={cilArrowTop} />)
              </span>
            </>
          }
          title="VISTA"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Availability</CDropdownItem>
                <CDropdownItem>Quality</CDropdownItem>
                <CDropdownItem>Performance</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [
                  {
                    label: 'OEE',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-success'),
                    data: [post.id, 18, 9, 17, 34, 22, 11],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    // min: 30,
                    // max: 89,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3} style={mystyle}>
        <CWidgetStatsA
          className="mb-4"
          color="success"
          value={
            <>
              0.75{' '}
              <span className="fs-6 fw-normal">
                (10% <CIcon icon={cilArrowTop} />)
              </span>
            </>
          }
          title="BUSS"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Availability</CDropdownItem>
                <CDropdownItem>Quality</CDropdownItem>
                <CDropdownItem>Performance</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [
                  {
                    label: 'OEE',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-success'),
                    data: [1, 18, 9, 17, 34, 22, 11],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: -9,
                    max: 39,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3} style={mystyle}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
              0.55{' '}
              <span className="fs-6 fw-normal">
                (5% <CIcon icon={cilArrowBottom} />)
              </span>
            </>
          }
          title="LASER"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Availability</CDropdownItem>
                <CDropdownItem>Quality</CDropdownItem>
                <CDropdownItem>Performance</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [
                  {
                    label: 'OEE',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-warning'),
                    data: [1, 18, 9, 17, 34, 22, 11],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: -9,
                    max: 39,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
            // <CChartLine
            //   className="mt-3"
            //   style={{ height: '70px' }}
            //   data={{
            //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            //     datasets: [
            //       {
            //         label: 'My First dataset',
            //         backgroundColor: 'rgba(255,255,255,.2)',
            //         borderColor: 'rgba(255,255,255,.55)',
            //         data: [78, 81, 80, 45, 34, 12, 40],
            //         fill: true,
            //       },
            //     ],
            //   }}
            //   options={{
            //     plugins: {
            //       legend: {
            //         display: false,
            //       },
            //     },
            //     maintainAspectRatio: false,
            //     scales: {
            //       x: {
            //         display: false,
            //       },
            //       y: {
            //         display: false,
            //       },
            //     },
            //     elements: {
            //       line: {
            //         borderWidth: 2,
            //         tension: 0.4,
            //       },
            //       point: {
            //         radius: 0,
            //         hitRadius: 10,
            //         hoverRadius: 4,
            //       },
            //     },
            //   }}
            // />
          }
        />
      </CCol>
      <CCol sm={6} lg={3} style={mystyle}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={
            <>
              0.15{' '}
              <span className="fs-6 fw-normal">
                (-30% <CIcon icon={cilArrowBottom} />)
              </span>
            </>
          }
          title="ETO4"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Availability</CDropdownItem>
                <CDropdownItem>Quality</CDropdownItem>
                <CDropdownItem>Performance</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [
                  {
                    label: 'OEE',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-danger'),
                    data: [1, 18, 9, 17, 34, 22, 11],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: -9,
                    max: 39,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3} style={mystyle}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={
            <>
              0.15{' '}
              <span className="fs-6 fw-normal">
                (-30% <CIcon icon={cilArrowBottom} />)
              </span>
            </>
          }
          title="ETO5"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Availability</CDropdownItem>
                <CDropdownItem>Quality</CDropdownItem>
                <CDropdownItem>Performance</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [
                  {
                    label: 'OEE',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-danger'),
                    data: [1, 18, 9, 17, 34, 22, 11],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: -9,
                    max: 39,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
