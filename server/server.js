import express from 'express';
import compression from 'compression';
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
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../client/redux/reducers';
import thunk from 'redux-thunk';
//import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';

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

app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
//app.use('/static', express.static(path.resolve(__dirname, '../dist/client')));
app.use('/public', express.static(path.join(__dirname, '../public')));
//app.use('/api', pageData);

// #########################################################################

const renderFullPage = (html) => {
  const head = Helmet.rewind();
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <title>GVGVGVHGVJVHVHVHJVHGGHVGH!!!!</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id="root" style="height: 100%">Rendering tester object 'renderFullPage' from server ++++++++</div>
      </body>
    </html>
  `;
};

const renderFullPageX = (html, initialState) => {
  const head = Helmet.rewind();
  return `
    <!doctype html>
    <html lang='en'>
      <head>
        <link rel="stylesheet" href="${process.env.NODE_ENV === 'production' ? '/static/styles.css': '/styles.css'}">
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.script.toString()}
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? '/static/vendor.js' : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? '/static/app.js': '/app.js'}'></script>
      </body>
    </html>
  `;
};

// #########################################################################

// app.use((req, res, next) => {
app.get('*', async (req, res) => {
  try {

    const store = createStore(reducers, applyMiddleware(thunk));
    let foundPath = null;

    let { path, component } = routeBank.routes.find(
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

  console.log('>>>>>>>>>>>> server > app.use((req, res, next) > preloadedState: ', preloadedState)


});
/*
app.use((req, res, next) => {
  const apiPrefix  = '/api/';
  
  if(req.url.substring(0, apiPrefix.length) === apiPrefix) { 
    return next();
  }
  
  const branch = matchRoutes(routes, req.url);
  const promises = branch.map(({route}) => {
    let fetchData = route.component.fetchData;
    return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
  });

  Promise.all(promises).then(() => {
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>)
    res
      .set('Content-Type', 'text/html')
      .status(200)
      .end(renderFullPage(content, store.getState()));
      })
      .catch((error) => next(error));
  }
);
*/

app.listen(process.env.PORT, error => {
  if (!error) {
    console.log(`Running on port ${process.env.PORT}`);
  }
});

export default app;





