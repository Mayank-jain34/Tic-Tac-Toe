import { connect } from 'react-redux';
import Board from './Board';
import { turnComplete } from '../../actions';
const mapStateToProps = (state, ownProps) => {
  return {
    boardStatus : state.boardStatus
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCellClick(id) {
      // If its users turn
      if(ownProps.turn) {
        let grid = id.split("-");
        let cellInfo = {
          i : grid[0],
          j : grid[1]
        }
        dispatch(turnComplete(cellInfo))
      }
    }
  }
}

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

export default BoardContainer;
