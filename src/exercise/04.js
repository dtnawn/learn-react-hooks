// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'
import { useLocalStorageState } from '../utils';

function Board({ squares, setSquares, nextValue }) {
  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `5`.
  function selectSquare(square) {
    const currentValue = squares[square];
    if (currentValue) {
      return;
    }
    
    const updatedSquares = [...squares];
    updatedSquares[square] = nextValue;
    setSquares(updatedSquares);
    return updatedSquares;
  }

  function restart() {
    setSquares(Array(9).fill(null));
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  const [squares, setSquares] = useLocalStorageState("squares", Array(9).fill(null));
  const [moves, setMoves] = useLocalStorageState("moves", Array(Array(9).fill(null)));
  React.useEffect(() => {
    window.localStorage.setItem("squares", JSON.stringify(squares));
  }, [squares]);

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);
  
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} setSquares={(squares) => {
          if (!winner) {
            const updatedSquares = setSquares(squares)
            const updatedMoves = [...moves];
            updatedMoves.push(updatedSquares);
            setMoves(updatedMoves);
          }
        }} nextValue={nextValue} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
