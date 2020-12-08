import { inBounds } from "."

const availableBishopMoves = (board, bishop, lastMove) => {
  const black = board[bishop.y][bishop.x].startsWith("b")
  const xrBound = 8 - bishop.x
  const xlBound = bishop.x
  const ybBound = 8 - bishop.y
  const ytBound = bishop.y
  const moves = [];
  for (let offset = 1; offset <= xrBound && offset <= ytBound; offset++) {
    moves.push({ x: bishop.x + offset, y: bishop.y - offset })
  }
  for (let offset = 1; offset <= xrBound && offset <= ybBound; offset++) {
    moves.push({ x: bishop.x + offset, y: bishop.y + offset })
  }
  for (let offset = 1; offset <= xlBound && offset <= ybBound; offset++) {
    moves.push({ x: bishop.x - offset, y: bishop.y + offset })
  }
  for (let offset = 1; offset <= xlBound && offset <= ytBound; offset++) {
    moves.push({ x: bishop.x - offset, y: bishop.y - offset })
  }

  const bishopMoves = [];
  for (const move of moves) {
    const { x, y } = move
    if (inBounds(move) && board[y][x].startsWith(" ")) {
      bishopMoves.push(move)
    } else if (inBounds(move) && board[y][x].startsWith(black ? "w" : "b")) {
      bishopMoves.push(move)
      break
    } else {
      break
    }
  }

  return bishopMoves.map(m => [bishop, m])
}
export default availableBishopMoves
