
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class Home extends Component {

  static fetchData() {
    return new Promise((resolve, reject) => resolve());
    //console.log('>>>>>>>> Home fetchData test <<<<<<<<<<<');
  }

  render() {

    return (

      <div>

        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
        </Helmet>

        <div>Home page ++++++++++++++++</div>

      </div>
    );

  }

}
export default Home;