import { useCallback, useState } from "react"
import availablePawnMoves from "./availablePawnMoves"
import availableRookMoves from "./availableRookMoves"

// board model
const DEFAULT_BOARD = {
  squares: [
    // a row
    ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
    ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
    ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
  ]
}

const useBoard = () => {
  const [board, setBoard] = useState(DEFAULT_BOARD.squares)
  const [lastMove, setLastMove] = useState([])
  const [lastLastMove, setLastLastMove] = useState([])

  const availableMoves = useCallback((src) => {
    console.log({ board, src })
    const srcPiece = board[src.y][src.x]
    switch (srcPiece.charAt(1)) {
      case "p": return availablePawnMoves(board, src)
      case "r": return availableRookMoves(board, src)
      default: return []
    }
  }, [board])

  const movePiece = useCallback((src, dest) => {
    const moves = availableMoves(src)
    console.log({ src, dest, moves })
    if (moves.some(([, m]) => m.x === dest.x && m.y === dest.y)) {
      const brd = [...board]
      brd[dest.y][dest.x] = brd[src.y][src.x]
      brd[src.y][src.x] = "  "
      setBoard(brd)
      setLastLastMove(lastMove)
      setLastMove([src, dest])
    }
  }, [board, lastMove, availableMoves])

  return {
    availableMoves,
    board,
    movePiece,
  }  
}
export default useBoard

export const inBounds = ({ x, y }) => {
  return x >= 0 && x < 8 && y >= 0 && y < 8
}
