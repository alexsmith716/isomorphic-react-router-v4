
import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';

import RouteRedirect from '../../routeRedirect/routeRedirect';
import Navbar from './navbar';
import routeOptions from '../../routes/routes';


console.log('>>>>>>> clinet > modules > App > App <<<<<<<<<<<')

class App extends Component {

  render() {

    let routes = routeOptions.routes.map(({ path, component, exact }, i) =>
      <Route key={Math.random() + 'ROUTE_'} exact={exact} path={path} component={component} />
    );

    let redirects = routeOptions.redirects.map(({ from, to, status }, i) =>
      <RouteRedirect key={Math.random() + 'REDIRECT_'} from={from} to={to} status={status} />
    );

    return (
      <div>
        <Navbar />
        <Switch>
          {routes}
          {redirects}
        </Switch>
      </div>
    );

  }
}

export default App;