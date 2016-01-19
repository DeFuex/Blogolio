import React, { Component } from 'react';

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
							<div>{this.props.children}</div>
						</div>
						<SideBar />
					</div>
				</div>
			<Footer />
			</div>
		)
	}
}