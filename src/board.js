import Square from './square';
import React from 'react';

// Child Component of Game
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true                       // each time a player moves, this will be toggled true/false
    };
    // later squares will look like:
    // [
    //   'O', null, 'X',
    //   'X', 'X', 'O',
    //   'O', null, null,
    // ]

    // this.handleClick = this.handleClick.bind(this);
  }


  handleClick(i) {
    // make soft copy of squares array in state (Immutability!!)
    const squares = this.state.squares.slice();
    
    // Only change state if value at position i in squares array is null
    // and no one won the game
    if (squares[i] === null && calculateWinner(squares) === null) {
      
      // Modify squares array (the copy not the array in state!)
      // Avoiding direct datat mutation lets us keep previous versions so we can "time travel"
      // Also helps build pure components (main benefit)
      squares[i] = this.state.xIsNext ? 'X' : 'O';
  
      this.setState({                 // don't modify state directly bec. 1) harder to debug, 2) harder to scale/optimize, 3) can overwrite setState if this.state comes after (setState not guaranteed to be synch?) 
        squares: squares,
        xIsNext: !this.state.xIsNext
      });
    }
  }


  handleReset() {
    const squares = Array(9).fill(null);
    this.setState({
      squares,
      xIsNext: true
    });
  }


  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />);
  }


  render() {
    const { squares } = this.state;
    const winner = calculateWinner(squares);
    let status, resetButton;

    // if there's a winner, display winner
    if (winner) {
      status = 'Congrats! Player ' + winner + ' won!';
      resetButton = <button onClick={() => this.handleReset()}>Reset</button>;
    } else if (isDraw(squares)) {
      status = 'It\'s a Draw! No one wins';
      resetButton = <button onClick={() => this.handleReset()}>Reset</button>;
    } else {
      status = "Next Player: " + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        {resetButton}
      </div>
    );
  }
}

export default Board;




// Helper function decides who won
// Ex. squares =
// [
//   'O', null, 'X',
//   'X', 'X', 'O',
//   'O', null, null,
// ]
// returns 'X', 'O', or null
function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2],            // nums refer to 'X's, 'O's, or null in squares array
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    // deconstruction/multi var assignment
    const [a, b, c] = winningLines[i];
    // i = 0:   a = 0, b = 1, c = 2

    // if all values of a line in squares are the same, we have a winner
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;            // no winner
}



// Helper function
// takes in squares Array, returns boolean if game is a draw
function isDraw(squares) {
  // if all the elements in squares array are not null, then game is over
  return squares.every((element) => element != null);
}