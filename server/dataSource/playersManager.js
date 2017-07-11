function Player(name) {
  this.name = name;
  this.symbol = null;
  this.gameId = null;
}

function playersManager() {
  var players = {};

  return {
    createPlayer(id, playerName) {
      players[id] = new Player(playerName);
    },
    deletePlayer(id) {
      delete players[id];
    },
    updatePlayer(id, gameId, symbol) {
      players[id].gameId = gameId;
      players[id].symbol = symbol;
    },
    getPlayer(id) {
      return players[id]
    },
    findAvailablePlayer(playerId) {
      for(player in players) {
        if(player !== playerId && players[player].gameId === null) {
          return player;
        }
      }
    }
  }
}

module.exports = playersManager();
