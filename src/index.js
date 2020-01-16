import React from 'react';
import ReactDOM from 'react-dom';   // has ReactDOM.render()  for web apps
import './index.css';

// Child Component of Board
// OLD Class component- Has it's own state
// class Square extends React.Component {   
//   constructor(props) {
//     // calls the parent classes' constructor and passes props into it. Also used to call methods of parent class
//     super(props);         

//     this.state = {
//       value: null,        // will be 'X' or 'O'
//     };
//   }

//   render() {
//     return (
//       <button 
//         className="square" 
//         // onClick={()=> this.setState({value: 'X'})}     // Old
//         onClick={() => this.props.onClick()}     
//       >
//         {/* {this.state.value} */}                        
//         {this.props.value}
//       </button>
//     );
//   }
// }


// Functional component- Doesn't have it's own state
function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
      // ^same as
      // onClick={()= this.props.onClick()}
    >
      {props.value}
    </button>
  )
}


// Child Component of Game
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null)
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
    // make soft copy of squares array in state
    const squares = this.state.squares.slice();   

    // modify squares array (the copy not the array in state!)
    // avoiding direct datat mutation lets us keep previous versions so we can "time travel"
    // also helps build pure components
    squares[i] = 'X';

    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={()=> this.handleClick(i)}
      />);
  }

  render() {
    const status = "Next Player: X";
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