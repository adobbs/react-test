import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button 
            className="square" 
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

function Board(props) {
    function renderSquare(i) {
        return (
            <Square 
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
            />
        );
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
    </div>
    );
}

function Game() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [history, setHistory] = useState([squares]);
    const [xIsNext, setXIsNext] = useState(true);

    console.log(history);

    const current = history[history.length - 1];
    console.log(current);
    const winner = calculateWinner(current);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    function handleClick(i) {
        const newHistory = history;
        const newCurrent = newHistory[newHistory.length - 1];
        const newSquares = squares.slice();
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }
        newSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(newSquares); 
        setHistory(newHistory.concat([newSquares]));
        setXIsNext(!xIsNext);
    }

    return (
    <div className="game">
        <div className="game-board">
        <Board 
            squares={current}
            onClick={(i) => handleClick(i)}
        />
        </div>
        <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
        </div>
    </div>
    );
}
  
// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

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
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }