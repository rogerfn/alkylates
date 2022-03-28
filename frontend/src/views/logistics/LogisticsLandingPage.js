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
                Welcome to the YET US Digital Platform
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
        {/* <div
          style={{
            position: 'relative',
            height: '400px',
            width: '100%',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'middle',
          }}
        >
          <ReactCardCarousel autoplay={true} autoplay_speed={5000} spread={'wide'}>
            <div
              style={{
                height: '300px',
                width: '300px',
                textAlign: 'center',
                background: 'linear-gradient(to right, #141e30, #243b55)',
                color: '#FFF',
                fontFamily: 'sans-serif',
                fontSize: '12px',
                textTransform: 'uppercase',
                borderRadius: '10px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CButton color="transparent" href="#/logistics">
                <div
                  style={{
                    backdropFilter: 'blur( 4px )',
                    borderRadius: '0.75rem',
                    color: 'white',
                    padding: '0.5rem',
                    fontSize: '20px',
                    fontWeight: 'bolder',
                    width: '145px',
                    textAlign: 'center',
                  }}
                >
                  Logistics
                </div>
                <img
                  style={{
                    height: '145px',
                  }}
                  src={trucking}
                ></img>
              </CButton>
            </div>
            <div
              style={{
                height: '300px',
                width: '300px',
                textAlign: 'center',
                background: 'linear-gradient(to right, #141e30, #243b55)',
                color: '#FFF',
                fontFamily: 'sans-serif',
                fontSize: '12px',
                textTransform: 'uppercase',
                borderRadius: '10px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CButton color="transparent" href="#/production">
                <div
                  style={{
                    backdropFilter: 'blur( 4px )',
                    borderRadius: '0.75rem',
                    color: 'white',
                    padding: '0.5rem',
                    fontSize: '20px',
                    fontWeight: 'bolder',
                    width: '145px',
                    textAlign: 'center',
                  }}
                >
                  Production
                </div>
                <img
                  style={{
                    height: '145px',
                  }}
                  src={savage}
                ></img>
              </CButton>
            </div>
            <div
              style={{
                height: '300px',
                width: '300px',
                textAlign: 'center',
                background: 'linear-gradient(to right, #141e30, #243b55)',
                color: '#FFF',
                fontFamily: 'sans-serif',
                fontSize: '12px',
                textTransform: 'uppercase',
                borderRadius: '10px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CButton color="transparent" href="#/inputs">
                <div
                  style={{
                    backdropFilter: 'blur( 4px )',
                    borderRadius: '0.75rem',
                    color: 'white',
                    padding: '0.5rem',
                    fontSize: '20px',
                    fontWeight: 'bolder',
                    width: '145px',
                    textAlign: 'center',
                  }}
                >
                  Inputs
                </div>
                <img
                  style={{
                    height: '145px',
                  }}
                  src={kpi}
                ></img>
              </CButton>
            </div> */}
        {/* <div
              style={{
                height: '300px',
                width: '300px',
                textAlign: 'center',
                background: 'linear-gradient(to right, #141e30, #243b55)',
                color: '#FFF',
                fontFamily: 'sans-serif',
                fontSize: '12px',
                textTransform: 'uppercase',
                borderRadius: '10px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  backdropFilter: 'blur( 4px )',
                  borderRadius: '0.75rem',
                  color: 'white',
                  padding: '0.5rem',
                  fontSize: '20px',
                  fontWeight: 'bolder',
                  width: '145px',
                  textAlign: 'center',
                }}
              >
                Placeholder
              </div>
              <img
                style={{
                  height: '145px',
                }}
                src={trucking}
              ></img>
            </div> */}
        {/* <div
              style={{
                height: '300px',
                width: '300px',
                textAlign: 'center',
                background: 'linear-gradient(to right, #141e30, #243b55)',
                color: '#FFF',
                fontFamily: 'sans-serif',
                fontSize: '12px',
                textTransform: 'uppercase',
                borderRadius: '10px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  backdropFilter: 'blur( 4px )',
                  borderRadius: '0.75rem',
                  color: 'white',
                  padding: '0.5rem',
                  fontSize: '20px',
                  fontWeight: 'bolder',
                  width: '145px',
                  textAlign: 'center',
                }}
              >
                Placeholder
              </div>
              <img
                style={{
                  height: '145px',
                }}
                src={kpi}
              ></img>
            </div> */}
        {/* </ReactCardCarousel>
        </div> */}
        <CRow>
          <div style={{ marginTop: '2rem', marginBottom: '2rem', display: 'flex' }}>
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
                    src={trucking}
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
                  Logistics
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
                    src={savage}
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
                  Production
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
                  User Inputs
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
