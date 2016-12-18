
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import Quagga from 'quagga'

import App from './containers/App'
import configure from './store'

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

Quagga.init({
  inputStream : {
    name : "Live",
    type : "LiveStream",
    target: document.querySelector('#barcode')    // Or '#yourElement' (optional)
  },
  decoder : {
    readers : ["ean_reader"]
  }
}, function(err) {
  if (err) {
    console.log(err);
    return
  }
  console.log("Initialization finished. Ready to start");
  Quagga.start();
});

Quagga.onDetected(function(data) {
  console.log(data.codeResult.code);
})