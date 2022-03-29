import React from 'react'
import { CCard, CCardBody, CCol, CRow, CButton } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

const UnitSummary = () => {
  const OEEData = [
    { data: 10, labels: 'January' },
    { data: 15, labels: 'February' },
    { data: 20, labels: 'March' },
    { data: 35, labels: 'April' },
    { data: 10, labels: 'May' },
    { data: 5, labels: 'June' },
    { data: 18, labels: 'July' },
  ]
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
  return (
    <CCardBody style={{ paddingTop: '0rem' }}>
      <fieldset style={fieldset}>
        <legend style={legend}>Unit Summary</legend>
        <div style={{ paddingLeft: '1em', display: 'flex', justifyContent: 'space-between' }}>
          <CRow>
            <CCol style={{ width: '100%', maxWidth: '20%' }}>
              <CCard
                className={'mb-3 border-top-5'}
                style={{
                  // backgroundColor: 'rgb(60, 75, 100)',
                  borderTopColor: 'rgb(105, 179, 76)',
                  boxShadow:
                    '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                  width: '95%',
                }}
              >
                <CCardBody>
                  <div>
                    <div style={{ paddingBottom: '0.75rem' }}>
                      <CRow>
                        <CCol style={{ fontWeight: 'bolder', fontSize: '18px' }}> ETO 1</CCol>
                        <CCol style={{ textAlign: 'end', color: 'rgb(105, 179, 76)' }}>
                          <CButton class={'btn-icon'} color="transparent" href="#/production/unit">
                            <CIcon
                              style={{ color: 'rgb(105, 179, 76)' }}
                              icon={icon.cilBellExclamation}
                              size="xl"
                            />
                          </CButton>
                        </CCol>
                      </CRow>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ maxHeight: '50px', minHeight: '50px' }}>
                        Unit Summary text placeholder
                      </div>
                      <CChartLine
                        className="mt-3 mx-3"
                        style={{ height: '70px' }}
                        data={{
                          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                          datasets: [
                            {
                              label: 'My First dataset',
                              backgroundColor: 'transparent',
                              borderColor: 'rgb(105, 179, 76)',
                              pointBackgroundColor: 'transparent',
                              data: [65, 59, 84, 84, 51, 55, 40],
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
                              min: 30,
                              max: 89,
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
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol style={{ width: '100%', maxWidth: '20%' }}>
              <CCard
                className={'mb-3 border-top-5'}
                style={{
                  // backgroundColor: 'rgb(60, 75, 100)',
                  borderTopColor: 'rgb(250, 183, 51)',
                  boxShadow:
                    '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                  width: '95%',
                }}
              >
                <CCardBody>
                  <div>
                    <div style={{ paddingBottom: '0.75rem' }}>
                      <CRow>
                        <CCol style={{ fontWeight: 'bolder', fontSize: '18px' }}> ETO 2</CCol>
                        <CCol style={{ textAlign: 'end', color: 'rgb(105, 179, 76)' }}>
                          <CButton class={'btn-icon'} color="transparent" href="#/production/unit">
                            <CIcon
                              style={{ color: 'rgb(250, 183, 51)' }}
                              icon={icon.cilBellExclamation}
                              size="xl"
                            />
                          </CButton>
                        </CCol>
                      </CRow>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ maxHeight: '50px', minHeight: '50px' }}>
                        Unit Summary text placeholder
                      </div>
                      <CChartLine
                        className="mt-3 mx-3"
                        style={{ height: '70px' }}
                        data={{
                          labels: OEEData.map((el) => el.labels),
                          datasets: [
                            {
                              label: 'OEE',
                              backgroundColor: 'transparent',
                              borderColor: 'rgb(250, 183, 51)',
                              pointBackgroundColor: 'transparent',
                              data: OEEData.map((el) => el.data),
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
                              min: Math.min(...OEEData.map((el) => el.data)) - 5,
                              max: Math.max(...OEEData.map((el) => el.data)) + 5,
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
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol style={{ width: '100%', maxWidth: '20%' }}>
              <CCard
                className={'mb-3 border-top-5'}
                style={{
                  // backgroundColor: 'rgb(60, 75, 100)',
                  borderTopColor: 'rgb(255, 78, 17)',
                  boxShadow:
                    '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                  width: '95%',
                }}
              >
                <CCardBody>
                  <div>
                    <div style={{ paddingBottom: '0.75rem' }}>
                      <CRow>
                        <CCol style={{ fontWeight: 'bolder', fontSize: '18px' }}> ETO 3</CCol>
                        <CCol style={{ textAlign: 'end', color: 'rgb(255, 78, 17)' }}>
                          <CButton class={'btn-icon'} color="transparent" href="#/production/unit">
                            <CIcon
                              style={{ color: 'rgb(255, 78, 17)' }}
                              icon={icon.cilBellExclamation}
                              size="xl"
                            />
                          </CButton>
                        </CCol>
                      </CRow>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ maxHeight: '50px', minHeight: '50px' }}>
                        Unit Summary text placeholder
                      </div>
                      <CChartLine
                        className="mt-3 mx-3"
                        style={{ height: '70px' }}
                        data={{
                          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                          datasets: [
                            {
                              label: 'My First dataset',
                              backgroundColor: 'transparent',
                              borderColor: 'rgb(255, 78, 17)',
                              pointBackgroundColor: 'transparent',
                              data: [65, 59, 84, 84, 51, 55, 40],
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
                              min: 30,
                              max: 89,
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
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol style={{ width: '100%', maxWidth: '20%' }}>
              <CCard
                className={'mb-3 border-top-5'}
                style={{
                  // backgroundColor: 'rgb(60, 75, 100)',
                  borderTopColor: 'rgb(105, 179, 76)',
                  boxShadow:
                    '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                  width: '95%',
                  opacity: '0.5',
                }}
              >
                <CCardBody>
                  <div>
                    <div style={{ paddingBottom: '0.75rem' }}>
                      <CRow>
                        <CCol style={{ fontWeight: 'bolder', fontSize: '18px' }}> ETO 4</CCol>
                        <CCol style={{ textAlign: 'end', color: 'rgb(105, 179, 76)' }}>
                          <CButton class={'btn-icon'} color="transparent" disabled>
                            <CIcon
                              style={{ color: 'rgb(105, 179, 76)' }}
                              icon={icon.cilBellExclamation}
                              size="xl"
                            />
                          </CButton>
                        </CCol>
                      </CRow>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ maxHeight: '50px', minHeight: '50px' }}>
                        Unit is currently available but not operational due to lack of demand.
                      </div>
                      <CChartLine
                        className="mt-3 mx-3"
                        style={{ height: '70px' }}
                        data={{
                          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                          datasets: [
                            {
                              label: 'My First dataset',
                              backgroundColor: 'transparent',
                              borderColor: 'rgb(105, 179, 76)',
                              pointBackgroundColor: 'transparent',
                              data: [65, 59, 84, 84, 51, 55, 40],
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
                              min: 30,
                              max: 89,
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
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol style={{ width: '100%', maxWidth: '20%' }}>
              <CCard
                className={'mb-3 border-top-5'}
                style={{
                  // backgroundColor: 'rgb(60, 75, 100)',
                  borderTopColor: 'rgb(105, 179, 76)',
                  boxShadow:
                    '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
                  width: '95%',
                }}
              >
                <CCardBody>
                  <div>
                    <div style={{ paddingBottom: '0.75rem' }}>
                      <CRow>
                        <CCol style={{ fontWeight: 'bolder', fontSize: '18px' }}> ETO 5</CCol>
                        <CCol style={{ textAlign: 'end', color: 'rgb(105, 179, 76)' }}>
                          <CButton class={'btn-icon'} color="transparent" href="#/production/unit">
                            <CIcon
                              style={{ color: 'rgb(105, 179, 76)' }}
                              icon={icon.cilBellExclamation}
                              size="xl"
                            />
                          </CButton>
                        </CCol>
                      </CRow>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ maxHeight: '50px', minHeight: '50px' }}>
                        Unit Summary text placeholder
                      </div>
                      <CChartLine
                        className="mt-3 mx-3"
                        style={{ height: '70px' }}
                        data={{
                          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                          datasets: [
                            {
                              label: 'My First dataset',
                              backgroundColor: 'transparent',
                              borderColor: 'rgb(105, 179, 76)',
                              pointBackgroundColor: 'transparent',
                              data: [65, 59, 84, 84, 51, 55, 40],
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
                              min: 30,
                              max: 89,
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
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </fieldset>
    </CCardBody>
  )
}
export default UnitSummary
