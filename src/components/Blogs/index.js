import React, { Component } from 'react';
import Parse from 'parse';
// import ParseReact from 'parse-react';
import { Blog } from '../../utils/Parse/blog.js';
import './blogs.css';

// var ParseComponent = ParseReact.Component(React);

//Connection to the Parse Database Webserver.
Parse.initialize("EvmOpxAGXkDDS9IOETIptyHZAJDn3Ax7Af3v7VQQ", "doRuBShVrZ9hP6d5lHYWd00SYvxmHVnIBBwm7OxI");

export default class Blogs extends Component {// extends ParseComponent {

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
			<div className="blog-content-main">
				<h2 className="page-header gray"><a href="#">Web Blog Version 1.0</a></h2>
				<div className="blog-content">
					This is the first entry into my own blog site. I don&apos;t really know what to write here except technical details about how i created this&nbsp;blog page.
					So i&apos;m just gonna start with that. I used a tutorial for training purpose. I&nbsp;always wanted to make my own cms blog web page and have found this
					very helpful&nbsp;tutorial here&nbsp;
					<a target="_blank" rel="nofollow" href="http://code.tutsplus.com/series/building-your-blog-with-parsejs--cms-651">
						http://code.tutsplus.com/series/building-your-blog-with-parsejs--cms-651
					</a>.
					It is written with its own cms using Parse.js v1.5 (includes Backbone.js for MVC related stuff), handlebars.min.js,
					wysihtml5-0.0.2.min.js, wysithml5-0.3.0.min.js, jquery.min.js v1.11.3 and bootstrap.min.js. The tutorial is still ongoing,
					but uses some deprecated javascript files. I may update to newer versions of parse.js and handlebars.js&nbsp;as old features
					could be deprecated soon.&nbsp;
					<br />
					<br />
					In my version of this project I added some extra data handling in the background for
					projects and also an option to upload&nbsp;images. You are also invited to watch the whole code on my github page here -&gt;&nbsp;
					<a target="_blank" rel="nofollow" href="https://github.com/DeFuex/Blogolio">https://github.com/DeFuex/Blogolio
					</a>.
					<br />
					<br />
					(Side note:&nbsp;As the versions of some javascript files seem to be old and some functionalities soon to be deprecated i&apos;ll
					probably rebuild the cms system using redux/react and some other things in the future). But for now,
					<br />
					<br />
					have fun looking at my portfolio blog!
					<br />
				</div>
				<p className="blog-post-meta">At Tue Dec 08 2015 by Timo Obereder</p>
			</div>
		);
	}
}

{/*
	Parse Blog component data call:
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
		); */ }
