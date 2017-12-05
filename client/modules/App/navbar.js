
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Navbar extends Component {

  static fetchData() {
    console.log('>>>>>>>> navbar fetchData test <<<<<<<<<<<');
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to='/'>Home$$***kkkkhhhhhh$$$$$</Link></li>
          <li><Link to='/about'>About!!!!!!dcdscsdcdsc!!!!</Link></li>
          <li><Link to='/signup'>Signup</Link></li>
          <li><Link to='/login'>Login!!</Link></li>
        </ul>
      </div>
    );
  }
    
}
export default Navbar;