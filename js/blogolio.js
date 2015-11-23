$(function() {
 
    Parse.$ = jQuery;
	
	//Connection to the Parse Database Webserver.
	Parse.initialize("EvmOpxAGXkDDS9IOETIptyHZAJDn3Ax7Af3v7VQQ", "doRuBShVrZ9hP6d5lHYWd00SYvxmHVnIBBwm7OxI");
	
	var $container = $('.main-container');
	
	var LoginView = Parse.View.extend({
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
    });
    // WelcomeView = Parse.View.extend({
        // template: Handlebars.compile($('#admin-tpl').html()),
        // events: {
        	// 'click .add-blog': 'add'
        // },
        // add: function(){
			// blogRouter.navigate('#/add', { trigger: true });
        // },
        // render: function(){
            // var attributes = this.model.toJSON();
            // this.$el.html(this.template(attributes));
			// // var blogs = new Blogs();
			// // blogs.fetch({
				// // success: function(blogs) {
					// // var blogsAdminView = new BlogsAdminView({collection: blogs });
					// // blogsAdminView.render();
					// // $container.append(blogsAdminView.el);
				// // },
				// // error: function(blogs, error){
					// // console.log(error);
				// // }
			// // });
        // }
    // });


	var Blog = Parse.Object.extend('Blog', {
	    create: function(title, content) {
	        this.save({
	            'title': title,
	            'content': content,
	            'author': Parse.User.current(),
	            'authorName': Parse.User.current().get('username'),
	            'time': new Date().toDateString()
	        },{
	            success: function(blog) {
	                alert('You added a new blog: ' + blog.get('title'));
	            },
	            error: function(blog, error) {
	                console.log(blog);
	                console.log(error);
	            }
	        }); 
			// 'url': title.toLowerCase()
            // .replace(/[^\w ]+/g,'')
            // .replace(/ +/g,'-')
	    },
		update: function(title, content) {
			this.set({
				'title': title,
				'content': content,
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
	});
	
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
			this.model.update(data[0].value, data[1].value);
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
					content: ''
				}
			}
			this.$el.html(this.template(attributes)).find('textarea').wysihtml5();
		}
	});

    // var AddBlogView = Parse.View.extend({
    	// template: Handlebars.compile($('#add-tpl').html()),
    	// events: {
    		// 'submit .form-add': 'submit'
    	// },
    	// submit: function(e){
    		// // Submit functionality goes here.
    		// // Prevent Default Submit Event     
		    // e.preventDefault();
		    // // Take the form and put it into a data object
		    // var data = $(e.target).serializeArray(),
		    // // Create a new instance of Blog
		        // blog = new Blog();
		    // // Call .create()
		    // blog.create(data[0].value, $('textarea').val());
    	// },
    	// render: function(){
    		// this.$el.html(this.template()).find('textarea').wysihtml5();
    	// }
    // });
	
	// var EditBlogView = Parse.View.extend({
		// template: Handlebars.compile($('#edit-tpl').html()),
		// events: {
			// 'submit .form-edit': 'submit'
		// },
		// submit: function(e){
			// e.preventDefault();
			// var data = $(e.target).serializeArray();
			// this.model.update(data[0].value, $('textarea').val());
		// },
		// render: function(){
			// var attributes = this.model.toJSON();
			// this.$el.html(this.template(attributes));
		// }
	// })
	
	var Blogs = Parse.Collection.extend({
		model: Blog,
		query: (new Parse.Query(Blog)).descending('createdAt')
	}),
	BlogsAdminView = Parse.View.extend({
		template: Handlebars.compile($('#admin-tpl').html()),
		events: {
			'click .app-edit': 'edit'
		},
		edit: function(e){
			e.preventDefault();
			var href = $(e.target).attr('href');
			blogRouter.navigate(href, { trigger: true });
		},
		render: function() {
			var collection = { 
				username: this.options.username,
				blog: this.collection.toJSON() 
			};
			this.$el.html(this.template(collection));
		}
	});
	
	// var blogs = new Blogs();
	
	var BlogsView = Parse.View.extend({
	    template: Handlebars.compile($('#blogs-tpl').html()),
	    render: function(){ 
	        var collection = { blog: this.collection.toJSON() };
	        this.$el.html(this.template(collection));
	    }
	});

	// blogs.fetch({
		// success: function(blogs) {
			// console.log(blogs);
			// var blogsView = new BlogsView({ collection: blogs });
		    // blogsView.render();
		    // $container.html(blogsView.el);
		// },
		// error: function(blogs, error){
			// console.log(error);
		// }
	// });
	
	var BlogRouter = Parse.Router.extend({  
        // Shared variables can be defined here.
        initialize: function(options){
            this.blogs = new Blogs();
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
            'admin': 'admin',
            'login': 'login',
            'add': 'add',
            'edit/:id': 'edit'
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
        admin: function() {
			// Call current user from Parse.
			var currentUser = Parse.User.current();
		 
			//Check login
			if (!currentUser) BlogApp.navigate('#/login', { trigger: true });
		 
			this.blogs.fetch({
				success: function(blogs) {
					var blogsAdminView = new BlogsAdminView({ 
						//Pass current username to be rendered in the #admin-tpl depending html tag.
						username: currentUser.get('username'),
						collection: blogs 
					});
					blogsAdminView.render();
					$container.append(blogsAdminView.el);
				},
				error: function(blogs, error) {
					console.log(error);
				}
			});
		},
        login: function() {
			var loginView = new LoginView();
			loginView.render();
			$container.html(loginView.el);
		},
        add: function() {
		// Check login
		if (!Parse.User.current()) {
				this.navigate('login', { trigger: true });
			} else {
				var writeBlogView = new WriteBlogView();
				writeBlogView.render();
				$container.html(writeBlogView.el);
			}
		},
		edit: function(id) {
			// Check login
			if (!Parse.User.current()) {
				this.navigate('login', { trigger: true });
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
		}     
    }),
    blogRouter = new BlogRouter();
 
	blogRouter.start(); 

});