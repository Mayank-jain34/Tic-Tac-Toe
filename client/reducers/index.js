const gameStatus = {
  INITIALIZING,
  LOADING,
  PLAYING,
  GAMEOVER,
}

function rootReducer(state = {
  playerName : null,
  opponentName : null,
  boardStatus : [
          ['','',''],
          ['','',''],
          ['','','']
  ],
  gameStatus : gameStatus.INITIALIZING,
  symbol : '',
  turn : false,
  gameResult : null
}, action) {
  switch (action.type) {
    case "GAME_STARTED":
      return Object.assign({}, state, {
        opponentName : action.playerName,
        symbol : action.symbol,
        turn : action.turn,
        gameStatus : gameStatus.PLAYING
      });
    case "GAME_OVER":
      return Object.assign({}, state, {
        gameStatus : gameStatus.GAMEOVER,
        gameResult : action.gameResult
      })
    case "LOGIN":
      return Object.assign({}, state, {
        playerName : action.playerName,
        gameStatus : gameStatus.LOADING 
      });
    case "OPPONENTS_TURN_COMPLETE":
    return Object.assign({}, state, { boardStatus : action.boardStatus, turn : true });
    case "TURN_COMPLETE":
      var boardStatus = state.boardStatus.slice();
      boardStatus[action.cellInfo.i][action.cellInfo.j] = state.symbol;
      return Object.assign({}, state, { boardStatus, turn : false });
    case "START_NEW_GAME":
      return Object.assign({}, state, {
        opponentName : null,
        boardStatus : [
                ['','',''],
                ['','',''],
                ['','','']
              ],
        gameStatus : gameStatus.INITIALIZING,
        symbol : '',
        turn : false,
        gameResult : null 
      });
    default:
      return state;
  }
}

export default rootReducer;
