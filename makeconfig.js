var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AppCachePlugin = require('appcache-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(options){
	var entry, jsLoaders, plugins, cssLoaders;

	//If production flag is set to true
	if (options.prod) {
		entry = [
			path.resolve(__dirname, 'src/index.js')
		];
		cssLoaders = ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader');

		//Plugins
		plugins = [
			new webpack.optimize.UlgifyJsPlugin({
				compress: {
					warnings: false
				}
			}),
			new HtmlWebpackPlugin({
				template: 'index.html',
				minify: {
					removeComments: true,
		        	collapseWhitespace: true,
		        	removeRedundantAttributes: true,
		        	useShortDoctype: true,
		        	removeEmptyAttributes: true,
		        	removeStyleLinkTypeAttributes: true,
		        	keepClosingSlash: true,
		        	minifyJS: true,
		        	minifyCSS: true,
		        	minifyURLs: true
				},
				inject: true
			}),
			new ExtractTextPlugin('src/css/blogolio.css'),
			new webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: JSON.stringify('production')
				}
			})
		];

		//if option is false then change to development settings
		} else {
			entry = [
				'webpack-dev-server/client?http://localhost:3000', //Need for hot reloading
				'webpack/hot/only-dev-server',
				path.resolve(__dirname, 'src/index.js')
			];
			cssLoaders = 'style-loader!css-loader';

			plugins = [
				new webpack.HotModuleReplacementPlugin(), //for hot reloading
				new HtmlWebpackPlugin({
					template: 'index.html',
					inject: true
				}),
				new webpack.ProvidePlugin({
					$: 'jquery',
					jQuery: 'jquery'
				})
			]
		}

		plugins.push(new AppCachePlugin({
			exclude: ['.htaccess']
		}));

		return {
			entry: entry,
			output: {
				path: path.resolve(__dirname, 'build'),
				filename: 'js/bundle.js'
			},
			module: {
		        loaders: [{
			    	test: /\.js$/, // Transform all .js files required somewhere within an entry point...
			        loader: 'babel', // ...with the specified loaders...
			        exclude: path.join(__dirname, '/node_modules/') // ...except for the node_modules folder.
			    }, 
			    {
			    	test:   /\.css$/, // Transform all .css files required somewhere within an entry point...
			        loader: cssLoaders // ...with PostCSS (if used)
			    }, 
				{ 	test: /\.woff(\?\S*)?$/, 
					loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
				},
				{
      				test: /\.woff2(\?\S*)?$/,
      				loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
    			},
				{ 	test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
					loader: "url?limit=10000&mimetype=application/octet-stream" 
				},
				{ 	test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
					loader: "url?limit=10000&mimetype=image/svg+xml" 
				},
				{
      				test: /\.(eot|ttf|svg|gif|png)(\?\S*)?$/,
      				loader: "file-loader"
    			}]
		    },
		    plugins: plugins,
			 //    postcss: function() {
			 //    	return [
			 //        	require('postcss-import')({ // Import all the css files...
			 //          		glob: true,
			 //          		onImport: function (files) {
			 //              		files.forEach(this.addDependency); // ...and add dependecies from the main.css files to the other css files...
			 //          		}.bind(this) // ...so they get hot–reloaded when something changes...
			 //        	}),
			 //        	require('postcss-simple-vars')(), // ...then replace the variables...
			 //        	require('postcss-focus')(), // ...add a :focus to ever :hover...
			 //        	require('autoprefixer')({ // ...and add vendor prefixes...
			 //          		browsers: ['last 2 versions', 'IE > 8'] // ...supporting the last 2 major browser versions and IE 8 and up...
			 //        	}),
			 //        	require('postcss-reporter')({ // This plugin makes sure we get warnings in the console
			 //          		clearMessages: true
				//     	})
			 //    	];
				// },
			target: "web", // Make web variables accessible to webpack, e.g. window
			stats: false, // Don't show stats in the console
			progress: true
		}
}
