// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './containers/App';

// ReactDOM.render(<App />, document.getElementById('root'));

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)