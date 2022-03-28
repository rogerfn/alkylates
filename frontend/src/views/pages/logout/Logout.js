import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { logout } from './../../../actions/auth'

const Logout = () => {
  const dispatch = useDispatch()
  let history = useHistory()

  useEffect(() => {
    dispatch(logout())

    history.push('/')
  }, [])

  return null
}

export default Logout
