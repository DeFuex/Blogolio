import React, { Component } from 'react';
import '../projects.css';

export default class BackOffice extends Component {

	  constructor() {
		  super();
	  }

	render(){
		return(
			<div className="col-sm-7 blog-main">
						<div className="contact-content" >
								<div className="blog-post">
									<h2 className="page-header">BackOffice</h2>
									<div >The project is structured within MVC defined standards using Entities with Domain in code first principle, a Business Logic, Data Access Layer and simple unit testing. I used following libraries and frameworks for technical implementations:
										<ul>
										<li>.Net 4</li>
										</ul>
										<p>Github Source Code <a target="_blank" href="https://github.com/DeFuex/BackOffice">here</a>.</p>
									</div>
									<p className="blog-post-meta">At Thu Apr 21 2016 by Timo Obereder</p>
								</div>
						</div>
			</div>
					);
	}
}
