import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './store'

if (process.env.REACT_APP_MODE === 'production') {
  window.API_URL = 'https://yet-us-api.chemicals-digital.sasol.com'
} else if (process.env.REACT_APP_MODE === 'testing') {
  window.API_URL = 'https://yet-us-api-test.chemicals-digital.sasol.com'
} else {
  window.API_URL = 'http://127.0.0.1:8000'
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
