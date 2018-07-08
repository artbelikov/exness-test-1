import 'purecss/build/pure-min.css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import App from './App'
import reducers from './reducers'
import registerServiceWorker from './registerServiceWorker'

/**
 * Persist state in local storage
 */
const persistedState = localStorage.getItem('cartAppState') ? JSON.parse(localStorage.getItem('cartAppState')) : {}
const store = createStore(reducers, persistedState, composeWithDevTools(
  applyMiddleware(thunk)
))
store.subscribe(() => {
  localStorage.setItem('cartAppState', JSON.stringify(store.getState()))
})

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
