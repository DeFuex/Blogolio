import React, { Component } from 'react';
import '../projects.css';

export default class SWEChan extends Component {

	  constructor() {
		  super();
	  }

	render(){
		return(
						<div className="contact-content" >
								<div className="blog-post">
									<h2 className="page-header">SWEChan</h2>
									<div >The project is structured within MVVM defined standards using Entities with Domain in code first principle, a Business Logic, Data Access Layer, Model Views, database versioning to switch between mockup database and live database. I used following libraries and frameworks for technical implementations:
										<ul>
										<li>.Net 5</li>
										</ul>
										<p>Github Source Code <a target="_blank" href="https://github.com/DeFuex/SWEChan">here</a>.</p>
									</div>
									<p className="blog-post-meta">At Thu Apr 21 2016 by Timo Obereder</p>
								</div>
						</div>
					);
	}
}
