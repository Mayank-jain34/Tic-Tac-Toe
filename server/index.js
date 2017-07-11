const express = require('express');
var app = express();
var playersManager = require('./dataSource/playersManager');
var gamesManager = require('./dataSource/gamesManager');

var server = app.listen(3000, function () {
  console.log("server is listening at 3000")
});

/* Sockets @_@ */
var io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log("new connection", socket.id);

  socket.on('player joined', function onPlayerJoined(playerName) {
    playersManager.createPlayer(socket.id, playerName);
    console.log(`${playerName} is ready to play`);
    createNewGame();
  });

  socket.on('new game', function onNewGame(playerName) {
    console.log(`${playerName} is ready to play`);
    createNewGame();
  });

  socket.on('turn complete', function onTurnComplete(cellInfo) {
    var player = playersManager.getPlayer(socket.id);
    var gameInfo = gamesManager.updateBoard(player.gameId, cellInfo, player.symbol);
    var opponent = gameInfo.firstPlayer === socket.id
                ? gameInfo.secondPlayer
                : gameInfo.firstPlayer;
    socket.to(opponent).emit("opponent's turn complete", gameInfo.boardStatus);
    if(gameInfo.numberOfTurns >= 5 ) {
      var result = calculateGameResult(gameInfo.boardStatus);
      if(result) {
        socket.emit("game over", result);
        socket.to(opponent).emit("game over", result);
        playersManager.updatePlayer(socket.id, null, null);
        playersManager.updatePlayer(opponent, null, null);
      }
    }
  });

  socket.on('disconnect', function() {
    console.log(`${playersManager.getPlayer(socket.id)} left`);
    playersManager.deletePlayer(socket.id);
  })

  function createNewGame() {
    var opponent = playersManager.findAvailablePlayer(socket.id)
    if(opponent) {
      var gameId = gamesManager.createGame(socket.id, opponent);
      var symbol1, symbol2;
      // Maths.random generate numbers between 0 to 1
      // and Maths.round will give round of that value that is 0 or 1
      // and that will help us to choose symbols 
      if(Math.round(Math.random())) {
        symbol1 = 'O';
        symbol2 = 'X';
      } else {
        symbol1 = 'X';
        symbol2 = 'O';
      }
      playersManager.updatePlayer(socket.id, gameId, symbol1);
      playersManager.updatePlayer(opponent, gameId, symbol2);
      socket.emit("game start", symbol1, playersManager.getPlayer(opponent).name);
      socket.to(opponent).emit("game start", symbol2, playersManager.getPlayer(socket.id).name);
    }
  }
});

function calculateGameResult(board) {
  // Horizontal Lines
  if(board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
    return board[0][0];
  }
  if(board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
    return board[1][0];
  }
  if(board[2][0] === board[0][1] && board[2][1] === board[2][2]) {
    return board[2][0];
  }
  // Vertical Lines
  if(board[0][0] === board[0][1] && board[0][0] === board[0][2]) {
    return board[0][0];
  }
  if(board[1][0] === board[1][1] && board[1][0] === board[1][2]) {
    return board[1][0];
  }
  if(board[2][0] === board[2][1] && board[2][0] === board[2][2]) {
    return board[2][0];
  }
  //
  if(board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return board[0][0];
  }
  if(board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return board[0][2];
  }
  return null;
}
