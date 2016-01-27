import React, { Component } from 'react';
import Parse from 'parse';
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

	componentDidMount(){
		//Connection to the Parse Database Webserver.
		Parse.initialize("EvmOpxAGXkDDS9IOETIptyHZAJDn3Ax7Af3v7VQQ", "doRuBShVrZ9hP6d5lHYWd00SYvxmHVnIBBwm7OxI");

		//Contact Formular functionalities
		var CommentObject = Parse.Object.extend("CommentObject");

		$("#contactForm").on("submit", function(e) {
			e.preventDefault();			
			console.log("Handling the submit");
			//add error handling here
			//gather the form data

			var data = {};
			data.firstname = $("#contactFirstName").val();
			data.lastname = $("#contactLastName").val();
			data.email = $("#email").val();
			data.subject = $("#subject").val();
			data.content = $("#content").val();
			
			var comment = new CommentObject();
			comment.save(data, {
				success:function() {
					console.log("Success");
					//Alerts are lame - but quick and easy
					alert("Thanks for filling out the form! Email has been send!");
				},
				error:function(e) {
					alert("Something went wrong! Try to send the email again!");
					console.dir(e);
				}
			});
		});	
	}
}