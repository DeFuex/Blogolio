import React, { Component } from 'react';

import './header.css';

export default class Header extends Component {
  render() {
      return (
  		<div className="blog-header">
  			<h1><a className="blog-title" href="./">The Very Personal Blogolio</a></h1>
  			<p className="lead blog-description">This is a portfolio blog about some projects i did.</p>
  		</div>
  	)
  }
}
