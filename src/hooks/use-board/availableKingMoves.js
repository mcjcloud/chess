import { inBounds, isEmpty } from "."

const availableKingMoves = (board, king, dependencies) => {
  const { wkMoved, wqrMoved, wkrMoved, bkMoved, bqrMoved, bkrMoved } = dependencies
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

  if (black && !bkMoved && !bqrMoved && isEmpty(board, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 })) {
    moves.push({ x: 2, y: 0 })
  }
  if (black && !bkMoved && !bkrMoved && isEmpty(board, { x: 5, y: 0 }, { x: 6, y: 0 })) {
    moves.push({ x: 6, y: 0 })
  }
  if (!black && !wkMoved && !wqrMoved && isEmpty(board, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 })) {
    moves.push({ x: 2, y: 7 })
  }
  if (!black && !wkMoved && !wkrMoved && isEmpty(board, { x: 5, y: 7 }, { x: 6, y: 7 })) {
    moves.push({ x: 6, y: 7 })
  }

  return moves.filter((move) => {
    const { x, y } = move
    return inBounds(move) && (board[y][x].startsWith(black ? "w" : "b") || board[y][x].startsWith(" "))
  }).map(m => [king, m])
}
export default availableKingMoves
