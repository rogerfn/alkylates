import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import sasollogo from '../assets/images/sasollogo-cropped-v2.png'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavLink,
  CNavItem,
  CRow,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAccountLogout, cilBell, cilEnvelopeOpen, cilList } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const mystylep = {
    marginTop: '0',
    paddingRight: '0.5em',
    paddingLeft: '0.5em',
    marginBottom: '0rem',
    color: 'white',
    fontSize: '1.5em',
  }
  const textdec = {
    textDecoration: 'none!important',
    marginLeft: '2em',
  }
  const navitemcol = {
    color: 'white',
    textDecoration: 'none',
  }
  const backcol = {
    background: 'rgba(44, 56, 74, 0.95)',
    padding: '0.25rem 0.25rem',
    minHeight: '3rem',
    fontFamily:
      'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  }
  const nav_sub = {
    padding: '0.25rem 0.25rem',
    minHeight: '3rem',
    fontFamily:
      'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  }

  const backcol_lighter = {
    background: '#636f83',
  }
  const icon_style = {
    marginLeft: '0em',
    marginRight: '0em',
  }
  return (
    <CRow>
      <CHeader style={backcol}>
        <CContainer fluid>
          <CButton
            color="transparent"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              lineHeight: '0',
              padding: '0',
            }}
            href="#/"
          >
            <CHeaderBrand style={(textdec, icon_style)} className="d-md-down-none" to="/">
              <img src={sasollogo} style={{ marginLeft: '0.5em', height: '35px' }}></img>
            </CHeaderBrand>
            <p style={mystylep} className="c-sidebar-brand-full">
              Alkylates
            </p>
          </CButton>
          <CHeaderNav className="d-none d-md-flex me-auto">
            <CNavItem>
              <CNavLink
                style={navitemcol}
                to="/production"
                component={NavLink}
                activeClassName="active"
              >
                Home
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                style={navitemcol}
                to="/logistics"
                component={NavLink}
                activeClassName="active"
              >
                Homolog
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                style={navitemcol}
                to="/inputs"
                component={NavLink}
                activeClassName="active"
              >
                Lab
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
          {/* <CHeaderNav>
            <CNavItem>
              <CNavLink href="#">
                <CIcon style={navitemcol} icon={cilBell} size="lg" />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">
                <CIcon style={navitemcol} icon={cilList} size="lg" />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">
                <CIcon style={navitemcol} icon={cilEnvelopeOpen} size="lg" />
              </CNavLink>
            </CNavItem>
          </CHeaderNav> */}
          <CHeaderNav className="ms-3">
            {/* <AppHeaderDropdown /> */}
            <CNavItem>
              <CNavLink href="#/logout">
                {/* <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    border: 'solid',
                    borderRadius: '6rem',
                    padding: '0.5rem',
                    borderWidth: '0.1rem',
                  }}
                >
                  <a>Logout</a> */}
                <CIcon style={navitemcol} icon={cilAccountLogout} size="lg" />
                {/* </div> */}
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
        </CContainer>
      </CHeader>
      <CHeader className="mb-4" style={nav_sub}>
        <CContainer fluid>
          <AppBreadcrumb />
        </CContainer>
      </CHeader>
    </CRow>
  )
}

export default AppHeader
