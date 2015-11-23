$(function() {
 
    Parse.$ = jQuery;
	
	//Connection to the Parse Database Webserver.
	Parse.initialize("EvmOpxAGXkDDS9IOETIptyHZAJDn3Ax7Af3v7VQQ", "doRuBShVrZ9hP6d5lHYWd00SYvxmHVnIBBwm7OxI");
	
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
		        	// $('.main-container').html(welcomeView.el);
					blogRouter.navigate('admin', { trigger: true});
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
    WelcomeView = Parse.View.extend({
        template: Handlebars.compile($('#welcome-tpl').html()),
        events: {
        	'click .add-blog': 'add'
        },
        add: function(){
			blogRouter.navigate('add', { trigger: true });
        },
        render: function(){
            var attributes = this.model.toJSON();
            this.$el.html(this.template(attributes));
			// var blogs = new Blogs();
			// blogs.fetch({
				// success: function(blogs) {
					// var blogsAdminView = new BlogsAdminView({collection: blogs });
					// blogsAdminView.render();
					// $('.main-container').append(blogsAdminView.el);
				// },
				// error: function(blogs, error){
					// console.log(error);
				// }
			// });
        }
    });


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
				'content': content
			}).save(null, {
				success: function(blog) {
					alert('Your changes on blog ' + blog.get('title') + ' have been saved!');
				},
				error: function(blog, error) {
					console.log(blog);
					console.log(error);
				}
			});
		}
	});

    var AddBlogView = Parse.View.extend({
    	template: Handlebars.compile($('#add-tpl').html()),
    	events: {
    		'submit .form-add': 'submit'
    	},
    	submit: function(e){
    		// Submit functionality goes here.
    		// Prevent Default Submit Event     
		    e.preventDefault();
		    // Take the form and put it into a data object
		    var data = $(e.target).serializeArray(),
		    // Create a new instance of Blog
		        blog = new Blog();
		    // Call .create()
		    blog.create(data[0].value, $('textarea').val());
    	},
    	render: function(){
    		this.$el.html(this.template()).find('textarea').wysihtml5();
    	}
    });
	
	var EditBlogView = Parse.View.extend({
		template: Handlebars.compile($('#edit-tpl').html()),
		events: {
			'submit .form-edit': 'submit'
		},
		submit: function(e){
			e.preventDefault();
			var data = $(e.target).serializeArray();
			this.model.update(data[0].value, $('textarea').val());
		},
		render: function(){
			var attributes = this.model.toJSON();
			this.$el.html(this.template(attributes));
		}
	})
	
	var Blogs = Parse.Collection.extend({
		model: Blog
	}),
	BlogsAdminView = Parse.View.extend({
		template: Handlebars.compile($('#blogs-admin-tpl').html()),
		events: {
			'click .app-edit': 'edit'
		},
		edit: function(e){
			e.preventDefault();
			var href = $(e.target).attr('href');
			blogRouter.navigate(href, { trigger: true });
		},
		render: function() {
			var collection = { blog: this.collection.toJSON() };
			this.$el.html(this.template(collection));
		}
	});
	
	var BlogRouter = Parse.Router.extend({  
        // Shared variables can be defined here.
        initialize: function(options){
            this.blogs = new Blogs();
        },
        // Router start point.
        start: function(){
            Parse.history.start({pushState: true});
			this.navigate('admin', { trigger: true});
		},			
        // Map functions to urls.
        // '{{URL pattern}}': '{{function name}}'
        routes: {
            'admin': 'admin',
            'login': 'login',
            'add': 'add',
            'edit/:id': 'edit'
        },
        admin: function() {
			// Call current user from Parse.
			var currentUser = Parse.User.current();
		 
			if ( !currentUser ) {
				// URL redirect.
				blogRouter.navigate('login', { trigger: true });
			} else {
				var welcomeView = new WelcomeView({ model: currentUser });
				welcomeView.render();
				$('.main-container').html(welcomeView.el);
		 
				// We change it to this.blogs so it stores the content for other Views
				// Remember to define it in BlogRouter.initialize()
				this.blogs.fetch({
					success: function(blogs) {
						var blogsAdminView = new BlogsAdminView({ collection: blogs });
						blogsAdminView.render();
						$('.main-container').append(blogsAdminView.el);
					},
					error: function(blogs, error) {
						console.log(error);
					}
				});
			}
		},
        login: function() {
			var loginView = new LoginView();
			loginView.render();
			$('.main-container').html(loginView.el);
		},
        add: function() {
			var addBlogView = new AddBlogView();
			addBlogView.render();
			$('.main-container').html(addBlogView.el);
		},
        edit: function(id) {
			// Define a new query and tell it which table should it go for
			var query = new Parse.Query(Blog);
			// Pass the id as the first parameter in .get() function to look up an object.
			query.get(id, {
				success: function(blog) {
					// If the blog was retrieved successfully.
					var editBlogView = new EditBlogView({ model: blog });
					editBlogView.render();
					$('.main-container').html(editBlogView.el);
				},
				error: function(blog, error) {
					// If the blog was not retrieved successfully.
					console.log(error);
				}
			});
		}      
    }),
    blogRouter = new BlogRouter();
 
	blogRouter.start(); 

});