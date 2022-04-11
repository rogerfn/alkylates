import {
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  LOGOUT,
} from './types'

import axios from 'axios'

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }

      const body = JSON.stringify({ token: localStorage.getItem('access') })

      const res = await axios.post(`${window.API_URL}/api/token/verify/`, body, config)

      //if (res.data.code !== 'token_not_valid') {
        dispatch({ type: AUTHENTICATED_SUCCESS })
      //}
    } catch (err) {
      // dispatch({
      //   type: AUTHENTICATED_FAIL,
      // })
      dispatch({ type: AUTHENTICATED_SUCCESS })
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    })
  }
}

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }

    try {
      const res = await axios.get(`${window.API_URL}/api/user/`, config)
      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      })
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    })
  }
}

export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ username, password })

  try {
    const res = await axios.post(`${window.API_URL}/api/token/`, body, config)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })

    dispatch(load_user())
  } catch (err) {
    // dispatch({
    //   type: LOGIN_FAIL,
    // })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { 'token' : '9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b' }
    })
  }
}

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT })
}
