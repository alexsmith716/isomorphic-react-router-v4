
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { configureStore } from './redux/store';

import App from './modules/App/App';

const mountApp = document.getElementById('root');

const store = configureStore( window.__INITIAL_STATE__ );

const renderApp = (RootComponent) => {
// const renderApp = (RootComponent: React.ComponentType<any>) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    mountApp
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept('./modules/App/App', () => { renderApp(App); });
  // module.hot.accept('./App', () => {
  //   const NewApp = require('./App').default;
  //   renderApp(NewApp);
  // });
}
