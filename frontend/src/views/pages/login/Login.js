import React, { useState, useEffect } from 'react'
import { login, checkAuthenticated, load_user } from './../../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import sasollogo from '../../../assets/images/sasollogo-cropped-v2.png'
import yeticon from '../../../assets/images/yet-login.png'
import usflag from '../../../assets/images/us-flag-color.jpg'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const loginFailed = useSelector((state) => state.auth.loginFailed)

  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const { username, password } = formData

  const onChange = (e) => {
    setError(false)
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(login(username, password))
    }
  }

  useEffect(() => {
    dispatch(checkAuthenticated())
  }, [])

  useEffect(() => {
    if (loginFailed) {
      setError(true)
      setFormData({
        username: '',
        password: '',
      })
    }
  }, [loginFailed])

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  const container_style = {
    width: '100%',
  }
  const left = {
    position: 'absolute',
    left: '0',
    top: '0',
    bottom: '0',
    width: '40%',
    backgroundColor: 'rgba(44, 56, 74, 0.95)',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
  }
  const right = {
    position: 'absolute',
    left: '40%',
    top: '0',
    bottom: '0',
    width: '60%',
    backgroundColor: 'white',
  }

  const text = {
    paddingLeft: '1.75rem',
    textAlign: 'center',
  }
  const icon_div_style = {
    textAlign: 'center',
  }

  return (
    <>
      <div style={left}>
        <CCol>
          <div style={text}>
            <img style={{ height: '100px' }} src={sasollogo}></img>
            <h1>Alkylates</h1>
            <p>Welcome to the SASOL Advanced Alkylates Economics Tool Login Page</p>
          </div>
        </CCol>
      </div>
      <div style={right}></div>
      <img
        style={{
          position: 'absolute',
          height: '110px',
          backgroundColor: 'rgba(44, 56, 74, 0.95)',
          border: 'solid',
          borderWidth: '0.7rem',
          borderColor: 'white',
          borderRadius: '5rem',
          marginBottom: '1.25rem',
          marginTop: '1rem',
          left: '37.5%',
          top: '45%',
        }}
        src={yeticon}
      ></img>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <CCol md={6}>
                <CCardGroup>
                  <CCard className="p-5" style={{ borderColor: 'white' }}>
                    <CCardBody>
                      <CForm>
                        <h1 style={{ textAlign: 'center', marginBottom: '5px' }}>Login</h1>
                        <p
                          className="text-medium-emphasis"
                          style={{ textAlign: 'center', marginBottom: '10px' }}
                        >
                          Sign In to your account
                        </p>
                        {error && (
                          <div className="alert alert-danger">
                            {' '}
                            Your username and password did not match. Please try again.{' '}
                          </div>
                        )}
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            name="username"
                            placeholder="Username"
                            autoComplete="username"
                            onChange={onChange}
                            onKeyDown={handleKeyDown}
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            type="password"
                            placeholder="Password"
                            name="password"
                            autoComplete="current-password"
                            onChange={onChange}
                            onKeyDown={handleKeyDown}
                          />
                        </CInputGroup>
                        <CRow>
                          <CCol xs={6}>
                            <CButton
                              style={{
                                backgroundColor: 'rgba(44, 56, 74, 0.95)',
                                borderColor: 'rgba(44, 56, 74, 0.95)',
                              }}
                              className="px-4"
                              onClick={onSubmit}
                            >
                              Login
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </div>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Login
