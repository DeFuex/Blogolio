import React from 'react'
import { Router, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import routes from './containers/App.js'

const store = configureStore()

if (typeof document !== 'undefined') {
  render(
  			<Router history={browserHistory} routes={routes} />,
        document.getElementById('root')
  )
}

export * from './containers/App.js'
