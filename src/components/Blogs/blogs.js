import React, { Component } from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import Blog from '../utils/Parse/blog.js';

//Connection to the Parse Database Webserver.
Parse.initialize("EvmOpxAGXkDDS9IOETIptyHZAJDn3Ax7Af3v7VQQ", "doRuBShVrZ9hP6d5lHYWd00SYvxmHVnIBBwm7OxI");

export default class Blogs extends Component {
	// mixins: [ParseReact.Mixin],
	observe: function(){
		return{
			blogs: (new Parse.Query(Blog)).descending('createdAt')
		};
	},
	render: function(){
		return (
			<div className="contact-content">
			{
				this.data.blogs.map(function(b) {
					// var htmlInput = b.content;
					// var htmlToReactParser = new HtmlToReact.Parser(React);
					// var reactComponent = htmlToReactParser.parse(htmlInput);
					// var reactHtml = ReactDomServer.renderToStaticMarkup(reactComponent);
					// var clean = DOMPurify.sanitize(b.content, {ALLOWED_TAGS: ['b', 'a', 'div', '&nbsp;', '&gt;']});
					return (
						<div className="blog-post">
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
