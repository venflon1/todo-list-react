import React from "react";
import NavBar from './NavBar/Navbar';
import linksValue from '../../utils/linksItem/linksItemMainMenu';
import './Header.css';

const header = (props) =>{
  const titleHeader = props.title;

  return (
    <header>
      <div className="header-logo">
        <h2>{titleHeader}</h2>
      </div>
      <NavBar listOfLink={linksValue}/>
    </header>
  );
}

export default header;