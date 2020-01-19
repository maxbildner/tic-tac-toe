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

    // this.handleClick() = this.bind(this.handleClick)
  }

  handleClick(i) {
    // make soft copy of squares array in state (Immutability!!)
    const squares = this.state.squares.slice();

    // modify squares array (the copy not the array in state!)
    // Avoiding direct datat mutation lets us keep previous versions so we can "time travel"
    // Also helps build pure components (main benefit)
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
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
    const status = "Next Player: " + (this.state.xIsNext ? 'X' : 'O');
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
      </div>
    );
  }
}

export default Board;