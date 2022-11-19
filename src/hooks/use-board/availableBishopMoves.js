import { inBounds } from "."

const availableBishopMoves = (board, bishop) => {
  const black = board[bishop.y][bishop.x].startsWith("b")
  const xrBound = 8 - bishop.x
  const xlBound = bishop.x
  const ybBound = 8 - bishop.y
  const ytBound = bishop.y
  const moves = [];
  // check top left diagonal
  for (let offset = 1; offset <= xrBound && offset <= ytBound; offset++) {
    const move = { x: bishop.x + offset, y: bishop.y - offset }
    if (inBounds(move)) {
      const empty = board[move.y][move.x].startsWith(" ")
      const oppositePiece = board[move.y][move.x].startsWith(black ? "w" : "b")
      if (empty || oppositePiece) {
        moves.push(move)
      }
      if (!empty) {
        break
      }
    }
  }

  // check bottom right diagonal
  for (let offset = 1; offset <= xrBound && offset <= ybBound; offset++) {
    const move = { x: bishop.x + offset, y: bishop.y + offset }
    if (inBounds(move)) {
      const empty = board[move.y][move.x].startsWith(" ")
      const oppositePiece = board[move.y][move.x].startsWith(black ? "w" : "b")
      if (empty || oppositePiece) {
        moves.push(move)
      }
      if (!empty) {
        break
      }
    }
  }

  // check bottom left diagonal
  for (let offset = 1; offset <= xlBound && offset <= ybBound; offset++) {
    const move = { x: bishop.x - offset, y: bishop.y + offset }
    if (inBounds(move)) {
      const empty = board[move.y][move.x].startsWith(" ")
      const oppositePiece = board[move.y][move.x].startsWith(black ? "w" : "b")
      if (empty || oppositePiece) {
        moves.push(move)
      }
      if (!empty) {
        break
      }
    }
  }

  // check top left diagonal
  for (let offset = 1; offset <= xlBound && offset <= ytBound; offset++) {
    const move = { x: bishop.x - offset, y: bishop.y - offset }
    if (inBounds(move)) {
      const empty = board[move.y][move.x].startsWith(" ")
      const oppositePiece = board[move.y][move.x].startsWith(black ? "w" : "b")
      if (empty || oppositePiece) {
        moves.push(move)
      }
      if (!empty) {
        break
      }
    }
  }

  return moves.map(m => [bishop, m])
}
export default availableBishopMoves
