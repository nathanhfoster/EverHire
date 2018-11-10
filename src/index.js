import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import storeFactory from './store'
import { Provider } from 'react-redux'

// Register service worker to control making site work offline

if('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/registerServiceWorker.js')
    .then(function() { console.log('Service Worker Registered') })
}

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

  try {
    localStorage.setItem('redux-store', state);
  } catch(e) {
    if (isQuotaExceeded(e)) {
      // Storage full, maybe notify user or do some clean-up
    }
  }
  
  function isQuotaExceeded(e) {
    var quotaExceeded = false;
    if (e) {
      if (e.code) {
        switch (e.code) {
          case 22:
            quotaExceeded = true;
            break;
          case 1014:
            // Firefox
            if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
              quotaExceeded = true;
            }
            break;
        }
      } else if (e.number === -2147024882) {
        // Internet Explorer 8
        quotaExceeded = true;
      }
    }
    return quotaExceeded;
  }
}
store.subscribe(saveState)