import React, { Component } from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import { Blog } from '../../utils/Parse/blog.js';

var ParseComponent = ParseReact.Component(React);

//Connection to the Parse Database Webserver.
Parse.initialize("EvmOpxAGXkDDS9IOETIptyHZAJDn3Ax7Af3v7VQQ", "doRuBShVrZ9hP6d5lHYWd00SYvxmHVnIBBwm7OxI");

export default class Blogs extends ParseComponent {

	constructor() {
		super();
		//Initialize SomeComponent
		//do stuff
	}

	observe(props, state){
		return{
			blogs: new Parse.Query(Blog).descending('createdAt')
		};
	}

	render(){
		return (
			<div className="contact-content">
			{
				this.data.blogs.map(function(b) {
					return (
						<div className="blog-post" key={"blog-post-" + b.title}>
							<h2 className="page-header"><a href="#">{b.title}</a></h2>
							<div className="blog-content" dangerouslySetInnerHTML={{__html: b.content}}></div>
							<p className="blog-post-meta">At {b.time} by {b.authorName}</p>
						</div>
					);
				})
			}
			</div>
		);
	}
}
