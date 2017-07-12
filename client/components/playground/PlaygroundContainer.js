import { connect } from 'react-redux';
import Playground from './Playground';
import { startNewGame } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    playerName : state.playerName,
    opponentName : state.opponentName,
    myTurn: state.turn,
    gameStatus: state.gameStatus,
    gameResult : state.gameResult
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    startNewGame() {
      dispatch(startNewGame());
    }
  }
}

const PlaygroundContainer = connect(mapStateToProps, mapDispatchToProps)(Playground);

export default PlaygroundContainer;
