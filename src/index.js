import React from 'react';
import ReactDOM from 'react-dom';   // has ReactDOM.render()  for web apps
import './index.css';
import Board from './board';

// Parent Component of Board
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/*status*/}</div>
          <ol>{/*TODO*/}</ol>
        </div>
      </div>
    );
  }
}


// Waits for DOM to load, then grabs div element with id = root
// and inserts Game component there
ReactDOM.render(
  <Game />,
  document.getElementById('root')   
);