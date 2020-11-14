import React from 'react';
import './FilterLink.css';
import '../../../../utils/functionUtils';
import { isNullOrUndef } from '../../../../utils/functionUtils';

const filterLink = (props) => {
  console.log("filterLink - render - props=", props);
  const filterActive = props.item.active;

  let activeFilterClass = '';
  if( !isNullOrUndef(filterActive) && filterActive === true){
    activeFilterClass = ' active';
  }

  return (
    <li
    className={"filter-link" + activeFilterClass}
      key={props.item.title}
    >
      <span onClick={() => props.onFilterClickHandler(props.item.title)}>{props.item.title}</span>
    </li>
  );
}

export default filterLink;