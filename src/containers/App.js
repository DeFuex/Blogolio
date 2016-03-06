import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Parse from 'parse';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux'
import NavBar from '../components/NavBar';
import Home from '../components/Home';
import About from '../components/About';
import Projects from '../components/Projects';
import ProjectView from '../components/ProjectView';
import Contact from '../components/Contact';
import Admin from '../components/Admin';
import Example from '../components/Example';

import bootstrap from 'bootstrap';

import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap-social/bootstrap-social.css';
import '../../node_modules/bootstrap-social/node_modules/font-awesome/fonts/fontawesome-webfont.woff2';
import '../../node_modules/bootstrap-social/node_modules/font-awesome/css/font-awesome.css';

export default class App extends Component {
	render(){
		return(
			<div>
				<Router history={browserHistory}>
					<Route path="/" component={NavBar}>
						<IndexRoute component={Home} />
						<Route path="about" component={About} />
						<Route path="projects" component={Projects} />
						<Route path="projects/:id" component={ProjectView} />
						<Route path="contact" component={Contact} />
						<Route path="admin" component={Admin} />
						<Route path="Example" component={Example} />
					</Route>
				</Router>
			</div>
		);
	}
}
