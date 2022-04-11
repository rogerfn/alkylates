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
                                LAB NB &amp; Cost per Volume
                            </CCardTitle>
                        </CCol>
                    </div>
                </CRow>

            </div>
        </>
    )
}
export default WelcomePage