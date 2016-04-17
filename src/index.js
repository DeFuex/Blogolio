import React from 'react'
import ReactDOMServer from 'react-dom/server';
import { createHistory, createMemoryHistory } from 'history';
import Router, { RoutingContext, match } from 'react-router';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'

const store = configureStore()

// if (typeof document !== 'undefined') {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
// }

// module.exports = function render(path, props, callback) {
//   Router.run(App, path, function (Root) {
//     var html = React.renderToString(<App />);
//     callback('<!doctype html>' + html);
//   })
// }

// module.exports = function render(locals, callback) {
//   Router.run(App, locals.path, function (Handler) {
//     var html = React.renderToStaticMarkup(React.createElement(Handler, locals))
//     callback(null, '<!DOCTYPE html>' + html)
//   })
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

// module.exports = function render (locals, callback) {
//   callback(null, `<!DOCTYPE html>
//     <html>
//       <head>
//         <link rel="stylesheet" href="/style.css">
//       </head>
//       <body>
//         Hello world
//       </body>
//     </html>
//   `)
// }
