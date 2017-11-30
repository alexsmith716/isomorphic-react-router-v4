import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Home extends Component {
  render () {
    return (
      <div className='container'>
        <h1>Sample App</h1>
        <div className='container'>
          <Link to='/about'>About</Link>
        </div>
      </div>
    )
  }
}

export default Home
