import React, { Component, PropTypes } from 'react';
import Blogs from '../Blogs';

import './global.css';

export default class Home extends Component {

	render(){
		return(
			<div className="col-sm-7 blog-main">
			<Blogs hideSideBar={this.props.onHideSideBar} showSideBar={this.props.onShowSideBar} />
			</div>
		)
	}

  //onClick={() => onBlogClick }
	// static propTypes = {
	// 	onBlogClick: PropTypes.func.isRequired
	// }
}
