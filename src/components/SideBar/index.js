import React, { Component } from 'react';
import './sidebar.css';

export default class SideBar extends Component {
	render() {
		return (
			<div id="sidebar-info" className="col-sm-3 col-sm-offset-1 blog-sidebar">
				<div className="widget sidebar-module sidebar-module-inset">
					<h2 className="widget-title">About Timo Obereder</h2>
					<div>
						<img className="me" src={require('../../assets/avatar.jpg')} alt="Avatar Icon" scale="0" />
						<div>
							<p><em>Hi! My name is Timo and i'm Software Developer with over 4 years of experience designing and developing mobile
							(mostly Android) applications. Follow me on Twitter </em><a target="_blank" href="https://twitter.com/defuex">here</a>.</p>
						</div>
					</div>
				</div>
				<div className="sidebar-module">
					<h4>Archives</h4>
					<ul className="list-unstyled">
						<li className="gray"><a href="#">March 2016</a></li>
						<li className="gray"><a href="#">February 2016</a></li>
						<li className="gray"><a href="#">January 2016</a></li>
						<li className="gray"><a href="#">December 2015</a></li>
						<li className="gray"><a href="#">November 2015</a></li>
					</ul>
				</div>
				<div className="sidebar-module">
					<h4>Elsewhere</h4>
					<ol className="list-unstyled">
						<li><a className="btn btn-social-icon btn-github" target="_blank" href="https://github.com/DeFuex"><span className="fa fa-github"></span></a></li>
						<li><a className="btn btn-social-icon btn-twitter" target="_blank" href="https://twitter.com/defuex"><span className="fa fa-twitter"></span></a></li>
						<li><a className="btn btn-social-icon btn-linkedin" target="_blank" href="https://at.linkedin.com/in/timo-obereder-11b65167"><span className="fa fa-linkedin"></span></a></li>
					</ol>
				</div>
			</div>
		)
	}
}
