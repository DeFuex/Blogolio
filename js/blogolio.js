$(function() {

	var Utils = {};

	/**
	 * Fetch multiple models(or collections) and execute passed callback
	 *
	 * @param {Array} stack - stack of objects
	 * @param {Function} callback - exec on ready
	 * @param {Object} ctx - callback context
	 *
	 * @returns {Object} context
	 */

	Utils.fetch = function(stack, callback, ctx){
	  var counter = stack.length
	    , error
	    , cb;

	  cb = function(){
	    counter--;
	    if(counter == 0){
	      return callback.call(ctx);
	    }
	  }

	  for(var i in stack){
	    var task = stack[i];
	    task.target.bind(task.event, cb).fetch();
	  }

	  return ctx;
	}


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
					// 'summary': data.summary,
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
				}

				this.set({
					'title': data.title,
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
		ProjectsView = Parse.View.extend({
			template: Handlebars.compile($('#projects-tpl').html()),
			render: function(){
				var collection = { project: this.collection.toJSON() };
				this.$el.html(this.template(collection));
			}
		}),
		ProjectsGalleryView = Parse.View.extend({
			template: Handlebars.compile($('#thumb-gallery-tpl').html()),
			render: function(){
				var collection = { project: this.collection.toJSON() };
				this.$el.html(this.template(collection));
			}
		})
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
					blog: this.blogs.toJSON(),
					project: this.projects.toJSON()
				};
				this.$el.html(this.template(collection));
			}
		}),		
		ProjectsAdminView = Parse.View.extend({
			template: Handlebars.compile($('#admin-blogs-tpl').html()),
			render: function() {
				var collection = { 
					username: this.options.username,
					project: this.collection.toJSON()
				};
				this.$el.html(this.template(collection));
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
						content: data[1].value
						// category: data[1].value,
						// summary: data[2].value,
						// content: data[3].value
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
						// summary: '',
						content: ''
					}
				}

				this.$el.html(this.template(attributes)).find('textarea').wysihtml5();
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
				// If there's no blog data, then create a new blog
				this.model = this.model || new Project();
				this.model.update({
						title: data[0].value, 
						content: data[1].value
						// category: data[1].value,
						// summary: data[2].value,
						// content: data[3].value
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
						// summary: '',
						content: ''
					}
				}

				this.$el.html(this.template(attributes)).find('textarea').wysihtml5();
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
				'projects': 'projects',
				'admin': 'admin',
				'login': 'login',
				'logout': 'logout',
				'add': 'add',
				'edit/:id': 'edit',
				'del/:id': 'del',
				'addp': 'addproject',
				'editp/:id': 'editproject',
				'delp/:id': 'delproject'
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
			admin: function() {
				// Call current user from Parse.
				var currentUser = Parse.User.current();
			 
				//Check login
				if (!currentUser) {
					this.navigate('#/login', { trigger: true });
				} else {
					// $.when(this.blogs.fetch(), this.projects.fetch())
					//  .done(function(blogs, projects) {
					//  	console.log(blogs);
					//  	console.log(projects);
    	// 				var blogsAdminView = new BlogsAdminView({ 
					// 	//Pass current username to be rendered in the #admin-blogs-tpl depending html tag.
					// 		username: currentUser.get('username'),
				 // 			collection: blogs
				 // 		});
					// 	blogsAdminView.render();
				 // 		$container.html(blogsAdminView.el);
				 		
					// 	var projectsAdminView = new ProjectsAdminView({
					// 		username: currentUser.get('username'),
					// 		collection: projects
					// 	});
					//  	projectsAdminView.render();
					// 	$container.html(projectsAdminView.el);
    	// 			})

					// $.when( this.blogs.fetch(), this.projects.fetch() ).done(function(blogs, projects){
					// 	var blogsAdminView = new BlogsAdminView({ 
					// 		//Pass current username to be rendered in the #admin-blogs-tpl depending html tag.
					// 		username: currentUser.get('username'),
					// 		collection: blogs,
					// 		collection: projects
					// 	});
					// 	blogsAdminView.render();
					// 	$container.html(blogsAdminView.el);
					// })

					// var stack = [];
					// stack.push({ target: this.blogs, event: 'reset' });
					// stack.push({ target: this.projects, event: 'reset' });

					// Utils.fetch(stack, function(){
					//   	console.log('Models are ready');
					//   	console.log(stack);
					// 	var blogsAdminView = new BlogsAdminView({ 
					// 		//Pass current username to be rendered in the #admin-blogs-tpl depending html tag.
					// 		username: currentUser.get('username'),
					// 		collection: stack[0]
					// 	});
					// 	blogsAdminView.render();
					// 	$container.html(blogsAdminView.el);

					// 	var projectsAdminView = new ProjectsAdminView({
					// 		username: currentUser.get('username'),
					// 		collection: projects
					// 	});
					// 	projectsAdminView.render();
					// 	$container.html(projectsAdminView.el);
					// });

						$.when(this.blogs.fetch(), this.projects.fetch()).done(function(blogs, projects){
								var blogsAdminView = new BlogsAdminView({ 
									//Pass current username to be rendered in the #admin-blogs-tpl depending html tag.
									username: currentUser.get('username'),
									blog: blogs,
									project: projects
								});
								blogsAdminView.render();
								$container.html(blogsAdminView.el);
						})

					// $.when(
					// 	this.blogs.fetch({
					// 		success: function(blogs) {
					// 			var blogsAdminView = new BlogsAdminView({ 
					// 				//Pass current username to be rendered in the #admin-blogs-tpl depending html tag.
					// 				username: currentUser.get('username'),
					// 				blogs: blogs
					// 			});
					// 			blogsAdminView.render();
					// 			$container.html(blogsAdminView.el);
					// 		},
					// 		error: function(blogs, error) {
					// 			console.log(error);
					// 		}
					// 	})
					// 	,
					// 	this.projects.fetch({
					// 		success: function(projects) {
					// 			var projectsAdminView = new ProjectsAdminView({
					// 				username: currentUser.get('username'),
					// 				projects: projects
					// 			});
					// 			projectsAdminView.render();
					// 			$container.html(projectsAdminView.el);
					// 		},
					// 		error: function(projects, error) {
					// 			console.log(error);
					// 		}
					// 	})
					// )
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
			}      
		}),
		blogRouter = new BlogRouter();
	 
		blogRouter.start(); 

});