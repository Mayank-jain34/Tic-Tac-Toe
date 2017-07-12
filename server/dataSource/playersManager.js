function Player(name) {
  this.name = name;
  this.symbol = null;
  this.gameId = null;
  this.readyToPlay = true;
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
    updatePlayer(id, gameId, symbol, readyToPlay) {
      players[id].gameId = gameId;
      players[id].symbol = symbol;
      players[id].readyToPlay = readyToPlay;
    },
    updatePlayerStatus(id,readyToPlay) {
      players[id].readyToPlay = readyToPlay;
    },
    getPlayer(id) {
      return players[id]
    },
    findAvailablePlayer(playerId) {
      for(player in players) {
        if(player !== playerId && players[player].gameId === null && players[player].readyToPlay) {
          return player;
        }
      }
    }
  }
}

module.exports = playersManager();
