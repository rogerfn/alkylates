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
import {blue} from "@mui/material/colors";
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
              <CCardTitle style={{ fontSize: '3em', color: 'rgb(1, 58, 99)' }}>
                SASOL Alkylates Overview TBC
              </CCardTitle>
            </CCol>
          </div>
        </CRow>
          <div style={{ marginTop: '1rem', marginBottom: '1rem' ,width: '40%', border: '1px', float: 'left', background: 'blueviolet' }}>
              <CCardTitle style={{ fontSize: '2em', color: 'rgb(1, 58, 99)' }}>
                  Commodities
              </CCardTitle>
              <div>
                  <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'left', width: '50%' }}>
                      <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                          Normal Parrafin (nP)
                      </CCardTitle>
                  </div>
                  <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'right', width: '50%'  }}>
                      <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                          TBC
                      </CCardTitle>
                  </div>
              </div>
              <div>
                  <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'left', width: '50%'  }}>
                      <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                         TBC
                      </CCardTitle>
                  </div>
                  <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'right', width: '50%'  }}>
                      <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                          TBC
                      </CCardTitle>
                  </div>
              </div>
              <div>
                  <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'left', width: '50%'  }}>
                      <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                          TBC
                      </CCardTitle>
                  </div>
                  <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'right', width: '50%'  }}>
                      <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                          TBC
                      </CCardTitle>
                  </div>
              </div>
              <div>
                  <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'left', width: '50%'  }}>
                      <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                          TBC
                      </CCardTitle>
                  </div>
                  <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'right', width: '50%'  }}>
                      <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                          TBC
                      </CCardTitle>
                  </div>
              </div>
          </div>
          <div style={{ marginTop: '1rem', marginBottom: '1rem' , marginLeft: '1rem', width: '50%', border: '1px', float: 'right', background: 'blueviolet' }}>
              <CCardTitle style={{ fontSize: '2em', color: 'rgb(1, 58, 99)' }}>
                  Economic Model Inputs
              </CCardTitle>
              <div>
                  <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'left', width: '30%'  }}>
                      <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                          Product Specification
                      </CCardTitle>
                      <ul style={{ listStyle: 'none'}}>
                          <li><a href={'/'}>View</a> </li>
                          <li><a href={'/'}>Update</a></li>
                          <li><a href={'/'}>Export</a></li>
                      </ul>
                  </div>
                  <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'left', width: '30%'  }}>
                      <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                          Feedstock Consumption/Yield
                      </CCardTitle>
                      <ul style={{ listStyle: 'none'}}>
                          <li><a href={'/'}>View</a> </li>
                          <li><a href={'/'}>Update</a></li>
                          <li><a href={'/'}>Export</a></li>
                      </ul>
                  </div>
                  <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'right', width: '30%'  }}>
                      <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                          Lab Sales Forecast &amp; Price
                      </CCardTitle>
                      <ul style={{ listStyle: 'none'}}>
                          <li><a href={'/'}>View</a> </li>
                          <li><a href={'/'}>Update</a></li>
                          <li><a href={'/'}>Export</a></li>
                      </ul>
                  </div>
              </div>
              <div>
                  <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'left', width: '50%'  }}>
                      <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                          Feed Stock Quality
                      </CCardTitle>
                      <ul style={{ listStyle: 'none'}}>
                          <li><a href={'/'}>View</a> </li>
                          <li><a href={'/'}>Update</a></li>
                          <li><a href={'/'}>Export</a></li>
                      </ul>
                  </div>
                  <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'right', width: '50%'  }}>
                      <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                          Raw Material Price
                      </CCardTitle>
                      <ul style={{ listStyle: 'none'}}>
                          <li><a href={'/'}>View</a> </li>
                          <li><a href={'/'}>Update</a></li>
                          <li><a href={'/'}>Export</a></li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}
export default LogisticsLandingPage
