import React, { Component } from 'react';
import Blogs from '../Blogs';

import './global.css';

export default class Home extends Component {

	render(){
		return(
			<Blogs hideSideBar={this.props.onHideSideBar} showSideBar={this.props.onShowSideBar} />
		)
	}
}
