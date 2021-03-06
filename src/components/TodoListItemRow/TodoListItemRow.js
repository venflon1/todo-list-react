import React from 'react'
import { withRouter } from 'react-router';
import './TodoListItemRow.css';

const TodoListItemRow = (props) => {
  console.log('TodoListItemRow - props=',props);
  const dataRow = props.dataRow;

  return (
      <tr>
        <td>
          <div className="data">
            {dataRow.username}
          </div>
        </td>
        <td>
          <div className="data">
            {dataRow.dateIns}
          </div>
        </td>
        <td>
          <div className="data">
            {dataRow.title}
          </div>
        </td>
        <td className="action-col">
          <div className="action-col-wrap">
            <span
              className="edit-button"
              onClick={() => { props.onEditItemRow(dataRow.id) }}
            >
              &#9998;
            </span>
            <span
              className="bin-button"
              onClick={() => { props.onDeleteItemRow(dataRow.id) }}
            >
              &#128465;
            </span>
          </div>
        </td>
      </tr>
    );
}

export default withRouter(TodoListItemRow)
