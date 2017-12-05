
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import middleware from '../middleware';

var preloadedState = {};

if (typeof window != 'undefined' && window.__PRELOADED_STATE__) {
    preloadedState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;
}

const composeEnhancers = (typeof window != 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;


const store = createStore(reducers, preloadedState, composeEnhancers(
    applyMiddleware(...middleware)
));

/*
if (module.hot) {
  module.hot.accept('../reducers', () => {
    const nextReducer = require('../reducers/index').default
    store.replaceReducer(nextReducer)
  })
}
*/

export default store;


/*
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

export function configureStore(initialState = {}) {

  const enhancers = [
    applyMiddleware(thunk),
  ];

  const store = createStore( reducers, initialState, compose(...enhancers) );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const newReducer = require('../reducers').default;
      store.replaceReducer(newReducer);
    });
  }

  return store;
}
*/