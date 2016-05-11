import React, { Component } from 'react';
import { Link } from 'react-router';
import './projects.css';

export default class Projects extends Component {

	constructor() {
		super();
	}

	render(){
		return(
			<div className="col-sm-7 blog-main">
			<div className="contact-content">
					<div className="row">
						{
							<div className="col-lg-12">
									<h2 className="page-header">Project Tire(d)</h2>
										<div className="col-lg-3 col-md-4 col-xs-6 thumb">
												<Link className="thumbnail" to="/Blogolio/projects/projectTired">
													<img className="img-responsive heighted" src={require('../../assets/tired.jpg')} alt="no image available!" />
												</Link>
										</div>
										<p className='text-size'>Development of an Engine with basic implementations to control a virtual 3D Tire. C++ and OpenGL were used in this project.</p>
										<Link className='gray' to="/Blogolio/projects/projectTired">
											<p className='text-size-link'>read more...</p>
										</Link>
										<br/>
										<br/>
							</div>
						}
						{
							<div className="col-lg-12">
									<h2 className="page-header">BackOffice</h2>
										<div className="col-lg-3 col-md-4 col-xs-6 thumb">
												<Link className="thumbnail" to="/Blogolio/projects/backOffice">
													<img className="img-responsive heighted" src={require('../../assets/not_available.jpeg')}  alt="no image available!" />
												</Link>
										</div>
										<p className='text-size'>Development of an MVC CMS application in C#.</p>
										<Link className='gray' to="/Blogolio/projects/backOffice">
											<p className='text-size-link'>read more...</p>
										</Link>
										<br/>
										<br/>
										<br/>
							</div>
						}
						{
							<div className="col-lg-12">
									<h2 className="page-header">SWEChan</h2>
										<div className="col-lg-3 col-md-4 col-xs-6 thumb">
												<Link className="thumbnail" to="/Blogolio/projects/sweChan">
													<img className="img-responsive heighted" src={require('../../assets/not_available.jpeg')}  alt="no image available!" />
												</Link>
										</div>
										<p className='text-size'>Development of a simple content board (similar to 4chan.org) using the MVVM pattern in C#.</p>
										<Link className='gray' to="/Blogolio/projects/sweChan">
											<p className='text-size-link'>read more...</p>
										</Link>
										<br/>
										<br/>
							</div>
						}
						{
							// <div className="col-lg-12">
							// 		<h2 className="page-header">Project Dinger</h2>
							// 			<div className="col-lg-3 col-md-4 col-xs-6 thumb">
							// 					<Link className="thumbnail" to="/Blogolio/projects/projectDinger">
							// 						<img className="img-responsive heighted" src={require('../../assets/not_available.jpeg')}  alt="no image available!" />
							// 					</Link>
							// 			</div>
							// 			<p>This Android application is a multi-protocol instant messenger application on Android devices, which should combine different messenger protocols and use them to send broadcast messages to a group of friends in those messenger systems. (Still under development)</p>
							// </div>
						}
					</div>
			</div>
			</div>
		);
	}
}
