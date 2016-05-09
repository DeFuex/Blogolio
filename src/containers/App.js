import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
// import AsyncProps from 'async-props';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux'
import NavBar from '../components/NavBar';
import Home from '../components/Home';
import ReactTutPart1 from '../components/Blogs/BlogReactTutorial/PartOne';
import About from '../components/About';
import Projects from '../components/Projects';
import Tired from '../components/Projects/Tired';
//import Dinger from '../components/Projects/Dinger';
import BackOffice from '../components/Projects/BackOffice';
import SWEChan from '../components/Projects/SWEChan';
import Contact from '../components/Contact';
import Admin from '../components/Admin';
import Example from '../components/Example';

import configureStore from '../store/configureStore';
const store = configureStore();

//use the bootstrap imports for development only, else do comment them out!
// import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import '../../node_modules/bootstrap-social/bootstrap-social.css';
import '../../node_modules/bootstrap-social/assets/fonts/fontawesome-webfont.woff2';
import '../../node_modules/bootstrap-social/assets/css/font-awesome.css';

const NotFound = () => <h4>Not Found :( </h4>;

export const routes = (
	//<Provider store={store}>
	<Route path='/Blogolio' title='App' component={NavBar}>
		<IndexRoute component={Home} />
		<Route path='reactTutPart1' title='App - React Tutorial Chapter 1' component={ReactTutPart1} />
		<Route path='about' title='App - About' component={About} />
		<Route path='projects' title='App - Projects' component={Projects} />
		<Route path='projects/projectTired' title='App - Projects - Tired' component={Tired} />
		<Route path='projects/backOffice' title='App - Projects - BackOffice' component={BackOffice} />
		<Route path='projects/sweChan' title='App - Projects - SWEChan' component={SWEChan} />
		<Route path='contact' title='App - Contact' component={Contact} />
		<Route path='*' title='404: Not Found' component={NotFound} />
	</Route>
	//</Provider>
);

export default routes;
