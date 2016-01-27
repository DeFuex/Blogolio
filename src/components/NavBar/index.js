import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Header from '../Header';
import SideBar from '../SideBar';
import Footer from '../Footer';
// import './animation.css';
// import css from 'css!./animation.css';

export default class NavBar extends Component {
  	render() {
		return (
			<div>
			<Header />
				<div className="blog-masthead">
					<div className="container">
						<nav className="nav">
							<ul>
								<li><IndexLink className="blog-nav-item transition" to="/">Home</IndexLink></li>
								<li><Link className="blog-nav-item transition" to="/about">About</Link></li>
								<li><Link className="blog-nav-item transition" to="/projects">Projects</Link></li>        	  
								<li><Link className="blog-nav-item transition" to="/contact">Contact</Link></li>
								<li><Link className="blog-nav-item transition" to="/admin">Admin</Link></li>
							</ul>
						</nav>
					</div>
				</div>
				{ /*this.props.children renders every View underneath the Links navigation bar defined inside the top <div> of the App class.*/ }
				<div id="blog-home" className="container">
					<div id="blog-row" className="row">
						<div id="blog-container" className="col-sm-7 blog-main">
							
						<ReactCSSTransitionGroup
							component="div"
							transitionName="example"
							transitionAppear={true}

							>
								{ React.cloneElement(this.props.children, {
									key: this.props.location.pathname
								})}
							</ReactCSSTransitionGroup>					
						</div>
						<SideBar />
					</div>
				</div>
			<Footer />
			</div>
		)
	}
}