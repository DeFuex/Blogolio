import React, { Component } from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import { Link } from 'react-router';

var ParseComponent = ParseReact.Component(React);

export default class Projects extends ParseComponent {

	constructor() {
		super();
		//Initialize SomeComponent
		//do stuff
	}

	observe(props, state){
		return{
			projects: new Parse.Query('Project').descending('createdAt')
		};
	}
	
	render(){
		return(
			<div className="contact-content">
					<div className="row">
					{
						console.log(this.data),

	  					this.data.projects.map(function(p) {

						var img = p.image;
	  						// img = p.get('image').url;
	  						console.log(img);

	  						return (
        					<div className="col-lg-12" key={"project-post-" + p.title}>
								<h2 className="page-header" ><Link to={'/project/' + p.objectId}>{p.title}</Link></h2>
          						<div className="col-lg-3 col-md-4 col-xs-6 thumb">
	              					<Link className="thumbnail" to={'/project/' + p.objectId }>
	                					<img className="img-responsive" src={ img }  alt="" />
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