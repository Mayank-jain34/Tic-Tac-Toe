import React from 'react';
import Login from './Login';
import Board from './Board';

class App extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.state = {
      playerName : '',
      opponentName : '',
      symbol : '',
      myTurn : false,
      boardStatus : [
        ['','',''],
        ['','',''],
        ['','','']
      ]
    }
  }
  componentDidMount() {
    this.props.socket.on("game start", (symbol, opponentName) => {
      console.error("Game Started", symbol);
      var myTurn = symbol === 'O' ? true : false;
      this.setState({symbol, myTurn, opponentName})
    })

    this.props.socket.on("turn complete", (boardStatus) => {
      console.error("boardStatus", boardStatus);
      this.setState({boardStatus, myTurn : true})
    })

    this.props.socket.on("game over", (symbol) => {
      if(symbol === this.state.symbol) {
        console.error("You Won");
      } else {
        console.error("You Lost");
      }
      this.setState({
        opponentName : '',
        symbol : '',
        myTurn : false,
        boardStatus : [
          ['','',''],
          ['','',''],
          ['','','']
        ]
      })
    })
  }
  onSubmit(playerName) {
    this.setState({ playerName });
    this.props.socket.emit('player joined', playerName)
  }
  startNewGame() {
    this.props.socket.emit('new game', this.state.playerName);
  }
  onCellClick(id) {
    if(!this.state.myTurn) {
      alert("Not ur turn")
      return;
    }
    var [i, j] = id.split("-");
    console.error(i, j);
    var boardStatus = this.state.boardStatus;
    boardStatus[i][j] = this.state.symbol;
    this.props.socket.emit('turn complete', {i, j})
    this.setState({boardStatus, myTurn: false});
  }
  render() {
    return this.state.playerName
      ? <Board startNewGame={this.startNewGame} player={this.state.playerName} opponent={this.state.opponentName}  onCellClick={this.onCellClick} boardStatus={this.state.boardStatus}/>
      : <Login onSubmit={this.onSubmit}/>
  }
}

export default App;
