import React from 'react';

const Cell = ({id, onCellClick, value}) => (
  <td onClick={() => value ? null : onCellClick(id) }>{value}</td>
);
export default Cell;
