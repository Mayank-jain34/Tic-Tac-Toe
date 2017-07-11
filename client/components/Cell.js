import React from 'react';

const Cell = ({id, onCellClick, value}) => (
  <td onClick={() => onCellClick(id) }>{value}</td>
);
export default Cell;
