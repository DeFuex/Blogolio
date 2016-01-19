import Parse from 'parse';

//Connection to the Parse Database Webserver.
Parse.initialize("EvmOpxAGXkDDS9IOETIptyHZAJDn3Ax7Af3v7VQQ", "doRuBShVrZ9hP6d5lHYWd00SYvxmHVnIBBwm7OxI");

export var Blog = Parse.Object.extend('Blog', {
	update: function(data) {
		// Only set ACL if the blog doesn't have it
		if ( !this.get('ACL') ) {
			// Create an ACL object to grant access to the current user 
			// (also the author of the newly created blog)
			var blogACL = new Parse.ACL(Parse.User.current());
			// Grant read-read only access to the public so everyone can see it
			blogACL.setPublicReadAccess(true);
			// Set this ACL object to the ACL field
			this.setACL(blogACL);
		}

		this.set({
			'title': data.title,
			'summary': data.summary,
			'content': data.content,
			// Set author to the existing blog author if editing, use current user if creating
			// The same logic goes into the following three fields
			'author': this.get('author') || Parse.User.current(),
			'authorName': this.get('authorName') || Parse.User.current().get('username'),
			'time': this.get('time') || new Date().toDateString()
		}).save(null, {
			success: function(blog) {
				blogRouter.navigate('#/admin', { trigger: true });
			},
			error: function(blog, error) {
				console.log(blog);
				console.log(error);
			}
		});
	}
})