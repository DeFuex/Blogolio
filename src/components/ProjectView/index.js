import React, { Component } from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';

var ParseComponent = ParseReact.Component(React);

//Connection to the Parse Database Webserver.
Parse.initialize("EvmOpxAGXkDDS9IOETIptyHZAJDn3Ax7Af3v7VQQ", "doRuBShVrZ9hP6d5lHYWd00SYvxmHVnIBBwm7OxI");

export default class ProjectView extends ParseComponent {

	constructor() {
		super();
		//Initialize SomeComponent
		//do stuff
	}

	observe(props, state){
		var projectId = this.props.params.id;
		console.log(projectId);
		return {
			project: (new Parse.Query('Project')).equalTo("objectId", this.props.params.id)
		};
	}
	
	render(){
		console.log(this.data.project);
		return(
			<div>
			{
				this.data.project.map(function(p) {
					return(
						<div className="contact-content">
								<div className="blog-post">
									<h2 className="page-header">{p.title}</h2>
									<div dangerouslySetInnerHTML={{__html: p.content}}></div>
									<p className="blog-post-meta">At {p.time} by {p.authorName}</p> 
								</div>				 
						</div>
					);
				})
			}
			</div>
		);
	}
}