export default function socketHelper(socket, dispatch) {
    socket.on("game start", (symbol, opponentName) => {
      console.error("Game Started", symbol);
      var turn = symbol === 'O' ? true : false;
      dispatch({
          type : "GAME_STARTED",
          turn,
          symbol,
          opponentName
      });
    })

    socket.on("opponent's turn complete", (boardStatus) => {
      dispatch({
          type: "OPPONENTS_TURN_COMPLETE",
          boardStatus
        })
    })

    socket.on("game over", (symbol) => {
      var gameResult = null;
      if(!symbol) {
        gameResult = "DRAW";
      } else if(symbol === this.state.symbol) {
        gameResult = "WON";
      } else {
        gameResult = "LOST";
      }
      dispatch({
          type: "GAME_OVER",
          gameResult
      });
    })

    //TODO : Handle opponent disconneted event
}