$(function() {

	var Parse = require('parse');
	var ParseReact = require('parse-react');
	var React = require('react');
	var ReactDom = require('react-dom');
	var Router = require('react-router').Router;
	var Route = require('react-router').Route;
	var IndexLink = require('react-router').IndexLink;
	var Link = require('react-router').Link;
	var IndexRoute = require('react-router').IndexRoute;
	// var DOMPurify = require('dompurify');
	// var ReactDomServer = require('react-dom/server');
	// var HtmlToReact = require('html-to-react');
    
	
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
		Blogs = React.createClass({
			mixins: [ParseReact.Mixin],
			observe: function(){
				return{
					blogs: (new Parse.Query(Blog)).descending('createdAt')
				};
			},
			render: function(){
				return (
					<div className="contact-content">
					{
						this.data.blogs.map(function(b) {
							// var htmlInput = b.content;
							// var htmlToReactParser = new HtmlToReact.Parser(React);
							// var reactComponent = htmlToReactParser.parse(htmlInput);
							// var reactHtml = ReactDomServer.renderToStaticMarkup(reactComponent);
							// var clean = DOMPurify.sanitize(b.content, {ALLOWED_TAGS: ['b', 'a', 'div', '&nbsp;', '&gt;']});
							return (
								<div className="blog-post">
									<h2 className="page-header"><a href="#">{b.title}</a></h2>
									<div className="blog-content" dangerouslySetInnerHTML={{__html: b.content}}></div>
									<p className="blog-post-meta">At {b.time} by {b.authorName}</p>
								</div>
							);
						})
					}
					</div>
				);
			}
		}),
		Projects = React.createClass({
			mixins: [ParseReact.Mixin],
			observe: function(){
				return{
					projects: (new Parse.Query(Project)).descending('createdAt')
				};
			},
			render: function(){
				return(
					<div className="contact-content">
      					<div className="row">
      					{
      						console.log(this.data),

  		  					this.data.projects.map(function(p) {

								var img = p.image;
  		  						// img = p.get('image').url;
  		  						console.log(img);

  		  						return (
		        					<div className="col-lg-12">
										<h2 className="page-header" ><Link to={'/project/' + p.objectId}>{p.title}</Link></h2>
		          						<div className="col-lg-3 col-md-4 col-xs-6 thumb">
			              					<Link className="thumbnail" to={'/project/' + p.objectId }>
			                					<img className="img-responsive" src={ img } alt="" />
			              					</Link>
		          						</div>
		  		    					<p>{p.summary}</p>
		        					</div>
		        				);
		        			})
  		  				}
      					</div>
      					
    				</div>
				);
			}
		}),
		ProjectView = React.createClass({
			mixins: [ParseReact.Mixin],
			observe: function(){
				var projectId = this.props.params.id;
				console.log(projectId);
				return {
					project: (new Parse.Query(Project)).equalTo("objectId", this.props.params.id)
				};
			},
			render: function(){
				console.log(this.data.project);
				return(
					<div>
					{
						this.data.project.map(function(p) {
							return(
								<div className="contact-content">
										<div className="blog-post">
											<h2 className="page-header">{p.title}</h2>
											<div dangerouslySetInnerHTML={{__html: p.content}}></div>
											<p className="blog-post-meta">At {p.time} by {p.authorName}</p> 
										</div>				 
								</div>
							);
						})
					}
					</div>
				);
			}
		}),

		Header = React.createClass({
		  render() {
		    return (
				<div className="blog-header">
					<h1><a className="blog-title" href="./">The Very Personal Blogolio</a></h1>
					<p className="lead blog-description">This is a portfolio blog about some projects i did.</p>
				</div>
			)
		  }
		}),
		
		SideBar = React.createClass({
			render() {
				return (
					<div id="sidebar-info" className="col-sm-3 col-sm-offset-1 blog-sidebar">
						<div className="widget sidebar-module sidebar-module-inset">
							<h2 className="widget-title">About Timo Obereder</h2>
							<div>
								<img className="me" src="src/assets/avatar.jpg" alt="Avatar Icon" scale="0" />
								<div>
									<p><em>Hi! My name is Timo and i'm Software Developer with over 4 years of experience designing and developing mobile 
									(mostly Android) applications. Follow me on Twitter </em><a target="_blank" href="https://twitter.com/defuex">here'</a></p>
								</div>
							</div>
						</div>
						<div className="sidebar-module">
							<h4>Archives</h4>
							<ul className="list-unstyled">
								<li><a href="#">Dezember 2015</a></li>
								<li><a href="#">November 2015</a></li>
							</ul>
						</div>
						<div className="sidebar-module">
							<h4>Elsewhere</h4>
							<ol className="list-unstyled">
								<li><a className="btn btn-social-icon btn-github" target="_blank" href="https://github.com/DeFuex"><span className="fa fa-github"></span></a></li>
								<li><a className="btn btn-social-icon btn-twitter" target="_blank" href="https://twitter.com/defuex"><span className="fa fa-twitter"></span></a></li>
								<li><a className="btn btn-social-icon btn-linkedin" target="_blank" href="https://at.linkedin.com/in/timo-obereder-11b65167"><span className="fa fa-linkedin"></span></a></li>
							</ol>
						</div>
					</div>
				)
			}

		}),
		
		Footer = React.createClass({
			render() {
				return (
				<div>
					<footer className="blog-footer">
					  <p>© 2015 Timo Obereder</p>
					  <p>
						<a href="#">Back to top</a>
					  </p>
					</footer>
				</div>
				)
			}
		}),

		App = React.createClass({
			render(){
				return (
					<div>
					<Header />
						<div className="blog-masthead">
							<div className="container">
								<nav className="nav">
								<ul>
									<li><IndexLink className="blog-nav-item transition" to="/">Home</IndexLink></li>
									<li><Link className="blog-nav-item transition" to="/about">About</Link></li>
									<li><Link className="blog-nav-item transition" to="/projects">Projects</Link></li>        	  
									<li><Link className="blog-nav-item transition" to="/contact">Contact</Link></li>
									<li><Link className="blog-nav-item transition" to="/admin">Admin</Link></li>
								</ul>
								
								</nav>
								
							</div>
						</div>
						{ /*this.props.children renders every View underneath the Links navigation bar defined inside the top <div> of the App class.*/ }
						<div id="blog-home" className="container">
							<div id="blog-row" className="row">
								<div id="blog-container" className="col-sm-7 blog-main">
									<div>{this.props.children}</div>
								</div>
								<SideBar />
							</div>
						</div>
					<Footer />
					</div>
				)
			}
		}),
		
		Home = React.createClass({
			render(){
				return(
					<Blogs />
				)
			}
		}),

		About = React.createClass({
			render(){
				return (
					<div className="contact-content">
						<h2 className="page-header">About</h2>
						<div className="blog-content">
							I'm a web/mobile (mostly Android) developer from Austria and I always look for ways to improve my skills in certain technologies.
							<br/>
							<br/>
							I recently finished my masters degree and I'm currently working at Ebcont Technologies GmbH, a consulting company which develops many customer based services in the fields of software, mobile and web development.
							<br/>
							<br/>
							During my time as student i had the chance to study abroad in South Korea at Korea University for 1 semester. I could get an insight on some cultural differences and travel to nearby areas, different places and also Japan. Overall, it was a nice experience and my stopover in Japan gave me motivation to finally enroll myself into a japanese language course back in my hometown Vienna. Learning a third language never can't be that bad actually...
							<br/>
							<br/>
							Besides my little adventures, my passions are -
							<br/>
							<br/>
							<ul>
								<li>Developing Android applications.</li>
								<li>Drawing and a little bit 3D modelling to it.</li>
								<li>I'm also interested in the field of Computer Graphic programming.</li>
								<li>Sometimes I play Counter Strike Global Offensive with friends.</li>
								<li>If the time allows it i do sports like endurance and strength training or skiing in winter.</li>
								<li>And of course, learning Japanese</li>
							</ul>
						</div>
					</div>
				)
			}
		}),

		Contact = React.createClass({
			render(){
				return(
					<div className="contact-content">
					  <h2 className="page-header" >Contact</h2>
					  <p className="contact-description">
						I love hearing from people landing on my site, so use the little form below
						should you have a question, recommendation, or request for me. I will try my best
						to get back to you.
					  </p>
					  <form id="contactForm" className="contact-form" role="form">
						<p>
						  <label htmlFor="title">First Name</label><br/>
						  <input id="contactFirstName" name="firstname" type="text" />
						</p>
						<p>			
						  <label htmlFor="title">Last Name</label><br/>
						  <input id="contactLastName" name="firstname" type="text" />
						</p>
						<p>
						  <label htmlFor="email">Email</label><br/>
						  <input id="email" name="email" type="email" />
						</p>
						<p>
						  <label htmlFor="subject">Subject</label><br/>
						  <input id="subject" name="subject" type="text" />
						</p>
						<p>
						  <label htmlFor="content">Content</label><br/>
						  <textarea id="content" name="content" rows="10" ></textarea>
						</p>
						<p>
							<input type="submit" value="Submit" className="contactButton" />
						</p>
					  </form>
					</div>
				)
			}
		}),

		Admin = React.createClass({
			render(){
				return(
					<div>
					<a href="#/add" className="add-blog btn btn-lg btn-primary">Add a New Blog</a>
					<a href="#/logout" className="add-blog btn btn-lg">Logout</a>
					<table>
						<thead>
							<tr>
								<th>Title</th>
								<th>Author</th>
								<th>Time</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
					</div>
				)
			}
		});

		ReactDom.render((
			<Router>
				<Route path="/" component={App}>
					<IndexRoute component={Home} />
					<Route path="about" component={About} />	
					<Route path="projects" component={Projects} />
					<Route path="project/:id" component={ProjectView} />
					<Route path="contact" component={Contact} />
					<Route path="admin" component={Admin} />
				</Route>
			</Router>
		), document.getElementById('app'))
		

		// '': 'index',
		// 'blog/:id': 'blog',
		// 'projects': 'projects',
		// 'project/:id': 'project', 
		// 'admin': 'admin',
		// 'login': 'login',
		// 'logout': 'logout',
		// 'add': 'add',
		// 'edit/:id': 'edit',
		// 'del/:id': 'del',
		// 'addp': 'addproject',
		// 'editp/:id': 'editproject',
		// 'delp/:id': 'delproject',
		// 'about': 'about',
		// 'contact': 'contact'

		// LoginView = Parse.View.extend({
			// template: Handlebars.compile($('#login-tpl').html()),
			// events:{
				// 'submit .form-signin': 'login'
			// },
			// login: function(e){
				// // Prevent Default Submit Event
				// e.preventDefault();
			 
				// // Get data from the form and put them into variables
				// var data = $(e.target).serializeArray(),
					// username = data[0].value,
					// password = data[1].value;
			 
				// // Call Parse Login function with those variables
				// Parse.User.logIn(username, password, {
					// // If the username and password matches
					// success: function(user) {
						// // var welcomeView = new WelcomeView({model: user});
						// // welcomeView.render();
						// // $container.html(welcomeView.el);
						// blogRouter.navigate('#/admin', { trigger: true });
					// },
					// // If there is an error
					// error: function(user, error) {
						// console.log(error);
					// }
				// });
			// },
			// render: function(){
				// this.$el.html(this.template());
			// }
		// }),
		// BlogsAdminView = Parse.View.extend({
			// template: Handlebars.compile($('#admin-blogs-tpl').html()),
			// render: function() {
				// var collection = { 
					// username: this.options.username,
					// blog: this.collection.toJSON()
				// };
				// this.$el.html(this.template(collection));
			// }
		// }),		
		// ProjectsAdminView = Parse.View.extend({
			// template: Handlebars.compile($('#admin-projects-tpl').html()),
			// render: function() {
				// var collection = { 
					// username: this.options.username,
					// project: this.collection.toJSON()
				// };
				// this.$el.html(this.template(collection));
			// }
		// }),
		// WriteBlogView = Parse.View.extend({
			// // initialize: function(options){
			// // 	_.bindAll(this, 'submit', 'beforeRender', 'render', 'afterRender');
			// // 	var _this = this;
			// // 	this.render = _.wrap(this.render, function(render) {
			// // 		_this.beforeRender();
			// // 		render();
			// // 		_this.afterRender();
			// // 		return _this;
			// // 	});
			// // },
			// template: Handlebars.compile($('#write-tpl').html()),
			// events: {
				// 'submit .form-write': 'submit'
			// },
			// submit: function(e) {
				// e.preventDefault();
				// var data = $(e.target).serializeArray();
				// // If there's no blog data, then create a new blog
				// this.model = this.model || new Blog();
				// this.model.update({
						// title: data[0].value,
						// summary: data[1].value, 
						// content: data[2].value
					// });
			// },
			// // beforeRender: function(){
			// // 	console.log('beforeRender');
			// // },
			// render: function(){
				// var attributes;
				// // If the user is editing a blog, that means there will be a blog set as this.model
				// // therefore, we use this logic to render different titles and pass in empty strings
				// if (this.model) {
					// attributes = this.model.toJSON();
					// attributes.form_title = 'Edit Blog';
				// } else {
					// attributes = {
						// form_title: 'Add a Blog',
						// title: '',
						// summary: '',
						// content: ''
					// }
				// }
				// this.$el.html(this.template(attributes))

				// // .find('.write-content').on('load', function (){
				// // 	tinymce.init({
				// //   		setup: function(e){
				// //   			e.on('init', function(args) {
				// //   				console.debug(args.target.id);
				// //   			})
				// //   		},
				// //         selector: "textarea.form-control",
				// //         plugins: [
				// //         	"media table paste "
				// //         ],
				// //         toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter      alignright alignjustify | bullist numlist outdent indent | link image"
				// // 	});
				// // });

				// .promise().done(function (){
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
				// });
			// }
			// // ,
			// // afterRender: function(){
			// // 	console.log('afterRender');
			// // }
		// }),		
		// WriteProjectView = Parse.View.extend({
			// template: Handlebars.compile($('#write-tpl').html()),
			// events: {
				// 'submit .form-write': 'submit'
			// },
			// submit: function(e) {
				// e.preventDefault();
				// var data = $(e.target).serializeArray();
				// // If there's no project data, then create a new project
				// this.model = this.model || new Project();
				// this.model.update({
						// title: data[0].value,
						// // image: data.image.url,
						// summary: data[1].value,
						// content: data[2].value
					// });
			// },
			// render: function(){
				// var attributes;
				// // If the user is editing a blog, that means there will be a blog set as this.model
				// // therefore, we use this logic to render different titles and pass in empty strings
				// if (this.model) {
					// attributes = this.model.toJSON();
					// attributes.form_title = 'Edit Project';
				// } else {
					// attributes = {
						// form_title: 'Add a Project',
						// title: '',
						// image: '',
						// summary: '',
						// content: ''
					// }
				// }

				// this.$el.html(this.template(attributes)).find('.write-content');
				// loadTinyMCE();
			// }
		// }),
		// AboutView = Parse.View.extend({
			// template: Handlebars.compile($('#about-tpl').html()),
			// render: function() {
				// var attributes
				// attributes = {
					// form_title: 'About'
				// }
				// this.$el.html(this.template);
			// }
		// }),
		// ContactView = Parse.View.extend({
			// template: Handlebars.compile($('#contact-tpl').html()),
			// render: function(){
				// var attributes;
				// attributes = {
					// form_title: 'Contact'
				// }
				// this.$el.html(this.template(attributes));
			// }
		// }),
		// BlogRouter = Parse.Router.extend({  
			// Shared variables can be defined here.
			// initialize: function(options){
				// this.blogs = new Blogs();
				// this.projects = new Projects();
			// },
			// Router start point.
			// start: function(){
				// Parse.history.start({ 
				// root: '/Blogolio/'
				// pushState: true 
				// });
				// this.navigate('', { trigger: true });
			// },			
			// Map functions to urls.
			// '{{URL pattern}}': '{{function name}}'
			// routes: {
				// '': 'index',
				// 'blog/:id': 'blog',
				// 'projects': 'projects',
				// 'project/:id': 'project', 
				// 'admin': 'admin',
				// 'login': 'login',
				// 'logout': 'logout',
				// 'add': 'add',
				// 'edit/:id': 'edit',
				// 'del/:id': 'del',
				// 'addp': 'addproject',
				// 'editp/:id': 'editproject',
				// 'delp/:id': 'delproject',
				// 'about': 'about',
				// 'contact': 'contact'
			// },
			// index: function() {
				// this.blogs.fetch({
					// success: function(blogs) {
						// var blogsView = new BlogsView({ collection: blogs });
						// blogsView.render();
						// $container.html(blogsView.el);
					// },
					// error: function(blogs, error){
						// console.log(error);
					// }
				// });
			// },
			// blog: function(id){
				// var query = new Parse.Query(Blog);
				// query.get(id, {
					// success: function(blog) {
						// console.log(blog);
						// var blogView = new BlogView({ model: blog });
						// blogView.render();
						// $container.html(blogView.el);
					// },
					// error: function(blog, error){
						// console.log(error);
					// }
				// })
			// },
			// projects: function(){
				// this.projects.fetch({
					// success: function(projects) {
						// var projectsGalleryView = new ProjectsGalleryView({ collection: projects });
						// projectsGalleryView.render();
						// $container.html(projectsGalleryView.el);
					// },
					// error: function(projects, error){
						// console.log(error);
					// }
				// })
			// },
			// project: function(id){
				// var ProjectViewShow = React.createClass({
					// render: function(){
						// return <ProjectView projectid={id} />
					// }
				// })
				// ReactDom.render(<ProjectViewShow />, document.getElementById('main-container'));
			// },
			// admin: function() {
				// // Call current user from Parse.
				// var currentUser = Parse.User.current();
			 
				// //Check login
				// if (!currentUser) {
					// this.navigate('#/login', { trigger: true });
				// } else {
					// $.when(
						// this.blogs.fetch({
							// success: function(blogs) {
								// var blogsAdminView = new BlogsAdminView({ 
									// //Pass current username to be rendered in the #admin-blogs-tpl depending html tag.
									// username: currentUser.get('username'),
									// collection: blogs
								// });
								// blogsAdminView.render();
								// $container.html(blogsAdminView.el);
							// },
							// error: function(blogs, error) {
								// console.log(error);
							// }
						// })
						// ,
						// this.projects.fetch({
							// success: function(projects) {
								// var projectsAdminView = new ProjectsAdminView({
									// username: currentUser.get('username'),
									// collection: projects
								// });
								// projectsAdminView.render();
								// $('#projects-container').html(projectsAdminView.el);
							// },
							// error: function(projects, error) {
								// console.log(error);
							// }
						// })
					// )
				// }
			// },
			// login: function() {
				// var loginView = new LoginView();
				// loginView.render();
				// $container.html(loginView.el);
			// },
			// logout: function(){
				// Parse.User.logOut();
				// this.navigate('#/login', {trigger: true });
			// },
			// add: function() {
				// // Check login
				// if (!Parse.User.current()) {
					// this.navigate('#/login', { trigger: true });
				// } else {
					// var writeBlogView = new WriteBlogView();
					// writeBlogView.render();
					// tinymce.remove();
					// $container.html(writeBlogView.el);
				// }
			// },
			// edit: function(id) {
				// // Check login
				// if (!Parse.User.current()) {
					// this.navigate('#/login', { trigger: true });
				// } else {
					// var query = new Parse.Query(Blog);
					// query.get(id, {
						// success: function(blog) {
							// var writeBlogView = new WriteBlogView({ model: blog });
							// writeBlogView.render();
							// $container.html(writeBlogView.el);
						// },
						// error: function(blog, error) {
							// console.log(error);
						// }
					// });
				// }
			// },
			// del: function(id){
				// if (!Parse.User.current()) {
					// this.navigate('#/login', { trigger: true });
				// } else {
					// var self = this,
					// query = new Parse.Query(Blog);
					// query.get(id).then(function(blog){
						// blog.destroy().then(function(blog){
							// self.navigate('admin', { trigger: true });
						// })
					// });
				// }
			// },
			// addproject: function() {
				// // Check login
				// if (!Parse.User.current()) {
					// this.navigate('#/login', { trigger: true });
				// } else {
					// var writeProjectView = new WriteProjectView();
					// writeProjectView.render();
					// $container.html(writeProjectView.el);
				// }
			// },
			// editproject: function(id) {
				// // Check login
				// if (!Parse.User.current()) {
					// this.navigate('#/login', { trigger: true });
				// } else {
					// var query = new Parse.Query(Project);
					// query.get(id, {
						// success: function(project) {
							// var writeProjectView = new WriteProjectView({ model: project });
							// writeProjectView.render();
							// $container.html(writeProjectView.el);
						// },
						// error: function(project, error) {
							// console.log(error);
						// }
					// });
				// }
			// },
			// delproject: function(id){
				// if (!Parse.User.current()) {
					// this.navigate('#/login', { trigger: true });
				// } else {
					// var self = this,
					// query = new Parse.Query(Project);
					// query.get(id).then(function(project){
						// project.destroy().then(function(project){
							// self.navigate('admin', { trigger: true });
						// })
					// });
				// }
			// },
			// about: function(){
				// var aboutView = new AboutView();
				// aboutView.render();
				// $container.html(aboutView.el);
			// },
			// contact: function(){
				// var contactView = new ContactView();
				// contactView.render();
				// $container.html(contactView.el);
			// }      
		// }),
		// blogRouter = new BlogRouter();
	 
		// blogRouter.start(); 
	
	$(document).ready(function(){
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

$(document).ready(function(){

	//Fade in/out functionalities.
	$('.blog-main').css("display", "none");
 
	$('.blog-main').fadeIn(300);
 
	$('a.transition').click(function(event){
		event.preventDefault();
		var linkLocation = this.href;
		console.log(linkLocation);
		$('.blog-main').fadeOut(300, function(){
			window.location = linkLocation;
			$('.blog-main').fadeIn(700);
		});      
	});

});

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

