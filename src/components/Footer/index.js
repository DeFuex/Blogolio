import React, { Component } from 'react';
import './footer.css'

export default class Footer extends Component {
	render() {
		return (
		<div>
			<footer className="blog-footer">
			  <p className='footer'>© 2016 Timo Obereder</p>
			  <p className='footer'>
				<a href="#">Back to top</a>
			  </p>
			</footer>
		</div>
		)
	}
}
