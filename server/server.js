import express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import appConfig from '../appConfig';
import setInitPageData from '../util/setInitPageData';
import pageData from './routes/pageData.routes'
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = new Express();

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
import reducers from '../client/reducers';
import thunk from 'redux-thunk';
const store = createStore(reducers, applyMiddleware(thunk));
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
  setInitPageData();
});

// #########################################################################

app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/static', express.static(path.resolve(__dirname, '../dist/client')));
app.use('/public', express.static(path.join(__dirname, '../public')));
//app.use('/api', pageData);

// #########################################################################

const renderFullPage = (html, initialState) => {
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
      </body>
    </html>
  `;
};

// #########################################################################

app.use((req, res, next) => {


  }
);
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





