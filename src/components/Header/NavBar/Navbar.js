import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { isNullOrUndef } from '../../../utils/functionUtils'
import './NavBar.css';

export class Navbar extends Component {

  render() {
    const linksValue = !isNullOrUndef(this.props.listOfLink)? this.props.listOfLink: [];
    const linksJsxElement = linksValue.map( link => {
      return ( <li key={link.title}><NavLink activeClassName="activeLink" to={link.path}>{link.title}</NavLink></li> );
    });

    return (
      <nav>
        <ul className="menu">
          {linksJsxElement}
        </ul>
      </nav>
    )
  }
}

export default Navbar
