import React, { Component } from 'react';
import { render } from 'react-dom';
import { match, Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import AsyncProps from 'async-props';
import Parse from 'parse';
import { createHistory, createMemoryHistory } from 'history';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux'
import NavBar from '../components/NavBar';
import Home from '../components/Home';
import About from '../components/About';
import Projects from '../components/Projects';
import ProjectView from '../components/ProjectView';
import Tired from '../components/Projects/Tired';
import Dinger from '../components/Projects/Dinger';
import BackOffice from '../components/Projects/BackOffice';
import SWEChan from '../components/Projects/SWEChan';
import Contact from '../components/Contact';
import Admin from '../components/Admin';
import Example from '../components/Example';

// import bootstrap from 'bootstrap';
// import $ from "jquery";

//import '../../src/js/tinymce.min.js';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap-social/bootstrap-social.css';
import '../../node_modules/bootstrap-social/assets/fonts/fontawesome-webfont.woff2';
import '../../node_modules/bootstrap-social/assets/css/font-awesome.css';

const routes = (
	<Route path="/Blogolio" component={NavBar}>
		<IndexRoute component={Home} />
		<Route path="about" component={About} />
		<Route path="projects" component={Projects} />
		<Route path="projects/projectTired" component={Tired} />
		<Route path="projects/backOffice" component={BackOffice} />
		<Route path="projects/sweChan" component={SWEChan} />
		<Route path="projects/projectDinger" component={Dinger} />
		<Route path="contact" component={Contact} />
		{//<Route path="admin" component={Admin} />
		}
		<Route path="Example" component={Example} />
	</Route>
)

export default class App extends Component {
	render(){
		return(
			<div>
				<Router
					render={ props => <AsyncProps {...props} /> }
					history={browserHistory} routes={routes}>
				</Router>
			</div>
		);
	}
}

// if (typeof document !== 'undefined') {
//   const history = createHistory();
//   const outlet = document.getElementById('root');
//
//   ReactDOM.render(<Router history={history} routes={routes} />, outlet);
// }

// Exported static site renderer:
// export default (locals, callback) => {
//   const history = createMemoryHistory();
//   const location = history.createLocation(locals.path);
//
//   match({ routes, location }, (error, redirectLocation, renderProps) => {
//     callback(null, template({
//       html: ReactDOMServer.renderToString(<RoutingContext {...renderProps} />),
//       assets: locals.assets
//     }));
//   });
// };
