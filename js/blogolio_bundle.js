(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function() {

    Parse.$ = jQuery;
	
	//Connection to the Parse Database Webserver.
	Parse.initialize("EvmOpxAGXkDDS9IOETIptyHZAJDn3Ax7Af3v7VQQ", "doRuBShVrZ9hP6d5lHYWd00SYvxmHVnIBBwm7OxI");
	
	var $container = $('.main-container'),
		$sidebar = $('.blog-sidebar'),
		Blog = Parse.Object.extend('Blog', {
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

				// var category = new Category();
				// category.id = data.category;

				this.set({
					'title': data.title,
					// 'category': category,
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
		}),
		Project = Parse.Object.extend('Project', {
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
		}),
		Blogs = Parse.Collection.extend({
			model: Blog,
			query: (new Parse.Query(Blog)).descending('createdAt')
		}),
		Projects = Parse.Collection.extend({
			model: Project,
			query: (new Parse.Query(Project)).descending('createdAt')
		}),
		BlogsView = Parse.View.extend({
			template: Handlebars.compile($('#blogs-tpl').html()),
			render: function(){ 
				var collection = { blog: this.collection.toJSON() };
				this.$el.html(this.template(collection));
			}
		}),
		BlogView = Parse.View.extend({
			template: Handlebars.compile($('#blog-tpl').html()),
			render: function() {
				var attributes = this.model.toJSON();
				this.$el.html(this.template(attributes));
			}
		}),
		ProjectsGalleryView = Parse.View.extend({
			template: Handlebars.compile($('#thumb-gallery-tpl').html()),
			render: function(){
				var collection = { project: this.collection.toJSON() };
				this.$el.html(this.template(collection));
			}
		}),
		ProjectView = Parse.View.extend({
			template: Handlebars.compile($('#project-tpl').html()),
			render: function(){
				var attributes = this.model.toJSON();
				this.$el.html(this.template(attributes));
			}
		}),
		LoginView = Parse.View.extend({
			template: Handlebars.compile($('#login-tpl').html()),
			events:{
				'submit .form-signin': 'login'
			},
			login: function(e){
				// Prevent Default Submit Event
				e.preventDefault();
			 
				// Get data from the form and put them into variables
				var data = $(e.target).serializeArray(),
					username = data[0].value,
					password = data[1].value;
			 
				// Call Parse Login function with those variables
				Parse.User.logIn(username, password, {
					// If the username and password matches
					success: function(user) {
						// var welcomeView = new WelcomeView({model: user});
						// welcomeView.render();
						// $container.html(welcomeView.el);
						blogRouter.navigate('#/admin', { trigger: true });
					},
					// If there is an error
					error: function(user, error) {
						console.log(error);
					}
				});
			},
			render: function(){
				this.$el.html(this.template());
			}
		}),
		BlogsAdminView = Parse.View.extend({
			template: Handlebars.compile($('#admin-blogs-tpl').html()),
			render: function() {
				var collection = { 
					username: this.options.username,
					blog: this.collection.toJSON()
				};
				this.$el.html(this.template(collection));

			    // $('a.btn-primary').on('click', function(){
			    // 	alert('a tag pressed');
			    // })
			}
		}),		
		ProjectsAdminView = Parse.View.extend({
			template: Handlebars.compile($('#admin-projects-tpl').html()),
			render: function() {
				var collection = { 
					username: this.options.username,
					project: this.collection.toJSON()
				};
				this.$el.html(this.template(collection));
				loadTinyMCE();
			}
		}),
		WriteBlogView = Parse.View.extend({
			template: Handlebars.compile($('#write-tpl').html()),
			events: {
				'submit .form-write': 'submit'
			},
			submit: function(e) {
				e.preventDefault();
				var data = $(e.target).serializeArray();
				// If there's no blog data, then create a new blog
				this.model = this.model || new Blog();
				this.model.update({
						title: data[0].value,
						summary: data[1].value, 
						content: data[2].value
					});
			},
			render: function(){
				var attributes;
				// If the user is editing a blog, that means there will be a blog set as this.model
				// therefore, we use this logic to render different titles and pass in empty strings
				if (this.model) {
					attributes = this.model.toJSON();
					attributes.form_title = 'Edit Blog';
				} else {
					attributes = {
						form_title: 'Add a Blog',
						title: '',
						summary: '',
						content: ''
					}
				}
				this.$el.html(this.template(attributes)).find('.write-content').on('load', function (){
					tinymce.init({
				  		setup: function(e){
				  			e.on('init', function(args) {
				  				console.debug(args.target.id);
				  			})
				  		},
				        selector: "textarea.form-control",
				        plugins: [
				        	"media table paste "
				        ],
				        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter      alignright alignjustify | bullist numlist outdent indent | link image"
					});
				});

				// promise().done(function (){
				// 	tinymce.init({
				//   		setup: function(e){
				//   			e.on('init', function(args) {
				//   				console.debug(args.target.id);
				//   			})
				//   		},
				//         selector: "textarea.form-control",
				//         plugins: [
				//         	"media table paste "
				//         ],
				//         toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter      alignright alignjustify | bullist numlist outdent indent | link image"
				// 	});
				// });
			}
		}),		
		WriteProjectView = Parse.View.extend({
			template: Handlebars.compile($('#write-tpl').html()),
			events: {
				'submit .form-write': 'submit'
			},
			submit: function(e) {
				e.preventDefault();
				var data = $(e.target).serializeArray();
				// If there's no project data, then create a new project
				this.model = this.model || new Project();
				this.model.update({
						title: data[0].value,
						// image: data.image.url,
						summary: data[1].value,
						content: data[2].value
					});
			},
			render: function(){
				var attributes;
				// If the user is editing a blog, that means there will be a blog set as this.model
				// therefore, we use this logic to render different titles and pass in empty strings
				if (this.model) {
					attributes = this.model.toJSON();
					attributes.form_title = 'Edit Project';
				} else {
					attributes = {
						form_title: 'Add a Project',
						title: '',
						image: '',
						summary: '',
						content: ''
					}
				}

				this.$el.html(this.template(attributes)).find('.write-content');
				loadTinyMCE();
			}
		}),
		AboutView = Parse.View.extend({
			template: Handlebars.compile($('#about-tpl').html()),
			render: function() {
				var attributes
				attributes = {
					form_title: 'About'
				}
				this.$el.html(this.template);
			}
		}),
		ContactView = Parse.View.extend({
			template: Handlebars.compile($('#contact-tpl').html()),
			render: function(){
				var attributes;
				attributes = {
					form_title: 'Contact'
				}
				this.$el.html(this.template(attributes));
			}
		}),
		BlogRouter = Parse.Router.extend({  
			// Shared variables can be defined here.
			initialize: function(options){
				this.blogs = new Blogs();
				this.projects = new Projects();
			},
			// Router start point.
			start: function(){
				Parse.history.start({ 
				root: '/Blogolio/'
				// pushState: true 
				});
				// this.navigate('', { trigger: true });
			},			
			// Map functions to urls.
			// '{{URL pattern}}': '{{function name}}'
			routes: {
				'': 'index',
				'blog/:id': 'blog',
				'projects': 'projects',
				'project/:id': 'project', 
				'admin': 'admin',
				'login': 'login',
				'logout': 'logout',
				'add': 'add',
				'edit/:id': 'edit',
				'del/:id': 'del',
				'addp': 'addproject',
				'editp/:id': 'editproject',
				'delp/:id': 'delproject',
				'about': 'about',
				'contact': 'contact'
			},
			index: function() {
				this.blogs.fetch({
					success: function(blogs) {
						var blogsView = new BlogsView({ collection: blogs });
						blogsView.render();
						$container.html(blogsView.el);
					},
					error: function(blogs, error){
						console.log(error);
					}
				});
			},
			blog: function(id){
				var query = new Parse.Query(Blog);
				query.get(id, {
					success: function(blog) {
						console.log(blog);
						var blogView = new BlogView({ model: blog });
						blogView.render();
						$container.html(blogView.el);
					},
					error: function(blog, error){
						console.log(error);
					}
				})
			},
			projects: function(){
				this.projects.fetch({
					success: function(projects) {
						var projectsGalleryView = new ProjectsGalleryView({ collection: projects });
						projectsGalleryView.render();
						$container.html(projectsGalleryView.el);
					},
					error: function(projects, error){
						console.log(error);
					}
				})
			},
			project: function(id){
				var query = new Parse.Query(Project);
				query.get(id, {
					success: function(project) {
						var projectView = new ProjectView({ model: project });
						projectView.render();
						$container.html(projectView.el);
					},
					error: function(project, error){
						console.log(error);
					}
				})
			},
			admin: function() {
				// Call current user from Parse.
				var currentUser = Parse.User.current();
			 
				//Check login
				if (!currentUser) {
					this.navigate('#/login', { trigger: true });
				} else {
					$.when(
						this.blogs.fetch({
							success: function(blogs) {
								var blogsAdminView = new BlogsAdminView({ 
									//Pass current username to be rendered in the #admin-blogs-tpl depending html tag.
									username: currentUser.get('username'),
									collection: blogs
								});
								blogsAdminView.render();
								$container.html(blogsAdminView.el);
							},
							error: function(blogs, error) {
								console.log(error);
							}
						})
						,
						this.projects.fetch({
							success: function(projects) {
								var projectsAdminView = new ProjectsAdminView({
									username: currentUser.get('username'),
									collection: projects
								});
								projectsAdminView.render();
								$('#projects-container').html(projectsAdminView.el);
							},
							error: function(projects, error) {
								console.log(error);
							}
						})
					)
				}
			},
			login: function() {
				var loginView = new LoginView();
				loginView.render();
				$container.html(loginView.el);
			},
			logout: function(){
				Parse.User.logOut();
				this.navigate('#/login', {trigger: true });
			},
			add: function() {
				// Check login
				if (!Parse.User.current()) {
					this.navigate('#/login', { trigger: true });
				} else {
					var writeBlogView = new WriteBlogView();
					writeBlogView.render();
					tinymce.remove();
					$container.html(writeBlogView.el);
				}
			},
			edit: function(id) {
				// Check login
				if (!Parse.User.current()) {
					this.navigate('#/login', { trigger: true });
				} else {
					var query = new Parse.Query(Blog);
					query.get(id, {
						success: function(blog) {
							var writeBlogView = new WriteBlogView({ model: blog });
							writeBlogView.render();
							$container.html(writeBlogView.el);
						},
						error: function(blog, error) {
							console.log(error);
						}
					});
				}
			},
			del: function(id){
				if (!Parse.User.current()) {
					this.navigate('#/login', { trigger: true });
				} else {
					var self = this,
					query = new Parse.Query(Blog);
					query.get(id).then(function(blog){
						blog.destroy().then(function(blog){
							self.navigate('admin', { trigger: true });
						})
					});
				}
			},
			addproject: function() {
				// Check login
				if (!Parse.User.current()) {
					this.navigate('#/login', { trigger: true });
				} else {
					var writeProjectView = new WriteProjectView();
					writeProjectView.render();
					$container.html(writeProjectView.el);
				}
			},
			editproject: function(id) {
				// Check login
				if (!Parse.User.current()) {
					this.navigate('#/login', { trigger: true });
				} else {
					var query = new Parse.Query(Project);
					query.get(id, {
						success: function(project) {
							var writeProjectView = new WriteProjectView({ model: project });
							writeProjectView.render();
							$container.html(writeProjectView.el);
						},
						error: function(project, error) {
							console.log(error);
						}
					});
				}
			},
			delproject: function(id){
				if (!Parse.User.current()) {
					this.navigate('#/login', { trigger: true });
				} else {
					var self = this,
					query = new Parse.Query(Project);
					query.get(id).then(function(project){
						project.destroy().then(function(project){
							self.navigate('admin', { trigger: true });
						})
					});
				}
			},
			about: function(){
				var aboutView = new AboutView();
				aboutView.render();
				$container.html(aboutView.el);
			},
			contact: function(){
				var contactView = new ContactView();
				contactView.render();
				$container.html(contactView.el);
			}      
		}),
		blogRouter = new BlogRouter();
	 
		blogRouter.start(); 

		// window._loaded = false;

		// window.tinyMCEPreInit = {
		// 	base: 'js/tinymce.min.js', 
		// 	suffix : '', 
		// 	query : ''
		// };   

		// $.getScript(window.tinyMCEPreInit.base, function(){

		// 	//$('#debug').html('tinymce has been loaded');
		// 	window._loaded = true;
			
		// 	tinymce.dom.Event.domLoaded = true; 
		// });     

		// $('a.btn-primary').click(function(){	

		// 	if (window._loaded) {

		// 		// create the wysiwyg
		// 		tinyMCE.init({
		// 			mode: 'textareas',
		// 			theme: 'advanced'
		// 		});

		// 		alert('tinymce LOADED');

		// 	} else {
				
		// 		alert('tinymce has not finished downloading');
		// 	}
		// });
		
	$(document).ready(function(){

		//Fade in/out functionalities.
		$('.main-container').css("display", "none");
	 
	    $('.main-container').fadeIn(300);
	 
	    $('a.transition').click(function(event){
	        event.preventDefault();
	        var linkLocation = this.href;
	        console.log(linkLocation);
	        $('.main-container').fadeOut(300, function(){
	        	window.location = linkLocation;
	        	$('.main-container').fadeIn(300);
	        });      
	    });

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
					alert("Thanks for filling the form! Email has been send!");
				},
				error:function(e) {
					alert("Something went wrong! Try sending the email again!");
					console.dir(e);
				}
			});
		});
	});

});

//function to initialize tinyMCE
function loadTinyMCE() {
    tinymce.init({
  		setup: function(e){
  			e.on('init', function(args) {
  				console.debug(args.target.id);
  			})
  		},
        selector: "textarea.form-control",
        plugins: [
        	"media table paste "
        ],
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter      alignright alignjustify | bullist numlist outdent indent | link image"
		});
}


},{}]},{},[1]);
