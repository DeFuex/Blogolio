import React, { Component } from 'react';

export default class Login extends Component {
	render(){
		return(
			<div>
			    <form class="form-signin" role="form">
			        <h2 class="form-signin-heading">Please sign in</h2>
			        <input type="text" name="username" class="form-control" placeholder="Username" required="" autofocus="" />
			        <input type="password" name="password" class="form-control" placeholder="Password" required="" />
			        <button class="contactButton" type="submit">Sign in</button>
			    </form>
			</div>
		)
	}	
}
