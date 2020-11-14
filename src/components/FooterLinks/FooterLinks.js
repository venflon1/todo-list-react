import React, { Component } from 'react';
import FilterLinksList from './FilterLinksList/FilterLinksList';
import { connect } from 'react-redux';
import './FooterLinks.css';
import { handleClickFilterAction } from '../../actionCreators/todosActionCreators';


class FooterLinks extends Component {

  render(){
    console.log("footerLinks - render - props=" ,this.props);
    const filterLinks = this.props.filterLinks;

    return (
      <div className="footer-links">
        <FilterLinksList
          filterLinks = {filterLinks}
          onFilterClickHandler = {this.props.onFilterClickHandler}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFilterClickHandler: (filterTitle) => dispatch( handleClickFilterAction(filterTitle) )
  }
}

export default connect( null, mapDispatchToProps)(FooterLinks);