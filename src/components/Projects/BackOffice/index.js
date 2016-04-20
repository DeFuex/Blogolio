import React, { Component } from 'react';
import '../projects.css';

export default class BackOffice extends Component {

	  constructor() {
		  super();
	  }

	render(){
		return(
						<div className="contact-content" >
								<div className="blog-post">
									<h2 className="page-header">BackOffice</h2>
									<div >The project is structured within MVC defined standards using Entities with Domain in code first principle, a Business Logic, Data Access Layer and simple unit testing. I used following libraries and frameworks for technical implementations:
<ul>
<li>.Net 4</li>
</ul></div>
									<p className="blog-post-meta">At Mon Dec 21 2015 by Timo Obereder</p>
								</div>
						</div>
					);
	}
}
