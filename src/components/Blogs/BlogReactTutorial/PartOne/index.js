import React, { Component } from 'react';
import { Link } from 'react-router';
import '../entry.css';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { rainbow } from 'react-syntax-highlighter/dist/styles';

export default class Part1 extends Component {

	constructor(props) {
		super(props);
		this.hideSideBar = this.hideSideBar.bind(this)
		this.showSideBar = this.showSideBar.bind(this)

		const initialCodeString = `const woah = fun => fun + 1;
															const dude = woah(2) + 3;
															function thisIsAFunction() {
															return [1,2,3].map(n => n + 1).filter(n !== 3);
															}
															console.log('making up fake code is really hard');
															function itIs() {
															return 'no seriously really it is';
															}
															`;
		this.state = {
			code: initialCodeString
		}
	}

	hideSideBar(){
		this.props.onHideSideBar;
	}

	showSideBar(){
		this.props.onShowSideBar;
	}

	render(){
		return (
			<div className="row">
					<div className="entry-content-main">
					  <h2 className="autoresize">Tutorial - Part 1</h2>
						<div className="entry-content">
						<br/>
						<h3 className="autoresize">New vs. „Old“ Web Development</h3>
							<p>The world of web and mobile development is full of new and emerging technologies. And one thing is certain - change is coming, as it always does. This latest change I’m thinking of is called React (reactjs). As of the publication of this article React is an already known part in web development. Many have heard of it and may have understood it as the View part of the MVC pattern (which is not entirely true), and many are still trying to change their development process with it using a mix of npm and redux functionalities. Most are probably fighting with redux features and the way of implementing functional programming paradigms into their applications, since there are no obligatory ways that show how things should be (that is why react and redux are a beautiful combination :) ). This article, however, will take a step back and go more into detail about a maintainable project structure for development and production, how to actually use react within that architecture, and why it is helpful to know your way around webpack for bigger production configurations.
							</p>
<br/>
<p>
You may also have read my first blog entry, which is a hint as to what’s still to come. This whole blog page is created using React and as a general explanation, I will show you how things are done building your own single web blog page by demonstrating the whole „code in development“, which was used to build this little blog page of my own. Going one step further, I will show you the configurations to build static content and how to host it on Github as your web page. That’s all. Let’s start with the project structure.
</p>
<br/>
<h3 className="autoresize">Project Structure (Flux architecture)</h3>
<p>
You may have read about new web development structures based almost entirely on pure javascript files instead of on html. The only thing you need to know at the moment is that we will use the so called flux architecture to build first steps, since this tutorial should be more of a practical guide than a theoretical one, but feel free to read the following page if you really want to know why the flux architecture is a commonly used way to structure your react projects => <a target="_blank" href="https://facebook.github.io/flux/docs/overview.html">{"https://facebook.github.io/flux/docs/overview.html"}</a> . The following structure illustrates the whole blog web page in development within the flux architecture.
</p>
<br/>
<br/>
<p>
/Blogolio
favicon.ico
index.html
index.html.js
LICENSE
makeconfig.js
package.json
README.md
server.dev.js
server.prod.js
webpack.dev.config.js
webpack.prod.config.js
		|
		 – src
			index.js
|
 – assets
|
 – components
|
 – containers
|
 – reducers
|
 – store
|
 – utils
</p>
<br/>
<br/>
<p>
Since we are building the project step by step, create your project folder named as you like e.g.: i used Blogolio as my project folder name. For now, please use the structure above to create files and folders which are NOT greyed out. If you are finished you should have a project folder named e.g.: Blogolio, 1 underlying file (index.html) and an underlying src folder. Within that src folder you should have 1 index.js file and 3 folders (assets, components, containers). These folders are pretty much everything you gonna need, but we will add more later on, don’t worry.
</p>
<br/>
<h3 className="autoresize">npm</h3>
<p>
We will use a node server to run and test our development project. That means we will need to install npm (node package manager). If you don’t have it, get it here => <a target="_blank" href="https://www.npmjs.com/">"https://www.npmjs.com/"</a> , it’s essential for handling all dependencies in our project and also includes every script call we need to build our web app. We are not going to use grunt or any other build tools since we do not need them. Don’t come back to this tutorial until you’ve set up npm properly. It’s really important!
</p>
<p>
Npm and webpack together are a good way to handle things on their own, but if you still feel the need to use a build tool like grunt, I don’t mind.
</p>
<br/>
<p>
For the „old“ web development folks out there, you are probably going to notice that there is no xampp, no mampp, or any other server test deployment tool involved. Neither is the project structure directly for static websites. Welcome to the new way of web development. At the end of this tutorial series we’re going to be more dynamic to create the content we want, specified as configuration in production.
</p>
<p>
As I said, we’re going to have a node server to test our development environment. Therefore we are going to need something which creates our test dev node server. We need to use npm to create our project dependency file, which is called package.json. To do that, open your project folder in the terminal and type in the following command.
</p>
<SyntaxHighlighter language='json' style={rainbow}>
npm init
</SyntaxHighlighter>
<p>
For a faster configuration type in
</p>
<SyntaxHighlighter language='json' style={rainbow}>
npm init –y
</SyntaxHighlighter>
<p>
After finishing the process you will have a package.json file where we define every package dependency we need in the project. To be more specific, you do not need to download script files and add them globally to your .html files, since we „require“ those scripts through dependencies from this package.json file inside javascript code. Sounds strange? Don’t worry, you will get a hang of it.
</p>
<p>
We are going to start building up our local node server by adding our first dependencies.
</p>
<SyntaxHighlighter language='json' style={rainbow}>
npm install --save-dev webpack
npm install --save-dev webpack-dev-server
</SyntaxHighlighter>
<p>
or simply
</p>
<SyntaxHighlighter language='json' style={rainbow}>
npm install --save-dev webpack webpack-dev-server
</SyntaxHighlighter>
<p>
We added webpack and webpack-dev-server, which are independent components. Webpack is our building tool we are going to use to decide if we want to build in development or in production and webpack-dev-server is our package we will use to configure our local node server which is used in the development build phase inside of webpack.
<br/>
Also, just to see how it looks, open up your package.json file in any editor if you haven’t done so already. I recommend using Atom for web development. Add the whole project folder to your editor of choice. If you look at the root folder of your project you will also notice a folder named node_modules. It was created downloading and adding our first „library“ dependencies. The npm install command does not only add dependencies to the package.json file, but also downloads them into a common folder named node_modules.
<br/>
Something you may still be wondering about - now that we’ve installed the packages and added them as dependencies to our project, how does the project know how to build itself? It doesn’t, therefore we create some new files. Look at the project structure and add the missing files
</p>
<p>
/Blogolio
favicon.ico
index.html
index.html.js
LICENSE
makeconfig.js
package.json
README.md
server.dev.js
server.prod.js
webpack.dev.config.js
webpack.prod.config.js
		|
		 – src
			index.js
|
 – assets
|
 – components
|
 – containers
|
 – reducers
|
 – store
|
 – utils
</p>
<br/>
<p>
The reason why we do not have one master configuration file for everything is simple. We need to use npm in order to run different script commands. This includes building for development or production. We haven’t added configurations for production yet and will only focus on the development part for now. Please be patient and read every step carefully in this tutorial. Open up your package.json file and update its content to look like the following script commands in the scripts section.
</p>
<br/>
<br/>
<SyntaxHighlighter language='json' style={rainbow}>
{`"scripts": {
    "start": "cross-env NODE_ENV=development node server.dev.js",
    "build": "cross-env NODE_ENV=production webpack --config webpack.prod.config.js --progress --colors",
    "test": "echo \"Error: no test specified\" && exit 1",
    "clean": "rm -rf build"
  }
	`
}
</SyntaxHighlighter>
<br/>
<p>You can call all the script commands via npm, e.g.:</p>
<SyntaxHighlighter language='json' style={rainbow}>
{
`npm start
npm test
`
}
</SyntaxHighlighter>
<p>
or
</p>
<SyntaxHighlighter language='json' style={rainbow}>
{
`npm run build
npm run clean
`
}
</SyntaxHighlighter>
<p>
As you can see, two of the script commands are called without „run“. Some script commands are predefined in npm and don’t need to be explicitly called with „run“. You can look up a list of all commands on npm’s website.
</p>
<br/>
<p>
Back to the topic. On the right side of every script call are your own defined commands. Which means, if i run npm start, the <b>„cross-env NODE_ENV=development node server.dev.js“</b> part will be called.
</p>
<p>
<span className="code">NODE_ENV</span> = is an environment variable which is mainly used to check if a node application is in production or development. A typical use-case is to give additional log or debug information if the variable is set to development.
</p>
<p>
<span className="code">Cross-env</span> = it is used to set the NODE_ENV variable regardless of the operating system.
</p>
<p>
In unix systems the variable is set e.g.:
</p>
<SyntaxHighlighter language='json' style={rainbow}>
{
	`export NODE_ENV=production`
}
</SyntaxHighlighter>
<p>
while in windows systems it is set e.g.:
</p>
<SyntaxHighlighter language='json' style={rainbow}>
set NODE_ENV=production
</SyntaxHighlighter>
<p>
Since cross-env comes from package, install it through the following npm command.
</p>
<SyntaxHighlighter language='json' style={rainbow}>
npm install --save-dev cross-env
</SyntaxHighlighter>
<p>
Be sure to have cross-env installed so that you can develop without problems if you should switch the OS.
</p>
<br/>
<h3 className="autoresize">Webpack & webpack-dev-server</h3>
<p>
You may have recognized that we have set the development option to the npm start script command. There is also a command called node, which tries to call a node server from a javascript file called server.dev.js. This means that we have to define our development node server inside of this file. Open server.dev.js and copy the following code.
</p>
<SyntaxHighlighter language='javascript' style={rainbow}>
{
`// Gets called when running npm start

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');

console.log('Starting server...\n');

new WebpackDevServer(webpack(config), { // Start a server
  publicPath: config.output.publicPath,
  hot: true, // With hot reloading
  inline: false,
  historyApiFallback: true,
  quiet: true // Without logging
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server started');
    console.log('Listening at localhost:3000');
  }
});`
}
</SyntaxHighlighter>
<p>
As you can see, this is the first time we „require“ one of our package dependencies instead of having a global script tag inside an .html file. We practically define a variable and use all package methods with it. Everything seems to be set up now, right? Wrong. If we call npm start it will fail. We require webpack and webpack-dev-server, but we also require some file that isn’t in our npm package dependencies.
</p>
<br/>
<h3 className='autoresize'>Webpack config for development</h3>
<p>
Let’s put some code into webpack.dev.config!
</p>
<SyntaxHighlighter language='javascript' style={rainbow}>
{
`module.exports = require("./makeconfig")({
  prod: false
});`
}
</SyntaxHighlighter>
<p>
As the name implies, this file calls another file for configuration purposes. The reason to define an extra file is just to set a boolean value for development, so that the makeconfig.js file knows which kind of plugins need to be called. The module.exports command is specific to webpack configuration files. The webpack server loads all configurations by calling the webpack.dev.conf. It will return the content of the makeconfig.js file and specified plugins.
</p>
<br/>
<p>
To finish the project development setup, we need to write our makeconfig.js file and specify the used modules/plugins in development.
</p>
<p>
Let’s put some more code into our config (makeconfig.js) file!
</p>
<p>
First, we will start to add more packages to our dependency list.
</p>
<SyntaxHighlighter language='javascript' style={rainbow}>
{
`npm install --save-dev path html-webpack-plugin appcache-webpack-plugin extract-text-webpack-plugin`
}
</SyntaxHighlighter>
<p>
To explain everything I will tell you why we need to include those package dependencies.
</p>
<br/>
<p>
<span className='code'>path</span> = is a copy of the NodeJS path module and is used to find paths inside our project. Nothing more, nothing less.
( <a target='_blank' href='https://www.npmjs.com/package/path'>https://www.npmjs.com/package/path</a> )
</p>
<br/>
<br/>
<p>
<span className='code'>Html-webpack-plugin</span> = at some point we will need an entry point to host our website. This plugin is used to create an html5 template file ( index.html ) that includes all webpack bundles that are build. This means that every javascript file will be automatically added inside a {'<script>'} tag.
( <a target='_blank' href='https://www.npmjs.com/package/html-webpack-plugin'>https://www.npmjs.com/package/html-webpack-plugin</a> )
</p>
<p>
<span className='code'>Extract-text-webpack-plugin</span> = this plugin will be used to add a css file inside our template index.html via {'<link>'} tag. It kind of works together with the html-webpack-plugin.
( <a target='_blank' href='https://www.npmjs.com/package/extract-text-webpack-plugin'>https://www.npmjs.com/package/extract-text-webpack-plugin</a> )
</p>
<p>
It is important to know that you do not need to use this plugin for css components. In general every css definition will be added as inlined into the javascript bundle file that is created during the build process. In most cases though, it is better practice to add the extract-text-webpack-plugin to produce a main .css file and load the content parallel to the bundle.js file. Your build process will be faster since the bundle.js does not need to load every css definition on its own and is linked to css definition instead.
</p>
<p>
<span className='code'>Appcache-webpack-plugin</span> = a plugin to cache assets and create a manifest.appcache file.
( <a target='_blank' href='https://www.npmjs.com/package/appcache-webpack-plugin'>https://www.npmjs.com/package/appcache-webpack-plugin</a> )
</p>
<p>
<span className='code'>react-static-webpack-plugin</span> = this plugin will help to build our static web page content. More about this plugin later.
( <a target='_blank' href='https://www.npmjs.com/package/react-static-webpack-plugin'>https://www.npmjs.com/package/react-static-webpack-plugin</a> )
</p>
<p>
Open your makeconfig.js file and add the first lines of code:
</p>
<SyntaxHighlighter language='javascript' style={rainbow}>
{
`var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AppCachePlugin = require('appcache-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StaticSitePlugin = require('react-static-webpack-plugin');`
}
</SyntaxHighlighter>
<p>
Now that we defined our plugin variables we need to create some configurations with them. To let the webpack build process know that theses are needed configurations, we start to write a function declaration with the module.exports command.
</p>
<SyntaxHighlighter language='javascript' style={rainbow}>
{
  `module.exports = function(options){
  var entry, jsLoaders, plugins, cssLoaders;`
}
</SyntaxHighlighter>
<p>
Then we need to decide if we are in production or development. Remember that we gave the makeconfig.js file a boolean parameter from webpack.dev.conf to let the configuration know that we are in development.
</p>
<SyntaxHighlighter language='javascript' style={rainbow}>
{`//If production flag is set to true
if (options.prod) {

} else {

}`
}
</SyntaxHighlighter>
<p>
since we call webpack.dev.conf later on, the options.prod will be false, which means that we need to define our development settings in the else part.
</p>
<SyntaxHighlighter language='javascript' style={rainbow}>
{
`else {
	entry = [
		'webpack-dev-server/client?http://localhost:3000', //Needed for hot reloading
		'webpack/hot/only-dev-server',
		path.resolve(__dirname, 'src/index.js')
	];
	cssLoaders = 'style-loader!css-loader';

	plugins = [
	new webpack.HotModuleReplacementPlugin(), //for hot reloading
		new HtmlWebpackPlugin({
		template: 'index.html',
		inject: true
	})
	]
}`
}
</SyntaxHighlighter>
<p>
We set up our development server by defining the host and the port. In this case it’s our localhost and the port number 3000 (you can choose any port number though).
</p>
<p>
You may have heard about hot reloading. It is a new feature which allows some sort of callback when a file was changed. The server reacts and implements approximate changes. More on that later though! For now we activate hot reloading by adding the webpack/hot/only-dev-server definition.
</p>
<p>
Of course we need to define an entry point for our application to start up. Since the .html file is a template file which is generated and webpack needs .js(or .jsx) files to work we need to define an index.js. Use the path.resolve method to define where your index.js files should be. We will create content specific files later.
</p>
<p>
Right after the module.exports function, we set up some variables that we will use to load different package content.
</p>
<SyntaxHighlighter language='javascript' style={rainbow}>
{
	`cssLoaders = 'style-loader!css-loader';`
}
</SyntaxHighlighter>
<br/>
<h3 className='autoresize'>Webpack config and loader modules</h3>
<p>
Loaders will be used to load content which is not typically compatible with javascript code, e.g.: images, css files etc. If you define a loader, the whole project will be searched for loader specific file types and „required.“ Since i cannot explain it better than the official documentation, you better read about it here => <a target='_blank' href='https://webpack.github.io/docs/loaders.html'>https://webpack.github.io/docs/loaders.html</a>.
It took me some time to understand how loaders work exactly and it is probably best if you find out details on your own. This way, you may have an easier time understanding subject matter.
</p>
<br/>
<p>
The above loaders named style-loader and css-loader are packages and need to be added to our dependency list. Install them.
</p>
<SyntaxHighlighter language='javascript' style={rainbow}>
{
	`npm install --save-dev style-loader css-loader`
}
</SyntaxHighlighter>
<p>
The next thing we need to do is add and configure the plugins we use.
</p>
<SyntaxHighlighter language='javascript' style={rainbow}>
{
`plugins = [
		new webpack.HotModuleReplacementPlugin(), //for hot reloading
			new HtmlWebpackPlugin({
			template: 'index.html',
			inject: true
		})
	]
}`
}
</SyntaxHighlighter>
<p>
The else here is closed. This means we are finished with defining our development specific plugins.
</p>
<p>
Since hot reloading is included in webpack we need to activate it with the <span className='code'>webpack.HotModuleReplacementPlugin()</span> method. The <span className='code'>HtmlWebpackPlugin( .. )</span> will be used to define our entry html5 file to inject {'<script>'}- and {'<link>'} tags. And that’s it.
</p>
<br/>
<p>
Now the only thing left is to define our return method and explicitly tell where our output should be build. Furthermore we will include some more module loaders. This part is very important! Why? You’ll see.
</p>
<br/>
<h3 className='autoresize'>How to define the build output</h3>
<SyntaxHighlighter language='javascript' style={rainbow}>
{
	`return {
        entry: entry,
            output: {
                path: path.join(__dirname, 'build'),
                publicPath: '/',
                filename: 'static/bundle.js'
},
`
}
</SyntaxHighlighter>
<p>
To declare and build our output webpack bundle.js, which contains our web page content, we need to define an entry point. We already did that above when we defined plugins to use for development. Use the variable named entry and put it after the „entry:“ attribute.
</p>
<br/>
<p>
<span className='code'>publicPath</span> = This is the path that will be used to search for relative files on your development or production server. If we would start our development server, the entry point would search in the root directory of the deployed files.
</p>
<br/>
<p>
<span className='code'>filename</span> = This attribute is used to define a name for the bundled js file. I generally called it bundle.js, because in most cases you will find repositories out there that define it just as bundle.js, but you do not have to name it like that. You can call it whatever you want.
</p>
<p>
(Furthermore you can use relative path declarations before the naming convention, e.g.: „static/“, which will be a directory named static containing the bundle.js )
</p>
<br/>
<p>
That’s all for the output.
</p>
<h3 className='autoresize'>Module Loader Configurations</h3>
<SyntaxHighlighter language='javascript' style={rainbow}>
{
	`module: {
      loaders: [
          {
              test: /\.(es6|js|jsx)$/, // Transform all .js files required somewhere within an entry point...
              loader: 'babel', // ...with the specified loaders...
              query: {compact: false},
              exclude: /node_modules/ // ...except for the node_modules folder.
          },
          {
			        test:   /\.css$/, // Transform all .css files required somewhere within an entry point...
			        loader: cssLoaders // ...with normal css or PostCSS (if used)
          },
          {
              test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			        loader: "url?limit=10000&mimetype=application/octet-stream"
          },
          {
              test: /\.(jpg|jpeg|gif|png)$/,
              loader:'url-loader?limit=10000',
              exclude: /node_modules/
          },
          {
              test: /\.(eot|woff|woff2|svg)(\?\S*)?$/,
              loader: "file-loader?limit=10000&mimetype=image&name=[path][name].[ext]"
              //don’t exclude node_modules since file loader takes .eot files from bootstrap in node_modules
          }
      ]
  },`
}
</SyntaxHighlighter>
<p>
<span className='code'>module</span> = the attribute where a loader group is defined.
</p>
<p>
<span className='code'>loaders</span> = the attribute to define a group (array) of loaders.
</p>
<p>
<span className='code'>test</span> = this attribute is used to specify the file types we are searching for.
</p>
<p>
<span className='code'>loader</span> = the attribute to define a specific loader, which is nothing else than a library dependency we use.
</p>
<p>
<span className='code'>exclude</span> = this attribute is used to tell a loader to stop searching in specific directories.
</p>
<p>
As you can see, the test attribute needs regex-related syntax to define file types. (I personally think that the name here is a little bit misleading and should be changed to something else). The first loader we define is Babel. It is a very important part in react development, because babel is also used to define pre versions of ES e.g.: ES5. You probably wonder where the definition for ES5 is. It is inside a file called .babelrc, but we get to that in a moment. Use the npm install command to install babel.
</p>
<SyntaxHighlighter language='javascript' style={rainbow}>
npm install babel-core babel-loader --save-dev
</SyntaxHighlighter>
<p>
<span className='code'>query</span> = The query attribute is a babel loader dependent attribute. I’m not sure if it can be set to more options than true, false or auto, but all it does is to decide if you want to use javascript files bigger than 100kb and impede deoptimization of those files while set to true. So we set this option to false.
</p>
<p>
For .css files we use the defined loaders (cssLoaders) we set earlier. We already have them as dependency in our node_modules folder.
</p>
<p>
The last two loaders are used to find images and other files defined in the test attribute.
We use the <span className='code'>url-loader</span> for images, since javascript doesn’t need a transcription for those files and the <span className='code'>file-loader</span> for as yet unknown file types.
</p>
<br/>
<p>
Last but not least, there are some attributes left before the configuration for our development settings is finished.
</p>
<SyntaxHighlighter language='javascript' style={rainbow}>
{
	`plugins: plugins,
  target: "web", // Make web variables accessible to webpack, e.g. window
  stats: false, // Don’t show stats in the console
  progress: true
  }
}`
}
</SyntaxHighlighter>
<p>
Don’t forget to close module.exports here.
</p>
<p>
<span className='code'>plugins</span> = the attribute to set our defined plugins for development (or production)
</p>
<p>
<span className='code'>target</span> = the attribute to allow certain commands to be used e.g.: window
</p>
<p>
<span className='code'>stats</span> = the attribute to allow stats in the console. Don’t set this command if you build for production!
</p>
<p>
<span className='code'>progress</span> = this attribute is set to true if you want to see what webpack is building, else set it to false.
</p>
<p>
If you set up everything correctly you should have a makeconfig.js file that looks like the following content:
</p>
<SyntaxHighlighter language='javascript' style={rainbow}>
{
	`var path = require('path');
	var webpack = require('webpack');
	var HtmlWebpackPlugin = require('html-webpack-plugin');
	var AppCachePlugin = require('appcache-webpack-plugin');
	var ExtractTextPlugin = require('extract-text-webpack-plugin');
	var StaticSitePlugin = require('react-static-webpack-plugin');

	module.exports = function(options){
		var entry, jsLoaders, plugins, cssLoaders;


	if (options.prod) {

	} else {
		entry = [
			'webpack-dev-server/client?http://localhost:3000', //Needed for hot reloading
			'webpack/hot/only-dev-server',
			path.resolve(__dirname, 'src/index.js')
		];
		cssLoaders = 'style-loader!css-loader';

		plugins = [
		new webpack.HotModuleReplacementPlugin(), //for hot reloading
			new HtmlWebpackPlugin({
			template: 'index.html',
			inject: true
		})
		]
	}

	cssLoaders = 'style-loader!css-loader';

	plugins = [
	new webpack.HotModuleReplacementPlugin(), //for hot reloading
		new HtmlWebpackPlugin({
		template: 'index.html',
		inject: true
	})
	]
	}

	return {
		entry: entry,
		output: {
			path: path.join(__dirname, 'build'),
			publicPath: '/',
			filename: 'static/bundle.js'
	},

	module: {
	loaders: [
			{
				test: /\.(es6|js|jsx)$/, // Transform all .js files required somewhere within an entry point...
			loader: 'babel', // ...with the specified loaders...
				query: {compact: false},
				exclude: /node_modules/ // ...except for the node_modules folder.
			},
	{
				test:   /\.css$/, // Transform all .css files required somewhere within an entry point...
				loader: cssLoaders // ...with normal css or PostCSS (if used)
			},
			{
	test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/octet-stream"
						},
	{
				test: /\.(jpg|jpeg|gif|png)$/,
	    			loader:'url-loader?limit=10000',
				exclude: /node_modules/
			},
			{
				test: /\.(eot|woff|woff2|svg)(\?\S*)?$/,
	      			loader: "file-loader?limit=10000&mimetype=image&name=[path][name].[ext]"
	//don’t exclude node_modules since file loader takes .eot files from bootstrap in node_modules
	    		}
		]
	 },
	plugins: plugins,
	target: "web", // Make web variables accessible to webpack, e.g. window
	stats: false, // Don’t show stats in the console
	progress: true
	}
}`
}
</SyntaxHighlighter>
<p>
I nearly forgot the <b>ES5 definitions</b> we need to set. So let’s go ahead.
</p>
<br/>
<p>
/Blogolio
	.babelrc
favicon.ico
index.html
index.html.js
LICENSE
makeconfig.js
package.json
README.md
server.dev.js
server.prod.js
webpack.dev.config.js
webpack.prod.config.js
		|
		 – src
			index.js
|
 – assets
|
 – components
|
 – containers
|
 – reducers
|
 – store
|
 – utils
</p>
<p>
Create your own <b>.babelrc</b> file in your project root and open it. Add the following content.
</p>
<SyntaxHighlighter language='javascript' style={rainbow}>
{
	`{
    "presets": ["es2015", "stage-0", "react"],
    "env": {
        "development": {
            "presets": ["react-hmre"]
        }
    }
}`
}
</SyntaxHighlighter>
<p>
To activate ES5 you have to specify it in the presets attribute. To allow hot module reloading features for ES6, ES7, or ES5 you also have to specify it in the development attribute. This is important. You can also specify those settings inside of your makeconfig.js file, but for testing purposes it is better to split presets into its own <b>.babelrc</b> file.
</p>
<p>
Since the defined attributes contain node_module dependencies you have to add them via npm install again.
</p>
<SyntaxHighlighter language='json' style={rainbow}>
npm install babel-preset-es2015 babel-preset-react babel-preset-react-hmre babel-preset-stage-0
</SyntaxHighlighter>
<p>
That’s all for the first part of this tutorial! I hope everything went fine for you and that you could keep up. The second part of this series will include the first steps for adding web content with react.
</p>

							{ //<SyntaxHighlighter language='javascript' style={rainbow}>{this.state.code}</SyntaxHighlighter>
							 //<button onClick={this.props.onHideSideBar}>remove SideBar</button>
							  //<button onClick={this.props.onShowSideBar}>show SideBar</button>
							}

						</div>
					</div>
      </div>
		);
	}

	// componentWillUnmount(){
	// 	this.showSideBar;
	// }

}
