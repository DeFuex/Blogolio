import React, { Component } from 'react';

export default class Login extends Component {
	render(){
		return(
			<div className="contact-content">
			
			    <form className="form-signin" role="form">
			        <h2 className="form-signin-heading">Please sign in</h2>
			        <input type="text" name="username" className="form-control" placeholder="Username" required="" autofocus="" />
			        <input type="password" name="password" className="form-control" placeholder="Password" required="" />
			        <button className="contactButton" type="submit">Sign in</button>
			    </form>
			</div>
		)
	}	
}
