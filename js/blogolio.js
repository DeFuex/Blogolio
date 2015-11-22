$(function() {
 
    Parse.$ = jQuery;
	
	//Connection to the Parse Database Webserver.
	Parse.initialize("EvmOpxAGXkDDS9IOETIptyHZAJDn3Ax7Af3v7VQQ", "doRuBShVrZ9hP6d5lHYWd00SYvxmHVnIBBwm7OxI");
	
	var Blog = Parse.Object.extend("Blog");
	var Blogs = Parse.Collection.extend({
		model: Blog
	});
	
	var blogs = new Blogs();
	
	blogs.fetch({
		success: function(blogs) {
			console.log(blogs);
		},
		error: function(blogs, error){
			console.log(error);
		}
	});
	
});