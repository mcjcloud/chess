import { inBounds } from "."

const availableKnightMoves = (board, knight) => {
  const black = board[knight.y][knight.x].startsWith("b")
  const knightMoves = []
  const moves = [
    { x: knight.x + 2, y: knight.y + 1 },
    { x: knight.x + 1, y: knight.y + 2 },
    { x: knight.x + 2, y: knight.y - 1 },
    { x: knight.x + 1, y: knight.y - 2 },
    { x: knight.x - 2, y: knight.y - 1 },
    { x: knight.x - 1, y: knight.y - 2 },
    { x: knight.x - 2, y: knight.y + 1 },
    { x: knight.x - 1, y: knight.y + 2 },
  ]
  for (let move of moves) {
    if (!inBounds(move)) {
      continue
    }
    const sq = board[move.y][move.x]
    if (sq === "  " || sq.startsWith(black ? "w" : "b")) {
      knightMoves.push([knight, move])
    }
  }

  return knightMoves
}
export default availableKnightMoves
