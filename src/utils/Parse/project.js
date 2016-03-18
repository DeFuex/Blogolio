import Parse from 'parse';

//Connection to the Parse Database Webserver.
Parse.initialize("EvmOpxAGXkDDS9IOETIptyHZAJDn3Ax7Af3v7VQQ", "doRuBShVrZ9hP6d5lHYWd00SYvxmHVnIBBwm7OxI");

export var Project = Parse.Object.extend('Project', {
	update: function(data) {
		if ( !this.get('ACL') ) {
			var projectACL = new Parse.ACL(Parse.User.current());
			projectACL.setPublicReadAccess(true);
			this.setACL(projectACL);

			var fileUploadControl = $('#imageFileUpload')[0];
			if (fileUploadControl.files.length > 0) {
				var file = fileUploadControl.files[0];
				var name = "photo.jpg";

				var parseFile = new Parse.File(name, file);
			};
		}

		this.set({
			'title': data.title,
			'image': parseFile,//this.get("parseFile").url(),//this.get('image') || parseFile,
			'summary': data.summary,
			'content': data.content,
			'author': this.get('author') || Parse.User.current(),
			'authorName': this.get('authorName') || Parse.User.current().get('username'),
			'time': this.get('time') || new Date().toDateString()
		}).save(null, {
			success: function(project){
				blogRouter.navigate('#/admin', { trigger: true });
			},
			error: function(project, error){
				console.log(project);
				console.log(error);
			}
		});
	}
})