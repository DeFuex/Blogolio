// import React, { Component } from 'react';

// export default class App extends Component {
  // render() {
    // return (
      // <h1>Hello, world.</h1>
    // );
  // }
// }

// import React, { Component } from 'react';
// import { combineReducers } from 'redux';
// import { Provider } from 'react-redux';

// import { createStore, renderDevTools } from '../utils/devTools';
// import * as reducers from '../reducers';

// const reducer = combineReducers(reducers);
// const store = createStore(reducer);

// export default class App extends Component{
	// render() {
		// return (
			// <div>
				// <Provider store={store}>
				// {() => 'Hello World' }
				// </Provider>
				
				// {renderDevTools(store)}
			// </div>
		// );
	// }
// }

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from '../components/Counter'
import * as CounterActions from '../actions/counter'

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)