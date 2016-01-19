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