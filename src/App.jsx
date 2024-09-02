import { useState } from 'react'
import { TURNS } from './constants'
import { WinnerModal } from './components/WinnerModal'
import confetti from "canvas-confetti"
import { saveGameToStorage, resetGameStorage } from './logic/storage'
import { checkWinnerFrom, checkEndGame, findAvailableSpace } from './logic/board'
import { Token } from './components/Token'
import './App.css'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array.from({ length: 6 }, () => Array(7).fill(null))
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.R
  })
  // null es que no hay ganador, false es empate
  const [winner, setWinner] = useState(null)

  const updateBoard = (rowIndex, colIndex) => {

    if (board[rowIndex][colIndex] || winner) return

    const newBoard = [...board]

    const availableSpace = findAvailableSpace(newBoard, colIndex)

    if (availableSpace === null) return

    newBoard[availableSpace][colIndex] = turn
    setBoard(newBoard)

    const newWinner = checkWinnerFrom(newBoard, availableSpace, colIndex, turn)

    const newTurn = turn === TURNS.R ? TURNS.Y : TURNS.R
    setTurn(newTurn)

    saveGameToStorage({ board: newBoard, turn: newTurn })

    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array.from({ length: 6 }, () => Array(7).fill(null)))
    setTurn(TURNS.R)
    setWinner(null)

    resetGameStorage()
  }

  return (
    <main className='board'>
      <h1>Conecta 4</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        <div>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((token, colIndex) => (
                <div
                  key={colIndex}
                  className="cell"
                  onClick={() => updateBoard(rowIndex, colIndex)}
                >
                  <Token player={token} isSelected />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
      <section className='turn'>
        <Token player={TURNS.R} isSelected={turn === TURNS.R} />
        <Token player={TURNS.Y} isSelected={turn === TURNS.Y} />
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
