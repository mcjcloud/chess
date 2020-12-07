import { useCallback, useState } from "react"

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
    const srcPiece = board[src.x][src.y]
    switch (srcPiece.charAt(1)) {
      case "p": return availablePawnMoves(board, src)
      default: return []
    }
  }, [board])

  const movePiece = useCallback((src, dest) => {
    const moves = availableMoves(board, src, lastMove)
    if (moves.includes(dest)) {
      const brd = [...board]
      brd[dest.x][dest.y] = brd[src.x][src.y]
      brd[src.x][src.y] = "  "
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

const availablePawnMoves = (board, pawn, lastMove) => {
  const moves = []
  const black = board[pawn.x][pawn.y].startsWith("b")

  const moveForwards = [
    { x: pawn.x, y: black ? pawn.y + 1 : pawn.y - 1 },
    { x: pawn.x, y: black ? pawn.y + 2 : pawn.y - 2 },
  ]
  for (let moveForward of moveForwards) {
    const inBounds = moveForward.y > 0 && moveForward.y < 8
    const destEmpty = board[moveForward.x][moveForward.y] === "  "
    const cameFromStart = black ? (pawn.y === 1) : (pawn.y === 6)
    const isAdvancingByTwo = Math.abs(moveForward.y - pawn.y) === 2
    if (inBounds && destEmpty && (isAdvancingByTwo ? cameFromStart : true)) {
      moves.push(moveForward)
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
    // if you're taking tiagonally or if it's a special (an pisant?)
    // TODO: implement the special move
    const takingDiagonally = board[move.x][move.y].startsWith(black ? "w" : "b")
    if (takingDiagonally) {
      moves.push(move)
    }
  }
  return moves
}
