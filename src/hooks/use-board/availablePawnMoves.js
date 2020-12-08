import { inBounds } from "."

const availablePawnMoves = (board, pawn) => {
  const moves = []
  const black = board[pawn.y][pawn.x].startsWith("b")

  const moveForwards = [
    { x: pawn.x, y: black ? pawn.y + 1 : pawn.y - 1 },
    { x: pawn.x, y: black ? pawn.y + 2 : pawn.y - 2 },
  ]
  for (let moveForward of moveForwards) {
    if (!inBounds(moveForward)) {
      continue
    }
    const destEmpty = board[moveForward.y][moveForward.x] === "  "
    const cameFromStart = black ? (pawn.y === 1) : (pawn.y === 6)
    const isAdvancingByTwo = Math.abs(moveForward.y - pawn.y) === 2
    if (destEmpty && (isAdvancingByTwo ? cameFromStart : true)) {
      moves.push([pawn, moveForward])
    }
  }

  const diagonalMoves = [
    {
      x: pawn.x + 1,
      y: black ? pawn.y + 1 : pawn.y - 1,
    },
    {
      x: pawn.x - 1,
      y: black ? pawn.y + 1 : pawn.y - 1,
    },
  ]
  for (let move of diagonalMoves) {
    // TODO: implement the special move
    if (!inBounds(move)) {
      continue
    }
    const takingDiagonally = board[move.y][move.x]?.startsWith(black ? "w" : "b") ?? false
    if (takingDiagonally) {
      moves.push([pawn, move])
    }
  }
  return moves
}
export default availablePawnMoves
