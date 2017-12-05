import express from 'express';
//import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import appConfig from '../appConfig';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = new express();

console.log('############## development111: ', process.env.NODE_ENV)

// #########################################################################

if (process.env.NODE_ENV === 'development') {
  console.log('############## development2222: ', process.env.NODE_ENV)
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: false, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

console.log('############## development3333: ', process.env.NODE_ENV)

// #########################################################################

import React from 'react';
import { StaticRouter as Router, matchPath } from 'react-router';
import ReactDOM from 'react-dom/server';
import App from '../client/modules/App/App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../client/redux/reducers';
// import thunk from 'redux-thunk';
import thunk from '../client/redux/thunk';
//import { renderToString } from 'react-dom/server';
import helmet from 'react-helmet';
import routes from '../client/routes/routes';

// #########################################################################

mongoose.Promise = global.Promise;
const mongooseOptions = {
  useMongoClient: true,
  autoReconnect: true,
  keepAlive: 1,
  connectTimeoutMS: 300000
};
mongoose.connect(process.env.MONGO_URL, mongooseOptions, error => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!');
    throw error;
  }
});

// #########################################################################

// https://github.com/glenjamin/webpack-hot-middleware/issues/10
// app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/static', express.static(path.resolve(__dirname, '../dist/client')));
//app.use(favicon(path.join(__dirname, './public/static/favicon', 'favicon.ico')),);
//app.use('/api', pageData);

// #########################################################################

const renderFullPage = (html, preloadedState) => {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="icon" href="/dist/favicon.ico" type="image/ico" />
        <title>Tester !!!!</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? '/public/static/dist/client/app.js': './app.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? '/public/static/dist/client/vendor.js' : './vendor.js'}'></script>
      </body>
    </html>
  `;
};

// #########################################################################

app.get('*', async (req, res) => {
  try {

    const store = createStore(reducers, {}, applyMiddleware(thunk));
    let foundPath = null;

    let { path, component } = routes.routes.find(
      ({ path, exact }) => {
        foundPath = matchPath(req.url,
          {
            path,
            exact,
            strict: false
          }
        )
        return foundPath;
      }) || {};

    if (!component)
      component = {};

    if (!component.fetchData)
      component.fetchData = () => new Promise(resolve => resolve());

    await component.fetchData({ store, params: (foundPath ? foundPath.params : {}) });

    let preloadedState = store.getState();

    console.log('>>>>>>>>>>>> server > app.use((req, res, next) > store.getState(): ', preloadedState)

    let context = {};
    const html = ReactDOM.renderToString(
      <Provider store={store}>
        <Router context={context} location={req.url}>
          <App />
        </Router>
      </Provider>
    )

    const helmetData = helmet.renderStatic();

    if (context.url)

      res.redirect(context.status, 'http://' + req.headers.host + context.url);
    
    else if (foundPath && foundPath.path == '/404')

      res.status(404).send(renderFullPage(html, preloadedState, helmetData))

    else

      res.send(renderFullPage(html, preloadedState, helmetData))

  } catch (error) {

    console.log('>>>>>>>>>>>> server > app.use((req, res, next) > error: ', error)

    res.status(400).send(renderFullPage('An error occured.', {}, {}));

  }
});


app.listen(process.env.PORT, error => {
  if (!error) {
    console.log(`Running on port ${process.env.PORT}`);
  }
});

export default app;





