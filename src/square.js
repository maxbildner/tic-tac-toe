import React from 'react';

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
      id={props.squareColor}
    >
      {props.value}
    </button>
  )
}

export default Square;