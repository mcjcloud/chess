import { useCallback, useState } from "react"
import availableBishopMoves from "./availableBishopMoves"
import availableKingMoves from "./availableKingMoves"
import availableKnightMoves from "./availableKnightMoves"
import availablePawnMoves from "./availablePawnMoves"
import availableQueenMoves from "./availableQueenMoves"
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
  const [wkMoved, setWKMoved] = useState(false)
  const [wqrMoved, setWQRMoved] = useState(false)
  const [wkrMoved, setWKRMoved] = useState(false)
  const [bkMoved, setBKMoved] = useState(false)
  const [bqrMoved, setBQRMoved] = useState(false)
  const [bkrMoved, setBKRMoved] = useState(false)

  const availableMoves = useCallback((src) => {
    const srcPiece = board[src.y][src.x]
    switch (srcPiece.charAt(1)) {
      case "p": return availablePawnMoves(board, src)
      case "r": return availableRookMoves(board, src)
      case "n": return availableKnightMoves(board, src)
      case "b": return availableBishopMoves(board, src)
      case "q": return availableQueenMoves(board, src)
      case "k": return availableKingMoves(board, src, { wkMoved, wqrMoved, wkrMoved, bkMoved, bqrMoved, bkrMoved })
      default: return []
    }
  }, [board, wkMoved, wqrMoved, wkrMoved, bkMoved, bqrMoved, bkrMoved])

  const movePiece = useCallback((src, dest) => {
    const moves = availableMoves(src)
    console.log({ src, dest, moves })
    if (moves.some(([, m]) => m.x === dest.x && m.y === dest.y)) {
      // check if the piece moved is the king from the king square or rook from the rook square
      if (src.y === 0 && src.x === 4) {
        // black king
        setBKMoved(true)
      } else if (src.y === 0 && src.x === 0) {
        // black queen side rook
        setBQRMoved(true)
      } else if (src.y === 0 && src.x === 7) {
        // black king side rook
        setBKRMoved(true)
      } else if (src.y === 7 && src.x === 4) {
        // white king
        setWKMoved(true)
      } else if (src.y === 7 && src.x === 0) {
        // white queen side rook
        setWQRMoved(true)
      } else if (src.y === 7 && src.x === 7) {
        // white king side rook
        setWKRMoved(true)
      }
      
      const brd = [...board]
      // if a king was moved by more than one then castle
      if (board[src.y][src.x] === "bk" && src.x - dest.x === 2) {
        brd[0][3] = "br"
        brd[0][0] = "  "
      } else if (board[src.y][src.x] === "bk" && src.x - dest.x === -2) {
        brd[0][5] = "br"
        brd[0][7] = "  "
      } else if (board[src.y][src.x] === "wk" && src.x - dest.x === 2) {
        brd[7][3] = "wr"
        brd[7][0] = "  "
      } else if (board[src.y][src.x] === "wk" && src.x - dest.x === -2) {
        brd[7][5] = "wr"
        brd[7][7] = "  "
      }

      brd[dest.y][dest.x] = brd[src.y][src.x]
      brd[src.y][src.x] = "  "

      setBoard(brd)
    }
  }, [board, availableMoves])

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

export const isEmpty = (board, ...squares) => {
  return squares.every(s => board[s.y][s.x] === "  ")
}
