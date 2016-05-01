import React, { Component } from 'react';
import '../../blogs.css';

export default class Part1 extends Component {

	constructor() {
		super();
		this.hideSideBar = this.hideSideBar.bind(this)
		//this.componentWillUpdate = this.componentWillUpdate.bind(this)
		//this.componentDidMount = this.componentDidMount.bind(this)
	}

	hideSideBar(){
		this.props.onHideSideBar;
	}

	render(){
		return (
			<div className="row">
					<div className="blog-content-main">
					  <h2>React Tutorial Part 1 - Project Structure, Webpack, Hot-Reloading, Module Loaders, Plugins</h2>
						<div className="blog-content">
							Stuff
							<button onClick={this.props.onHideSideBar}>remove SideBar</button>
						</div>
						<p className="blog-post-meta">At Wed April 27 2016 by Timo Obereder</p>
					</div>
      </div>
		);
	}

	componentWillReceiveProps(){
		this.hideSideBar
	}

	// componentWillMount() {
	// 	this.props.onHideSideBar
	// }
	//
	// componentDidMount(){
	// 	this.props.onHideSideBar
	// }
	//
	// componentDidUpdate(){
	// 	this.hideSideBar
	// }
	//
	// componentWillUpdate(){
	// 	this.hideSideBar
	// }

}
