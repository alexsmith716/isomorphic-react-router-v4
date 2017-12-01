
import React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const store = createStore(
  reducers, window.__INITIAL_STATE__, applyMiddleware(thunk)
);

hydrate((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'));

/*
const render = AppComponent => {
  hydrate(
    <AppContainer>
      <AppComponent store={store} />
    </AppContainer>,
    document.getElementById('root')
  );
};

if (module.hot) {
  module.hot.accept('./App', () => render(App));
}

render(App);
*/
