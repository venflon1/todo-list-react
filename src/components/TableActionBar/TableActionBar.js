import React from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../actionCreators/uiActionCreators';
import './TableActionBar.css';

const tableActionBar = (props) => {
  console.log('tableActionBar - props=',props);
  return (
    <div className="actionBar">
      <span
        className="plus-button"
        onClick={ props.showModal }
        >&#43;</span>
    </div>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showModal: () => dispatch( showModal() ),
  }
}

export default connect(null, mapDispatchToProps)(tableActionBar);