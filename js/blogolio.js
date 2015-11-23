$(function() {
 
    Parse.$ = jQuery;
	
	//Connection to the Parse Database Webserver.
	Parse.initialize("EvmOpxAGXkDDS9IOETIptyHZAJDn3Ax7Af3v7VQQ", "doRuBShVrZ9hP6d5lHYWd00SYvxmHVnIBBwm7OxI");
	
	var Blog = Parse.Object.extend("Blog");
	var Blogs = Parse.Collection.extend({
		model: Blog
	});
	
	var blogs = new Blogs();
	
	var BlogsView = Parse.View.extend({
	    template: Handlebars.compile($('#blogs-tpl').html()),
	    render: function(){ 
	        var collection = { blog: this.collection.toJSON() };
	        this.$el.html(this.template(collection));
	    }
	});

	blogs.fetch({
		success: function(blogs) {
			console.log(blogs);
			var blogsView = new BlogsView({ collection: blogs });
		    blogsView.render();
		    $('.main-container').html(blogsView.el);
		},
		error: function(blogs, error){
			console.log(error);
		}
	});
	
});

// index.js
// var React = require('react');
// var ReactDOM = require('react-dom');

// ReactDOM.render(
  // <h1>Hello, world!</h1>,
  // document.getElementById('example')
// );



// $(function () {

	// Parse.$ = jQuery;


	
	// //Connection to the Parse Database Webserver.
	// Parse.initialize("EvmOpxAGXkDDS9IOETIptyHZAJDn3Ax7Af3v7VQQ", "doRuBShVrZ9hP6d5lHYWd00SYvxmHVnIBBwm7OxI");

	// observe: function(props, state) {
		// return {
			// comments: (new Parse.Query('Blog'))
                // .ascending('createdAt')
		// };
	// }
	
	// console.log(this.data.comments);
	
	// // var Blog = Parse.Object.extend("Blog");
	// // var Blogs = Parse.Collection.extend({
		// // model: Blog
	// // });

	// // var blogs = new Blogs();

	// // blogs.fetch({
		// // success: function (blogs) {
			// // console.log(blogs);
		// // },
		// // error: function (blogs, error) {
			// // console.log(error);
		// // }
	// // });
// });