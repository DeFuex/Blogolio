import React, { Component } from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import { Link } from 'react-router';
import { Project } from '../../utils/Parse/project.js';
import './projects.css';

var ParseComponent = ParseReact.Component(React);

//Connection to the Parse Database Webserver.
Parse.initialize("EvmOpxAGXkDDS9IOETIptyHZAJDn3Ax7Af3v7VQQ", "doRuBShVrZ9hP6d5lHYWd00SYvxmHVnIBBwm7OxI");

export default class Projects extends ParseComponent { //extends Component {

	constructor() {
		super();
		//Initialize SomeComponent
		//do stuff
	}

	observe(props, state){
		return{
			projects: (new Parse.Query(Project).descending('createdAt'))
		};
	}

	render(){
		return(
			<div className="contact-content">
					<div className="row">
					{
						console.log(this),

	  					this.data.projects.map(function(p) {

	  						var imgSource;

	  						if (p.title === "Project Tire(d)") {
	  							imgSource = "src/assets/tired.jpg";
	  						} else {
	  							imgSource = "src/assets/not_available.jpeg";
	  						}

	  						return (
	        					<div className="col-lg-12" key={"project-post-" + p.title}>
									<h2 className="page-header" ><Link to={'/projects/' + p.objectId}>{p.title}</Link></h2>
	          						<div className="col-lg-3 col-md-4 col-xs-6 thumb">
		              					<Link className="thumbnail" to={'/projects/' + p.objectId }>
		              						<img className="img-responsive" src={imgSource} alt="no image" />
		              					</Link>
	          						</div>
	  		    					<p>{p.summary}</p>
	        					</div>
        					);
        				})
	  				}
					</div>
			</div>
		);
	}
}

{ /* <div className="row">
{
	<div className="col-lg-12">
		<h2 className="page-header">Project Tire(d)</h2>
			<div className="col-lg-3 col-md-4 col-xs-6 thumb">
			 <a href="ProjectTired.html">
				<Link className="thumbnail">
				<img className="img-responsive" src="src/assets/tired.jpg"  alt="no image available!" />
				</Link>
			</a>
			</div>
			<p>Development of an Engine with basic implementations to control a virtual 3D Tire. C++ and OpenGL were used in this project.</p>
	</div>
	}
</div> */
}
{ /*	Parse Projects component call:

					<div className="row">
					{
						console.log(this.data),

	  					this.data.projects.map(function(p) {

							var img = p.image;

		  					console.log(img);

		  					// var urlstring;

         //    				var imageURLs = [];
         //    				for (var i = 0; i < p.length; i++) {
         //    					var object = p[i];
         //    					imageURLs.push(object.get('image').url());
         //    					console.log(imageURLs[0]);
         //    				}

            				// urlstring = imageURLs[0];
            				// console.log(urlstring);

	  						return (
	        					<div className="col-lg-12" key={"project-post-" + p.title}>
									<h2 className="page-header" ><Link to={'/project/' + p.objectId}>{p.title}</Link></h2>
	          						<div className="col-lg-3 col-md-4 col-xs-6 thumb">
		              					<Link className="thumbnail" to={'/project/' + p.objectId }>
		                					<img className="img-responsive" src={ img }   alt="" />
		              					</Link>
	          						</div>
	  		    					<p>{p.summary}</p>
	        					</div>
        					);
        				})
	  				}
					</div>
*/ }
