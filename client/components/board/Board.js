import React from 'react';
import Cell from '../cell/Cell';
require("./Board.scss");

class Board extends React.Component {
  render() {
    return (
        <table>
          <tr>
            <Cell id="0-0" onCellClick={this.props.onCellClick} value={this.props.boardStatus[0][0]}/>
            <Cell id="0-1" onCellClick={this.props.onCellClick} value={this.props.boardStatus[0][1]}/>
            <Cell id="0-2" onCellClick={this.props.onCellClick} value={this.props.boardStatus[0][2]}/>
          </tr>
          <tr>
            <Cell id="1-0" onCellClick={this.props.onCellClick} value={this.props.boardStatus[1][0]}/>
            <Cell id="1-1" onCellClick={this.props.onCellClick} value={this.props.boardStatus[1][1]}/>
            <Cell id="1-2" onCellClick={this.props.onCellClick} value={this.props.boardStatus[1][2]}/>
          </tr>
          <tr>
            <Cell id="2-0" onCellClick={this.props.onCellClick} value={this.props.boardStatus[2][0]}/>
            <Cell id="2-1" onCellClick={this.props.onCellClick} value={this.props.boardStatus[2][1]}/>
            <Cell id="2-2" onCellClick={this.props.onCellClick} value={this.props.boardStatus[2][2]}/>
          </tr>
        </table>
    );
  }
}

export default Board;
