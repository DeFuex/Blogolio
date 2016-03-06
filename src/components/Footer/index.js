import React, { Component } from 'react';
import './footer.css'

export default class Footer extends Component {
	render() {
		return (
		<div>
			<footer className="blog-footer">
			  <p>© 2015 Timo Obereder</p>
			  <p>
				<a href="#">Back to top</a>
			  </p>
			</footer>
		</div>
		)
	}
}
