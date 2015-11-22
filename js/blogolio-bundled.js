(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function () {

	Parse.$ = jQuery;

	//Connection to the Parse Database Webserver.
	Parse.initialize("EvmOpxAGXkDDS9IOETIptyHZAJDn3Ax7Af3v7VQQ", "doRuBShVrZ9hP6d5lHYWd00SYvxmHVnIBBwm7OxI");

	var Blog = Parse.Object.extend("Blog");
	var Blogs = Parse.Collection.extend({
		model: Blog
	});

	var blogs = new Blogs();

	blogs.fetch({
		success: function (blogs) {
			console.log(blogs);
		},
		error: function (blogs, error) {
			console.log(error);
		}
	});
});

// $(function () {

// Parse.$ = jQuery;

// //Connection to the Parse Database Webserver.
// Parse.initialize("EvmOpxAGXkDDS9IOETIptyHZAJDn3Ax7Af3v7VQQ", "doRuBShVrZ9hP6d5lHYWd00SYvxmHVnIBBwm7OxI");

// observe: function(props, state) {
// return {
// comments: (new Parse.Query('Blog'))
// .ascending('createdAt')
// };
// }

// console.log(this.data.comments);

// // var Blog = Parse.Object.extend("Blog");
// // var Blogs = Parse.Collection.extend({
// // model: Blog
// // });

// // var blogs = new Blogs();

// // blogs.fetch({
// // success: function (blogs) {
// // console.log(blogs);
// // },
// // error: function (blogs, error) {
// // console.log(error);
// // }
// // });
// });

},{}]},{},[1]);
