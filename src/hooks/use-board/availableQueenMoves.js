import availableBishopMoves from "./availableBishopMoves"
import availableRookMoves from "./availableRookMoves"

const availableQueenMoves = (board, queen) => {
  return [...availableRookMoves(board, queen), ...availableBishopMoves(board, queen)]
}
export default availableQueenMoves
