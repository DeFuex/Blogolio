import React from 'react'
import { Router, browserHistory } from 'react-router'
import { render } from 'react-dom'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'

import routes from './containers/App.js'

const store = configureStore()

if (typeof document !== 'undefined') {
  render(
    <Provider store={store}>
  			<Router history={browserHistory} routes={routes} />
    </Provider>,
        document.getElementById('root')
  )
}

export * from './containers/App.js'
