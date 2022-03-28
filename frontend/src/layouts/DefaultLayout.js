import React, { useEffect } from 'react'
import { AppContent, AppHeader } from '../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthenticated } from './../actions/auth'
import { Redirect } from 'react-router'

const DefaultLayout = () => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    dispatch(checkAuthenticated())
  }, [])

  if (!isAuthenticated) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
