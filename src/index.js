import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { currentUser } from './store/reducers.js'
import C from './constants'
import appReducer from './store/reducers'
import { createStore } from 'redux'
import storeFactory from './store'
import { setcurrentuser, setSearchResults, setCityData } from './actions'
import { Provider } from 'react-redux'

const initialState = (localStorage['redux-store'])? JSON.parse(localStorage['redux-store']) : {}
const store = storeFactory(initialState)
window.React = React
window.store = store

ReactDOM.render(
  <Provider store={store}>
  <App/>
  </Provider>, document.getElementById('root')
);
registerServiceWorker();

const saveState = () => {
    const state = JSON.stringify(store.getState())
    localStorage['redux-store'] = state
 }
 store.subscribe(saveState)