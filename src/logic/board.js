export const findAvailableSpace = (newBoard, colIndex) => {

  let availableRow = null

    for (let row = newBoard.length - 1; row >= 0; row--) {
      if (!newBoard[row][colIndex]) {
        availableRow = row
        break
      }
    }

    return availableRow
}

export const checkWinnerFrom = (board, rowIndex, colIndex, player) => {
  const directions = [
    { row: 0, col: 1 },  // Horizontal (→)
    { row: 1, col: 0 },  // Vertical (↓)
    { row: 1, col: 1 },  // Diagonal descendente (↘)
    { row: 1, col: -1 }  // Diagonal ascendente (↗)
  ];

  const inBounds = (row, col) =>
    row >= 0 && row < board.length && col >= 0 && col < board[0].length;

  for (const { row: dRow, col: dCol } of directions) {
    let count = 1;

    // Recorre en la dirección positiva (→, ↓, ↘, ↗)
    for (let i = 1; i < 4; i++) {
      const newRow = rowIndex + dRow * i;
      const newCol = colIndex + dCol * i;
      if (inBounds(newRow, newCol) && board[newRow][newCol] === player) {
        count++;
      } else {
        break;
      }
    }

    // Recorre en la dirección negativa (←, ↑, ↖, ↙)
    for (let i = 1; i < 4; i++) {
      const newRow = rowIndex - dRow * i;
      const newCol = colIndex - dCol * i;
      if (inBounds(newRow, newCol) && board[newRow][newCol] === player) {
        count++;
      } else {
        break;
      }
    }

    // Si hay 4 o más fichas consecutivas en cualquier dirección, hay un ganador
    if (count >= 4) {
      return player;
    }
  }

  return null;
}

export const checkEndGame = (newBoard) => {
  return newBoard.every(row => row.every(cell => cell !== null));
}

export const resetGame = () => {
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)
}
