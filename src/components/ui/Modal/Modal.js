import React from 'react';
import { connect } from 'react-redux';
import { hiddenModal } from '../../../actionCreators/uiActionCreators';
import './Modal.css';

const modal = (props) => {

  return (
    <div className="modal">
      <div className="close-bar">
        <span
          className="close-button"
          onClick={props.hiddenModal}
          >&#10006;</span>
      </div>
      <div className="content-modal">
        {props.children}
      </div>
      <div className="save-bar">
        <button
                className="save-button"
                disabled={props.proceedToSendForm === false}
                onClick={() =>{ props.onProceedToSendForm(); props.hiddenModal();}}
        >Salva</button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hiddenModal: () => dispatch( hiddenModal() ),
  }
}

export default connect(null, mapDispatchToProps)(modal);