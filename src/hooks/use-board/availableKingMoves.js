import { inBounds } from "."

const availableKingMoves = (board, king, lastMove) => {
  const black = board[king.y][king.x].startsWith("b")
  const moves = [
    { x: king.x + 1, y: king.y + 1 },
    { x: king.x + 1, y: king.y },
    { x: king.x + 1, y: king.y - 1 },
    { x: king.x, y: king.y - 1 },
    { x: king.x - 1, y: king.y - 1 },
    { x: king.x - 1, y: king.y },
    { x: king.x - 1, y: king.y + 1 },
    { x: king.x, y: king.y + 1 },
  ]

  return moves.filter((move) => {
    const { x, y } = move
    if (inBounds(move) && (board[y][x].startsWith(black ? "w" : "b") || board[y][x].startsWith(" "))) {
      return true
    }
    return false
  }).map(m => [king, m])
}
export default availableKingMoves
