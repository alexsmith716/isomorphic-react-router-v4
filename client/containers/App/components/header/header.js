import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
                <a className="navbar-brand" href="/">Home</a>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Header One</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">Header Two</a>
                        </li>
                    </ul>
                </div>
            </nav>
      </div>
    );
  }
}


export default Header;
