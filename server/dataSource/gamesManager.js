function Game(id, firstPlayer, secondPlayer) {
  this.id = id;
  this.firstPlayer = firstPlayer;
  this.secondPlayer = secondPlayer;
  this.boardStatus = [
    ['','',''],
    ['','',''],
    ['','','']
  ],
  this.numberOfTurns = 0;
}
function gamesManager() {
  var games = [];
  var id = 0;
  return {
    createGame(firstPlayer, secondPlayer) {
      var game = new Game(id++, firstPlayer, secondPlayer);
      games.push(game);
      return game.id;
    },
    updateBoard(id, cell, symbol) {
      games[id].boardStatus[cell.i][cell.j] = symbol;
      games[id].numberOfTurns++;
      return games[id];
    },
    getGameInfo(id) {
      return games[id];
    }
  }
}

module.exports = gamesManager();
