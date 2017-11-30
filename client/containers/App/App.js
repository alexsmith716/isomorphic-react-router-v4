import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Header from './components/header/header';
import Routes from '../../routes/routes'
import Helmet from 'react-helmet';

class App extends Component {

  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
    route: PropTypes.object
  }

  constructor (props) {
    super(props)
  }

  render () {
    const { match, location, history } = this.props
    console.log('App => match', match)
    console.log('App => location', location)
    console.log('App => history', history)

    return (

        <div>
          <Helmet
            title="ThisGreatApp!"
            titleTemplate="%s - ThisGreatApp?"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Header/>
          <Routes />
        </div>

    )
  }
}

export default App

