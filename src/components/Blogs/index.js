import React, { Component } from 'react';
import Parse from 'parse';
import { Blog } from '../../utils/Parse/blog.js';
import './blogs.css';

export default class Blogs extends Component {

	constructor() {
		super();
	}

	render(){
		return (
				<div className="blog-content-main">
					<h2 className="page-header gray"><a href="#">React Web Blog Version 1.0</a></h2>
						<div className="blog-content">
							This static blog page was created using reactjs and es6 code.
							It contains personal information about me and will also be used as demonstration for a series of upcoming tutorials.
							It should guide you through a setup of different things. The project structure using the flux architecture,
							setting up webpack with different configuration files (for production and development) and how to host the
							site on github pages, if you don&apos;t want to actually use e.g.: Jekyll or similar things.
							I hope I can be fast enough to write and guide you through the tutorial and keep the content up-to-date at the same time.
							I also did preparations on using Redux for upcoming functionalities, which could be a login for your own web page or other
							things. But for now, have fun looking at this page and the soon upcoming tutorial series.
							<br />
							<br />
							Until everything is set up, you can follow the project development on github =>
							<a target="_blank" rel="nofollow" href="https://github.com/DeFuex/Blogolio/tree/develop">
							https://github.com/DeFuex/Blogolio/tree/develop</a>.
						</div>
						<p className="blog-post-meta">At Wed April 20 2016 by Timo Obereder</p>
				</div>

		);
	}
}
