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
