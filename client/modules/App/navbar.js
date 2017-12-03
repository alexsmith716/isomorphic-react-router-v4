
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Navbar extends Component {

    static fetchData() {
        console.log('test');
    }

    render() {
        return (
            <div>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/user'>User</Link></li>
                </ul>
            </div>
        );
    }
    
}
export default Navbar;