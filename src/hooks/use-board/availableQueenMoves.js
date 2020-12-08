import availableBishopMoves from "./availableBishopMoves"
import availableRookMoves from "./availableRookMoves"

const availableQueenMoves = (board, queen, lastMove) => {
  return [...availableRookMoves(board, queen, lastMove), ...availableBishopMoves(board, queen, lastMove)]
}
export default availableQueenMoves
