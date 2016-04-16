import React, { Component } from 'react';
import '../projects.css';

export default class SWEChan extends Component {

	  constructor() {
		  super();
		  //Initialize SomeComponent
		  //do stuff
	  }

	render(){
		return(
						<div className="contact-content" >
								<div className="blog-post">
									<h2 className="page-header">SWEChan</h2>
									<div >The project is structured within MVVM defined standards using Entities with Domain in code first principle, a Business Logic, Data Access Layer, Model Views, database versioning to switch between mockup database and live database. I used following libraries and frameworks for technical implementations:
<ul>
<li>.Net 5</li>
</ul></div>
									<p className="blog-post-meta">At Mon Dec 21 2015 by Timo Obereder</p>
								</div>
						</div>
					);
	}
}
