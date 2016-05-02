import React, { Component } from 'react';
import '../../blogs.css';

export default class Part1 extends Component {

	constructor(props) {
		super(props);
		this.hideSideBar = this.hideSideBar.bind(this)
		this.showSideBar = this.showSideBar.bind(this)
		//this.componentWillUnmount = this.componentWillUnmount.bind(this)
		//this.componentWillUpdate = this.componentWillUpdate.bind(this)
		//this.componentDidMount = this.componentDidMount.bind(this)
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
					<div className="blog-content-main">
					  <h2>React Tutorial Part 1 - Project Structure, Webpack, Hot-Reloading, Module Loaders, Plugins</h2>
						<div className="blog-content">
							Stuff
							{ //<button onClick={this.props.onHideSideBar}>remove SideBar</button>
							  //<button onClick={this.props.onShowSideBar}>show SideBar</button>
							}
						</div>
						<p className="blog-post-meta">At Wed April 27 2016 by Timo Obereder</p>
					</div>
      </div>
		);
	}

	componentWillUnmount(){
		this.showSideBar;
	}

	// componentWillReceiveProps(){
	// 	this.hideSideBar
	// }
  //
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
