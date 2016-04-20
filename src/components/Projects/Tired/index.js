import React, { Component } from 'react';
import '../projects.css';

export default class Tired extends Component {

	  constructor() {
		  super();
	  }

	render(){
		return(
						<div className="contact-content" >
								<div className="blog-post">
									<h2 className="page-header">Project Tire(d)</h2>
									<div >The content of this project includes basic functionalities of an 3D engine like, shader parsing, shader programming, texture loading, model loading, basic transitions, gameplay mechanics and a 3D tire model which was created with Cinema 4D. I used following libraries and frameworks for technical implementations:<br /><br />
<ul>
<li>Assimp</li>
<li>OpenGL 4.0</li>
<li>GLWF</li>
<li>GLEW</li>
<li>GLM (OpenGL Mathematics)</li>
</ul>
<br />
<p>Example Video & Code:</p>
<div className="videowrapper"><iframe src="//www.youtube.com/embed/v7OwgNjw2NM" width="560" height="314" allowfullscreen="allowfullscreen"></iframe></div>
<p>Github Source Code <a target="_blank" href="https://github.com/DeFuex/Tire-D-">here</a>.</p></div>
									<p className="blog-post-meta">At Mon Dec 21 2015 by Timo Obereder</p>
								</div>
						</div>
					);
	}
}
