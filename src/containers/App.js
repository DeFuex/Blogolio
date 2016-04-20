import React, { Component } from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
// import AsyncProps from 'async-props';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux'
import NavBar from '../components/NavBar';
import Home from '../components/Home';
import About from '../components/About';
import Projects from '../components/Projects';
//import ProjectView from '../components/ProjectView';
import Tired from '../components/Projects/Tired';
import Dinger from '../components/Projects/Dinger';
import BackOffice from '../components/Projects/BackOffice';
import SWEChan from '../components/Projects/SWEChan';
import Contact from '../components/Contact';
import Admin from '../components/Admin';
import Example from '../components/Example';

import configureStore from '../store/configureStore';
const store = configureStore();
// window.jQuery = require("jquery");
// require('!!script!jquery/dist/jquery.min.js');
// import $ from "jquery";
// import bootstrap from 'bootstrap';

// import '../../node_modules/jquery/dist/jquery.js'

//import '../../src/js/tinymce.min.js';
// import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../../node_modules/bootstrap-social/bootstrap-social.css';
// import '../../node_modules/bootstrap-social/assets/fonts/fontawesome-webfont.woff2';
// import '../../node_modules/bootstrap-social/assets/css/font-awesome.css';

const NotFound = () => <h4>Not Found :( </h4>;

export const routes = (
	//<Provider store={store}>
	<Route path='/' title='App' component={NavBar}>
		<IndexRoute component={Home} />
		<Route path='about' title='App - About' component={About} />
		<Route path='projects' title='App - Projects' component={Projects} />
		<Route path='projects/projectTired' title='App - Projects - Tired' component={Tired} />
		<Route path='projects/backOffice' title='App - Projects - BackOffice' component={BackOffice} />
		<Route path='projects/sweChan' title='App - Projects - SWEChan' component={SWEChan} />
		<Route path='projects/projectDinger' title='App - Projects - Dinger' component={Dinger} />
		<Route path='contact' title='App - Contact' component={Contact} />
		<Route path='*' title='404: Not Found' component={NotFound} />
	</Route>
	//</Provider>
);

export default routes;

// export default class App extends Component {
// 	render(){
// 		// if (typeof document !== 'undefined') {
// 			return(
// 				<div>
// 					<Router
// 						render={ props => <AsyncProps {...props} /> }
// 						history={browserHistory} routes={routes}>
// 					</Router>
// 				</div>
// 			);
// 		// }
// 	}

	// componentDidMount() {
	// 	require('!!script!jquery/dist/jquery.min.js');
	// }
//}
