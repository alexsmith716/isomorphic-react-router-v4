
import React from 'react';
//import { render } from 'react-dom';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// import { configureStore } from './redux/store';
// const store = configureStore( window.__INITIAL_STATE__ );
import store from './redux/store';

import App from './modules/App/App';

const mountApp = document.getElementById('root');

//const renderApp = (RootComponent) => {
const renderApp = (RootComponent: React.ComponentType<any>) => {
  hydrate(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <RootComponent />
        </Router>
      </Provider>
    </AppContainer>,
    mountApp
  );
};

renderApp(App);

if (module.hot) {
  // module.hot.accept();
  module.hot.accept('./routes/routes', () => { renderApp(App); });
  //  const nextRoutes = require('./routes/routes');
  // renderApp({ routes: nextRoutes });
  //module.hot.accept('./routes/routes', () => {
  //  const nextRoutes = require('./routes');
  //  renderApp({ routes: nextRoutes });
  //});
}


/*
if (module.hot) {
  module.hot.accept();
}

/*
hydrate((
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
), document.getElementById('root'));
*/