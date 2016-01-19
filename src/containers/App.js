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

import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux'
import NavBar from '../components/NavBar/navbar.js';
import Home from '../components/Home/home.js';
import About from '../components/About/about.js';
import Projects from '../components/Projects/projects.js';
import ProjectView from '../components/Contact/contact.js';
import Admin from '../components/Admin/login.js';

export default class App extends Component {
	render(){
		return(
			<div>
				<Router history={browserHistory}>
					<Route path="/" component={NavBar}>
						<IndexRoute component={Home} />
						<Route path="about" component={About} />	
						<Route path="projects" component={Projects} />
						<Route path="project/:id" component={ProjectView} />
						<Route path="contact" component={Contact} />
						<Route path="admin" component={Admin} />
					</Route>
				</Router>
			</div>
		);
	}
}



// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import Counter from '../components/Counter'
// import * as CounterActions from '../actions/counter'

// function mapStateToProps(state) {
//   return {
//     counter: state.counter
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(CounterActions, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Counter)