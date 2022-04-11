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


const WelcomePage = () => {
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
                <div style={{ marginTop: '1rem', marginBottom: '1rem' ,width: '40%', border: '1px', float: 'left'  }}>
                    <CCardTitle style={{ fontSize: '2em', color: 'rgb(1, 58, 99)' }}>
                        Commodities
                    </CCardTitle>
                    <div>
                        <div style={{ marginTop: '1rem', marginBottom: '1rem', marginRight: '2px', float: 'left',width: '46%', background: 'whitesmoke' }}>
                            <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                                <a href={'/#np'}>Normal Parrafin (nP)</a>
                            </CCardTitle>
                        </div>
                        <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'right',width: '46%', background: 'whitesmoke'  }}>
                            <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                                TBC
                            </CCardTitle>
                        </div>
                    </div>
                    <div>
                        <div style={{ marginTop: '1rem', marginBottom: '1rem', marginRight: '2px', float: 'left', width: '46%', background: 'whitesmoke'   }}>
                            <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                                TBC
                            </CCardTitle>
                        </div>
                        <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'right',width: '46%', background: 'whitesmoke'  }}>
                            <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                                TBC
                            </CCardTitle>
                        </div>
                    </div>
                    <div>
                        <div style={{ marginTop: '1rem', marginBottom: '1rem', marginRight: '2px', float: 'left',width: '46%', background: 'whitesmoke'  }}>
                            <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                                TBC
                            </CCardTitle>
                        </div>
                        <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'right',width: '46%', background: 'whitesmoke'  }}>
                            <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                                TBC
                            </CCardTitle>
                        </div>
                    </div>
                    <div>
                        <div style={{ marginTop: '1rem', marginBottom: '1rem', marginRight: '2px', float: 'left',width: '46%', background: 'whitesmoke'  }}>
                            <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                                TBC
                            </CCardTitle>
                        </div>
                        <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'right',width: '46%', background: 'whitesmoke'  }}>
                            <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)' }}>
                                TBC
                            </CCardTitle>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '1rem', marginBottom: '1rem' , marginLeft: '1rem', width: '55%', border: '1px', float: 'right' }}>
                    <CCardTitle style={{ fontSize: '2em', color: 'rgb(1, 58, 99)' }}>
                        Economic Model Inputs
                    </CCardTitle>
                    <div>
                        <div style={{ marginTop: '1rem', marginBottom: '1rem', marginRight: '3px', float: 'left', width: '33%', background: 'whitesmoke', gap: '2px'   }}>
                            <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)',  textAlign: 'center' }}>
                                Product Specification
                            </CCardTitle>
                            <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '2px'}}>
                                <li><a href={'/'}><CButton
                                    style={{
                                        backgroundColor: 'rgba(44, 56, 74, 0.95)',
                                        borderColor: 'rgba(44, 56, 74, 0.95)',
                                        fontSize: '0.75em'
                                    }} className="px-4">View</CButton></a>&nbsp; </li>
                                <li><a href={'/'}><CButton
                                    style={{
                                        backgroundColor: 'rgba(44, 56, 74, 0.95)',
                                        borderColor: 'rgba(44, 56, 74, 0.95)',
                                        fontSize: '0.75em'
                                    }} className="px-4">Update</CButton></a>&nbsp; </li>
                                <li><a href={'/'}><CButton
                                    style={{
                                        backgroundColor: 'rgba(44, 56, 74, 0.95)',
                                        borderColor: 'rgba(44, 56, 74, 0.95)',
                                        fontSize: '0.75em'
                                    }} className="px-4">Export</CButton></a>&nbsp; </li>
                            </ul>
                        </div>
                        <div style={{ marginTop: '1rem', marginBottom: '1rem',  marginRight: '3px', float: 'left', width: '33%', background: 'whitesmoke',  gap: '2px'  }}>
                            <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)',  textAlign: 'center' }}>
                                Feedstock Consumption / Yield
                            </CCardTitle>
                            <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '2px'}}>
                                <li><a href={'/#feed'}><CButton
                                    style={{
                                        backgroundColor: 'rgba(44, 56, 74, 0.95)',
                                        borderColor: 'rgba(44, 56, 74, 0.95)',
                                        fontSize: '0.75em'
                                    }} className="px-4">View</CButton></a>&nbsp; </li>
                                <li><a href={'/'}><CButton
                                    style={{
                                        backgroundColor: 'rgba(44, 56, 74, 0.95)',
                                        borderColor: 'rgba(44, 56, 74, 0.95)',
                                        fontSize: '0.75em'
                                    }} className="px-4">Update</CButton></a>&nbsp; </li>
                                <li><a href={'/'}><CButton
                                    style={{
                                        backgroundColor: 'rgba(44, 56, 74, 0.95)',
                                        borderColor: 'rgba(44, 56, 74, 0.95)',
                                        fontSize: '0.75em'
                                    }} className="px-4">Export</CButton></a>&nbsp; </li>
                            </ul>
                        </div>
                        <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'right', width: '33%', background: 'whitesmoke'   }}>
                            <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)',  textAlign: 'center' }}>
                                Lab Sales Forecast &amp; Price
                            </CCardTitle>
                            <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '2px'}}>
                                <li><a href={'/'}><CButton
                                    style={{
                                        backgroundColor: 'rgba(44, 56, 74, 0.95)',
                                        borderColor: 'rgba(44, 56, 74, 0.95)',
                                        fontSize: '0.75em'
                                    }} className="px-4">View</CButton></a>&nbsp; </li>
                                <li><a href={'/'}><CButton
                                    style={{
                                        backgroundColor: 'rgba(44, 56, 74, 0.95)',
                                        borderColor: 'rgba(44, 56, 74, 0.95)',
                                        fontSize: '0.75em'
                                    }} className="px-4">Update</CButton></a>&nbsp; </li>
                                <li><a href={'/'}><CButton
                                    style={{
                                        backgroundColor: 'rgba(44, 56, 74, 0.95)',
                                        borderColor: 'rgba(44, 56, 74, 0.95)',
                                        fontSize: '0.75em'
                                    }} className="px-4">Export</CButton></a>&nbsp; </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div style={{ marginTop: '1rem', marginBottom: '1rem', marginRight: '3px', float: 'left', width: '48%', background: 'whitesmoke'  }}>
                            <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)',  textAlign: 'center' }}>
                                Feed Stock Quality
                            </CCardTitle>
                            <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '2px'}}>
                                <li><a href={'/'}><CButton
                                    style={{
                                        backgroundColor: 'rgba(44, 56, 74, 0.95)',
                                        borderColor: 'rgba(44, 56, 74, 0.95)',
                                        fontSize: '0.75em'
                                    }} className="px-4">View</CButton></a>&nbsp; </li>
                                <li><a href={'/'}><CButton
                                    style={{
                                        backgroundColor: 'rgba(44, 56, 74, 0.95)',
                                        borderColor: 'rgba(44, 56, 74, 0.95)',
                                        fontSize: '0.75em'
                                    }} className="px-4">Update</CButton></a>&nbsp; </li>
                                <li><a href={'/'}><CButton
                                    style={{
                                        backgroundColor: 'rgba(44, 56, 74, 0.95)',
                                        borderColor: 'rgba(44, 56, 74, 0.95)',
                                        fontSize: '0.75em'
                                    }} className="px-4">Export</CButton></a>&nbsp; </li>
                            </ul>
                        </div>
                        <div style={{ marginTop: '1rem', marginBottom: '1rem', float: 'left',  gap: '2px', width: '48%', background: 'whitesmoke'  }}>
                            <CCardTitle style={{ fontSize: '1em', color: 'rgb(1, 58, 99)',  textAlign: 'center' }}>
                                Raw Material Price
                            </CCardTitle>
                            <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '2px'}}>
                                <li><a href={'/'}><CButton
                                    style={{
                                    backgroundColor: 'rgba(44, 56, 74, 0.95)',
                                    borderColor: 'rgba(44, 56, 74, 0.95)',
                                        fontSize: '0.75em'
                                }} className="px-4">View</CButton></a>&nbsp; </li>
                                <li><a href={'/'}><CButton
                                    style={{
                                        backgroundColor: 'rgba(44, 56, 74, 0.95)',
                                        borderColor: 'rgba(44, 56, 74, 0.95)',
                                        fontSize: '0.75em'
                                    }} className="px-4">Update</CButton></a>&nbsp; </li>
                                <li><a href={'/'}><CButton
                                    style={{
                                        backgroundColor: 'rgba(44, 56, 74, 0.95)',
                                        borderColor: 'rgba(44, 56, 74, 0.95)',
                                        fontSize: '0.75em'
                                    }} className="px-4">Export</CButton></a>&nbsp; </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default WelcomePage