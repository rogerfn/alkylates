import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButton,
  CFormLabel,
  CFormCheck,
  CCardHeader,
  CCardTitle,
  CCardText,
} from '@coreui/react'
import Particles from 'react-tsparticles'
import ParticlesConfig from '../../components/particles/particlesconfig'
import trucking from '../../assets/images/Truck-Load-Icon.png'
import performance from '../../assets/images/performance.png'
import savage from '../../assets/images/savage-performance.png'
import kpi from '../../assets/images/kpi.png'
// import ReactCardCarousel from 'react-card-carousel'

const LogisticsLandingPage = () => {
  const icon_div_style = {
    textAlign: 'center',
  }
  return (
    <>
      <div
        style={{
          width: '100%',
          marginLeft: '0',
          left: '0',
        }}
      >
        {/* <Particles params={ParticlesConfig} style={{ position: 'absolute' }} /> */}
        <CRow>
          <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <CCol style={{ textAlign: 'center' }}>
              {/* <Typing speed={50}> */}
              <CCardTitle style={{ fontSize: '3em', color: 'rgb(1, 58, 99)' }}>
                Welcome to the Advanced Alkylates Platform
              </CCardTitle>
              {/* <CCardTitle
                  style={{ fontSize: '1.25em', color: 'rgb(1, 58, 99)', marginTop: '1rem' }}
                >
                  Navigate to your desired location below
                </CCardTitle>
                {/* <Typing.Reset count={10} delay={2000} /> */}
              {/* </Typing> */}
            </CCol>
          </div>
        </CRow>       
        <CRow>
          <div style={{ marginTop: '1rem', marginBottom: '1rem', display: 'flex' }}>
            <CCol
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CButton color="transparent" href="#/logistics">
                <div style={icon_div_style}>
                  <img
                    style={{
                      height: '145px',
                      backgroundColor: '#243b55',
                      marginBottom: '1.25rem',
                      marginTop: '1rem',
                      /* background: rgba( 255, 255, 255, 0.3 ); */
                      boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                      backdropFilter: 'blur( 4px )',
                      borderRadius: '10px',
                      border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    }}
                    src={kpi}
                  ></img>
                </div>
                <div
                  style={{
                    backgroundColor: '#243b55',
                    /* background: rgba( 255, 255, 255, 0.3 ); */
                    boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                    backdropFilter: 'blur( 4px )',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    color: 'white',
                    padding: '0.5rem',
                    fontSize: '16px',
                    fontWeight: 'bolder',
                    width: '145px',
                    textAlign: 'center',
                  }}
                >
                  Homolog Balance <br />
                  &nbsp;

                </div>
              </CButton>
            </CCol>
            <CCol
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CButton color="transparent" href="#/production">
                <div style={icon_div_style}>
                  <img
                    style={{
                      height: '145px',
                      backgroundColor: '#243b55',
                      /* background: rgba( 255, 255, 255, 0.3 ); */
                      boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                      backdropFilter: 'blur( 4px )',
                      borderRadius: '10px',
                      border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    }}
                    src={kpi}
                  ></img>
                </div>
                <div
                  style={{
                    backgroundColor: '#243b55',
                    marginBottom: '1.25rem',
                    marginTop: '1rem',
                    /* background: rgba( 255, 255, 255, 0.3 ); */
                    boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                    backdropFilter: 'blur( 4px )',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    color: 'white',
                    padding: '0.5rem',
                    fontSize: '16px',
                    fontWeight: 'bolder',
                    width: '145px',
                    textAlign: 'center',
                  }}
                >
                  LAB NB &amp; Cost Per Volume
                </div>
              </CButton>
            </CCol>
            <CCol
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CButton color="transparent" href="#/inputs">
                <div style={icon_div_style}>
                  <img
                    style={{
                      height: '145px',
                      backgroundColor: '#243b55',
                      /* background: rgba( 255, 255, 255, 0.3 ); */
                      boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                      backdropFilter: 'blur( 4px )',
                      borderRadius: '10px',
                      border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    }}
                    src={kpi}
                  ></img>
                </div>
                <div
                  style={{
                    backgroundColor: '#243b55',
                    marginBottom: '1.25rem',
                    marginTop: '1rem',
                    /* background: rgba( 255, 255, 255, 0.3 ); */
                    boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                    backdropFilter: 'blur( 4px )',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    color: 'white',
                    padding: '0.5rem',
                    fontSize: '16px',
                    fontWeight: 'bolder',
                    width: '145px',
                    textAlign: 'center',
                  }}
                >
                  Lab forecast Per Cost
                </div>
              </CButton>
            </CCol>
            <CCol
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CButton color="transparent" href="#/inputs">
                <div style={icon_div_style}>
                  <img
                    style={{
                      height: '145px',
                      backgroundColor: '#243b55',
                      /* background: rgba( 255, 255, 255, 0.3 ); */
                      boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                      backdropFilter: 'blur( 4px )',
                      borderRadius: '10px',
                      border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    }}
                    src={kpi}
                  ></img>
                </div>
                <div
                  style={{
                    backgroundColor: '#243b55',
                    marginBottom: '1.25rem',
                    marginTop: '1rem',
                    /* background: rgba( 255, 255, 255, 0.3 ); */
                    boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                    backdropFilter: 'blur( 4px )',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    color: 'white',
                    padding: '0.5rem',
                    fontSize: '16px',
                    fontWeight: 'bolder',
                    width: '145px',
                    textAlign: 'center',
                  }}
                >
                  LAB Forecast VC Per Source
                </div>
              </CButton>
            </CCol>
          </div>
        </CRow>
        <CRow>
          <div style={{ marginTop: '1rem', marginBottom: '1rem', display: 'flex' }}>
          <CCol
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CButton color="transparent" href="#/logistics">
                <div style={icon_div_style}>
                  <img
                    style={{
                      height: '145px',
                      backgroundColor: '#243b55',
                      marginBottom: '1.25rem',
                      marginTop: '1rem',
                      /* background: rgba( 255, 255, 255, 0.3 ); */
                      boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                      backdropFilter: 'blur( 4px )',
                      borderRadius: '10px',
                      border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    }}
                    src={kpi}
                  ></img>
                </div>
                <div
                  style={{
                    backgroundColor: '#243b55',
                    /* background: rgba( 255, 255, 255, 0.3 ); */
                    boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                    backdropFilter: 'blur( 4px )',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    color: 'white',
                    padding: '0.5rem',
                    fontSize: '16px',
                    fontWeight: 'bolder',
                    width: '145px',
                    textAlign: 'center',
                  }}
                >
                 Sales Forcast Volume <br />
                 View  <br />
                 Update <br />
                </div>
              </CButton>
            </CCol>
            <CCol
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CButton color="transparent" href="#/production">
                <div style={icon_div_style}>
                  <img
                    style={{
                      height: '145px',
                      backgroundColor: '#243b55',
                      /* background: rgba( 255, 255, 255, 0.3 ); */
                      boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                      backdropFilter: 'blur( 4px )',
                      borderRadius: '10px',
                      border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    }}
                    src={kpi}
                  ></img>
                </div>
                <div
                  style={{
                    backgroundColor: '#243b55',
                    marginBottom: '1.25rem',
                    marginTop: '1rem',
                    /* background: rgba( 255, 255, 255, 0.3 ); */
                    boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                    backdropFilter: 'blur( 4px )',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    color: 'white',
                    padding: '0.5rem',
                    fontSize: '16px',
                    fontWeight: 'bolder',
                    width: '145px',
                    textAlign: 'center',
                  }}
                >
                 Sales LAB F/Cast Price <br />
                 View <br />
                 Update
                </div>
              </CButton>
            </CCol>
            <CCol
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CButton color="transparent" href="#/inputs">
                <div style={icon_div_style}>
                  <img
                    style={{
                      height: '145px',
                      backgroundColor: '#243b55',
                      /* background: rgba( 255, 255, 255, 0.3 ); */
                      boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                      backdropFilter: 'blur( 4px )',
                      borderRadius: '10px',
                      border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    }}
                    src={kpi}
                  ></img>
                </div>
                <div
                  style={{
                    backgroundColor: '#243b55',
                    marginBottom: '1.25rem',
                    marginTop: '1rem',
                    /* background: rgba( 255, 255, 255, 0.3 ); */
                    boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                    backdropFilter: 'blur( 4px )',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    color: 'white',
                    padding: '0.5rem',
                    fontSize: '16px',
                    fontWeight: 'bolder',
                    width: '145px',
                    textAlign: 'center',
                  }}
                >
                  RM Pricing Assumptions <br />
                  View <br />
                  Update 
                </div>
              </CButton>
            </CCol>
            <CCol
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CButton color="transparent" href="#/inputs">
                <div style={icon_div_style}>
                  <img
                    style={{
                      height: '145px',
                      backgroundColor: '#243b55',
                      /* background: rgba( 255, 255, 255, 0.3 ); */
                      boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                      backdropFilter: 'blur( 4px )',
                      borderRadius: '10px',
                      border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    }}
                    src={kpi}
                  ></img>
                </div>
                <div
                  style={{
                    backgroundColor: '#243b55',
                    marginBottom: '1.25rem',
                    marginTop: '1rem',
                    /* background: rgba( 255, 255, 255, 0.3 ); */
                    boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                    backdropFilter: 'blur( 4px )',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    color: 'white',
                    padding: '0.5rem',
                    fontSize: '16px',
                    fontWeight: 'bolder',
                    width: '145px',
                    textAlign: 'center',
                  }}
                >
                  Source Inputs Vol &amp; Price <br />
                  View <br />
                  Update 
                </div>
              </CButton>
            </CCol>
            <CCol
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CButton color="transparent" href="#/inputs">
                <div style={icon_div_style}>
                  <img
                    style={{
                      height: '145px',
                      backgroundColor: '#243b55',
                      /* background: rgba( 255, 255, 255, 0.3 ); */
                      boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                      backdropFilter: 'blur( 4px )',
                      borderRadius: '10px',
                      border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    }}
                    src={kpi}
                  ></img>
                </div>
                <div
                  style={{
                    backgroundColor: '#243b55',
                    marginBottom: '1.25rem',
                    marginTop: '1rem',
                    /* background: rgba( 255, 255, 255, 0.3 ); */
                    boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                    backdropFilter: 'blur( 4px )',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    color: 'white',
                    padding: '0.5rem',
                    fontSize: '16px',
                    fontWeight: 'bolder',
                    width: '145px',
                    textAlign: 'center',
                  }}
                >
                  Database Feed <br />
                  View <br />
                  Update <br />

                </div>
              </CButton>
            </CCol>
            <CCol
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CButton color="transparent" href="#/inputs">
                <div style={icon_div_style}>
                  <img
                    style={{
                      height: '145px',
                      backgroundColor: '#243b55',
                      /* background: rgba( 255, 255, 255, 0.3 ); */
                      boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                      backdropFilter: 'blur( 4px )',
                      borderRadius: '10px',
                      border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    }}
                    src={kpi}
                  ></img>
                </div>
                <div
                  style={{
                    backgroundColor: '#243b55',
                    marginBottom: '1.25rem',
                    marginTop: '1rem',
                    /* background: rgba( 255, 255, 255, 0.3 ); */
                    boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                    backdropFilter: 'blur( 4px )',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    color: 'white',
                    padding: '0.5rem',
                    fontSize: '16px',
                    fontWeight: 'bolder',
                    width: '145px',
                    textAlign: 'center',
                  }}
                >
                  Database FP Spec <br />
                  View <br />
                  Update <br />

                </div>
              </CButton>
            </CCol>
            <CCol
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CButton color="transparent" href="#/inputs">
                <div style={icon_div_style}>
                  <img
                    style={{
                      height: '145px',
                      backgroundColor: '#243b55',
                      /* background: rgba( 255, 255, 255, 0.3 ); */
                      boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                      backdropFilter: 'blur( 4px )',
                      borderRadius: '10px',
                      border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    }}
                    src={kpi}
                  ></img>
                </div>
                <div
                  style={{
                    backgroundColor: '#243b55',
                    marginBottom: '1.25rem',
                    marginTop: '1rem',
                    /* background: rgba( 255, 255, 255, 0.3 ); */
                    boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
                    backdropFilter: 'blur( 4px )',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    color: 'white',
                    padding: '0.5rem',
                    fontSize: '16px',
                    fontWeight: 'bolder',
                    width: '145px',
                    textAlign: 'center',
                  }}
                >
                  Planning Inputs <br />
                  View <br />
                  Update <br />

                </div>
              </CButton>
            </CCol>
          </div>
        </CRow>
      </div>
    </>
  )
}
export default LogisticsLandingPage
