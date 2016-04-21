import React, { Component } from 'react';
import '../projects.css';

export default class Dinger extends Component {

	  constructor() {
		  super();
	  }

	render(){
		return(
						<div className="contact-content" >
								<div className="blog-post">
									<h2 className="page-header">Project Dinger</h2>
									<div>Similar to Trillian the purpose lies on certain features and mainly on a combined user handling and a uniform UI design for such application types. This app is being programmed for minSDKVersion 16 and targetSDKVersion 21 on smartphones. OAuth 2.0 or OpenID Connect should be used for login, authorization and authentication processes.<br />Until now, i used following libraries and frameworks for technical implementations:
										<ul>
										<li>CircleImageView</li>
										<li>Butter Knife</li>
										<li>Retrofit</li>
										<li>Gson</li>
										<li>Universal Image Loader</li>
										<li>ORMLite</li>
										</ul>
										<p>Github Source Code <a target="_blank" href="https://github.com/DeFuex/Tire-D-">here</a>.</p>
									</div>
									<p className="blog-post-meta">At Thu Apr 21 2016 by Timo Obereder</p>
								</div>
						</div>
					);
	}
}
