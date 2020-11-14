import React from 'react';
import './FilterLinksList.css';
import FilterLink from './FilterLink/FilterLink';
import { isNullOrUndef } from '../../../utils/functionUtils';

const filterLinkList = (props) => {
  console.log("filterLinkList - render - props=", props);
  let filterLinks = props.filterLinks;

  let filterLinksJsxElem = null;
  if( !isNullOrUndef(filterLinks) ){
    filterLinksJsxElem = filterLinks.map( (filterLink) => {
      return (
        <FilterLink
          key={filterLink.title}
          item={filterLink}
          onFilterClickHandler={props.onFilterClickHandler} />
      )
    });
  }

  return (
      <ul className="filter-links-list">
        {filterLinksJsxElem}
      </ul>
  );
}

export default filterLinkList;