import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Parse from 'parse';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux'
import NavBar from '../components/NavBar';
import Home from '../components/Home';
import About from '../components/About';
import Projects from '../components/Projects';
import ProjectView from '../components/ProjectView';
import Contact from '../components/Contact';
import Admin from '../components/Admin';

export default class App extends Component {
	render(){
		return(
			<div>
				<Router history={browserHistory}> 
					<Route path="/" component={NavBar}>
						<IndexRoute component={Home} />
						<Route path="about" component={About} />	
						<Route path="projects" component={Projects} />
						<Route path="project:id" component={ProjectView} />	
						<Route path="contact" component={Contact} />
						<Route path="admin" component={Admin} />
					</Route>
				</Router>
			</div>
		);
	}
	
	// componentDidMount(){

	// }
}

// $(document).ready(function(){
			// //Fade in/out functionalities.
	// $('.blog-main').css("display", "none");
 
	// $('.blog-main').fadeIn(300);
 
	// $('a.transition').click(function(event){
		// event.preventDefault();
		// var linkLocation = this.href;
		// console.log(linkLocation);
		// $('.blog-main').fadeOut(300, function(){
			// window.location = linkLocation;
			// $('.blog-main').fadeIn(700);
		// });      
	// });
// });

// $(document).ready(function(){
	
	// //Connection to the Parse Database Webserver.
	// Parse.initialize("EvmOpxAGXkDDS9IOETIptyHZAJDn3Ax7Af3v7VQQ", "doRuBShVrZ9hP6d5lHYWd00SYvxmHVnIBBwm7OxI");
	
	// //Contact Formular functionalities
	// var CommentObject = Parse.Object.extend("CommentObject");

	// $("#contactForm").on("submit", function(e) {
		// e.preventDefault();			
		// console.log("Handling the submit");
		// //add error handling here
		// //gather the form data

		// var data = {};
		// data.firstname = $("#contactFirstName").val();
		// data.lastname = $("#contactLastName").val();
		// data.email = $("#email").val();
		// data.subject = $("#subject").val();
		// data.content = $("#content").val();
		
		// var comment = new CommentObject();
		// comment.save(data, {
			// success:function() {
				// console.log("Success");
				// //Alerts are lame - but quick and easy
				// alert("Thanks for filling the form! Email has been send!");
			// },
			// error:function(e) {
				// alert("Something went wrong! Try sending the email again!");
				// console.dir(e);
			// }
		// });
	// });
// });

// function loadTinyMCE() {
    // tinymce.init({
  		// setup: function(e){
  			// e.on('init', function(args) {
  				// console.debug(args.target.id);
  			// })
  		// },
        // selector: "textarea.form-control",
        // plugins: [
        	// "media table paste "
        // ],
        // toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter      alignright alignjustify | bullist numlist outdent indent | link image"
		// });
// }