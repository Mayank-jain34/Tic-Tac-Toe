import React from 'react';
import Board from '../board/BoardContainer';

class Playground extends React.Component {
  render() {
    return (
      <div className="playground-container">
        <h1 className="player-info">
          <span>{this.props.playerName}</span>
          <span> v/s </span>
          <span>{this.props.opponentName}</span>
        </h1>
        {
          this.props.gameStatus === "PLAYING"
          ? (
              <div>
              {this.props.myTurn
              ? "Your Turn..."
              : `${this.props.opponentName}'s turn...'`}
              </div>
          )
          : null
        }

        <Board turn={this.props.myTurn}/>
        {
          this.props.gameStatus === 'LOADING'
          ? <div className="announcement">
              <div className="finding-player">Finding Player...</div>
          </div>
          : null
        }
        {
          this.props.gameStatus === 'GAMEOVER'
          ? <div className="announcement">
              <div className="game-over">
                <div>{this.props.gameResult}</div>
                <button onClick={this.props.startNewGame}>Start New Game</button>
              </div>
          </div>
          : null
        }

      </div>
    );
  }
}

export default Playground;
