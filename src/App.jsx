import { useState } from 'react';
import Message from './components/Message';
import Board from './components/Board';
import Restart from './components/Restart';
import './App.css'

function App() {

  const [squares, setSquares] = useState(Array(9).fill(""));

  const [xTurn, setXTurn] = useState(true);

  const [message, setMessage] = useState("X o'yinchi");

  const [gameover, setGameover] = useState(false);


  const handeClick = (index) => {
    let boardTemp = [...squares];

    if (!gameover) {
      if (boardTemp[index] !== "") return;

      boardTemp[index] = xTurn ? "X" : "O"

      setXTurn(!xTurn)
      setSquares(boardTemp)
      setMessage(xTurn ? "O o'yinchi ✳️" : "X o'yinchi ❌")
    }

    if (checkWinner(boardTemp)) {
      setMessage((xTurn ? "X o'yinchi yutdi ❌" : "O o'yinchi yutdi ✳️"))
      setGameover(true);
    }

    if(boardTemp.every((i) => i === "X" || i === "O") && !checkWinner(boardTemp)
    ) {
      setMessage("Durang")
      setGameover(true);
    } 
  }

  const checkWinner = (board) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    let turnHolder = xTurn ? 'X' : 'O';

    let resultArr = [];

    winConditions.forEach((combination) => {
      let row = [
        board[combination[0]],
        board[combination[1]],
        board[combination[2]],
      ]
      let results = row.every((currentValue) => currentValue === turnHolder);
      resultArr.push(results)
    })
    if (resultArr.includes(true)) return true;
  }

  const resetGame = () => {
    setXTurn(true)
    setSquares(Array(9).fill(""));
    setMessage("X o'yinchining yurishi")
    setGameover(false)
  }

  return (
    <main className='flex items-center flex-col'>
      <Message msg={message} />
      <Board squares={squares} handeClick={handeClick} />
      <Restart resetGame={resetGame} />
    </main>
  )
}

export default App
