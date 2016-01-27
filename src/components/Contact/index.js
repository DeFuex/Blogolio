import React, { Component } from 'react';
import './contact.css';

export default class Contact extends Component {
	render(){
		return(
			<div className="contact-content">
			  <h2 className="page-header" >Contact</h2>
			  <p className="contact-description">
				I love hearing from people landing on my site, so use the little form below
				should you have a question, recommendation, or request for me. I will try my best
				to get back to you.
			  </p>
			  <form id="contactForm" className="contact-form" role="form">
				<p>
				  <label htmlFor="title">First Name</label><br/>
				  <input id="contactFirstName" name="firstname" type="text" />
				</p>
				<p>			
				  <label htmlFor="title">Last Name</label><br/>
				  <input id="contactLastName" name="firstname" type="text" />
				</p>
				<p>
				  <label htmlFor="email">Email</label><br/>
				  <input id="email" name="email" type="email" />
				</p>
				<p>
				  <label htmlFor="subject">Subject</label><br/>
				  <input id="subject" name="subject" type="text" />
				</p>
				<p>
				  <label htmlFor="content">Content</label><br/>
				  <textarea id="content" name="content" rows="10" ></textarea>
				</p>
				<p>
					<input type="submit" value="Submit" className="contactButton" />
				</p>
			  </form>
			</div>
		)
	}
}