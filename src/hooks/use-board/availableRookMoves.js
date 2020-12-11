import { inBounds } from "."

const availableRookMoves = (board, rook) => {
  return [
    ...verticalMovesFromSquare(board, rook),
    ...horizontalMovesFromSquare(board, rook),
  ]
}
export default availableRookMoves

export const verticalMovesFromSquare = (board, square) => {
  const verticalMoves = []
  const black = board[square.y][square.x].startsWith("b")

  for (let y = square.y + 1; y < 8; y++) {
    const dest = { x: square.x, y }
    if (!inBounds(dest)) {
      continue
    }
    if (board[dest.y][dest.x] === "  ") {
      verticalMoves.push([square, dest])
    } else if (black && board[dest.y][dest.x].startsWith("w")) {
      verticalMoves.push([square, dest])
      break
    } else if (!black && board[dest.y][dest.x].startsWith("b")) {
      verticalMoves.push([square, dest])
      break
    } else {
      break
    }
  }
  for (let y = square.y - 1; y >= 0; y--) {
    const dest = { x: square.x, y }
    if (!inBounds(dest)) {
      continue
    }
    if (board[dest.y][dest.x] === "  ") {
      verticalMoves.push([square, dest])
    } else if (black && board[dest.y][dest.x].startsWith("w")) {
      verticalMoves.push([square, dest])
      break
    } else if (!black && board[dest.y][dest.x].startsWith("b")) {
      verticalMoves.push([square, dest])
      break
    } else {
      break
    }
  }
  return verticalMoves
}

export const horizontalMovesFromSquare = (board, square) => {
  const horizontalMoves = []
  const black = board[square.y][square.x].startsWith("b")

  for (let x = square.x + 1; x < 8; x++) {
    const dest = { x, y: square.y }
    if (!inBounds(dest)) {
      continue
    }
    if (board[dest.y][dest.x] === "  ") {
      horizontalMoves.push([square, dest])
    } else if (black && board[dest.y][dest.x].startsWith("w")) {
      horizontalMoves.push([square, dest])
      break
    } else if (!black && board[dest.y][dest.x].startsWith("b")) {
      horizontalMoves.push([square, dest])
      break
    } else {
      break
    }
  }
  for (let x = square.x - 1; x >= 0; x--) {
    const dest = { x, y: square.y }
    if (!inBounds(dest)) {
      continue
    }
    if (board[dest.y][dest.x] === "  ") {
      horizontalMoves.push([square, dest])
    } else if (black && board[dest.y][dest.x].startsWith("w")) {
      horizontalMoves.push([square, dest])
      break
    } else if (!black && board[dest.y][dest.x].startsWith("b")) {
      horizontalMoves.push([square, dest])
      break
    } else {
      break
    }
  }
  return horizontalMoves
}
