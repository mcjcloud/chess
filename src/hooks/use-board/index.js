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
  ],
}

const useBoard = () => {
  const [board, setBoard] = useState(DEFAULT_BOARD.squares)
  const [lastMove, setLastMove] = useState([undefined, undefined])
  const [history, setHistory] = useState([])
  const [whiteTurn, setWhiteTurn] = useState(true)
  const [wkMoved, setWKMoved] = useState(false)
  const [wqrMoved, setWQRMoved] = useState(false)
  const [wkrMoved, setWKRMoved] = useState(false)
  const [bkMoved, setBKMoved] = useState(false)
  const [bqrMoved, setBQRMoved] = useState(false)
  const [bkrMoved, setBKRMoved] = useState(false)
  const [whiteInCheck, setWhiteInCheck] = useState(false)
  const [blackInCheck, setBlackInCheck] = useState(false)
  const [whiteInCheckmate, setWhiteInCheckmate] = useState(false)
  const [blackInCheckmate, setBlackInCheckmate] = useState(false)
  const [awaitingPromotion, setAwaitingPromotion] = useState(false)

  const evaluateMove = useCallback(
    (src, dest, _board) => {
      const brd = copyBoard(_board ?? board)
      const black = brd[src.y][src.x].startsWith("b")
      // if a king was moved by more than one then castle
      if (brd[src.y][src.x] === "bk" && src.x - dest.x === 2) {
        brd[0][3] = "br"
        brd[0][0] = "  "
      } else if (brd[src.y][src.x] === "bk" && src.x - dest.x === -2) {
        brd[0][5] = "br"
        brd[0][7] = "  "
      } else if (brd[src.y][src.x] === "wk" && src.x - dest.x === 2) {
        brd[7][3] = "wr"
        brd[7][0] = "  "
      } else if (brd[src.y][src.x] === "wk" && src.x - dest.x === -2) {
        brd[7][5] = "wr"
        brd[7][7] = "  "
      }

      // check en passant
      if (
        brd[src.y][src.x].endsWith("p") &&
        brd[src.y][dest.x] === (black ? "wp" : "bp") &&
        brd[dest.y][dest.x] === "  "
      ) {
        brd[src.y][dest.x] = "  "
      }

      brd[dest.y][dest.x] = brd[src.y][src.x]
      brd[src.y][src.x] = "  "

      return brd
    },
    [board]
  )

  const availableMoves = useCallback(
    (src, _brd, wTurn) => {
      const _board = _brd ?? board
      const srcPiece = _board[src.y][src.x]

      if (srcPiece.startsWith(whiteTurn ? "b" : "w")) {
        return []
      }

      const moves = (() => {
        switch (srcPiece.charAt(1)) {
          case "p":
            return availablePawnMoves(_board, src, lastMove)
          case "r":
            return availableRookMoves(_board, src)
          case "n":
            return availableKnightMoves(_board, src)
          case "b":
            return availableBishopMoves(_board, src)
          case "q":
            return availableQueenMoves(_board, src)
          case "k":
            return availableKingMoves(_board, src, {
              wkMoved,
              wqrMoved,
              wkrMoved,
              bkMoved,
              bqrMoved,
              bkrMoved,
            })
          default:
            return []
        }
      })()

      // perform one last filter to make sure the move does not put you in check
      return moves.filter(([, move]) => {
        // check if this is a king castle through check
        const piece = _board[src.y][src.x]
        if (piece.endsWith("k")) {
          if ((whiteTurn && whiteInCheck) || (!whiteTurn && blackInCheck)) {
            return false
          }

          if (Math.abs(move.x - src.x) > 1) {
            const direction = move.x - src.x > 0 ? -1 : 1
            const middleState = evaluateMove(src, { ...move, x: move.x + direction })
            if (inCheck(middleState, whiteTurn ? "wk" : "bk")) {
              return false
            }
          }
        }

        const brd = evaluateMove(src, move, _board)
        return (
          ((wTurn ?? whiteTurn) && !inCheck(brd, "wk")) ||
          (!(wTurn ?? whiteTurn) && !inCheck(brd, "bk"))
        )
      })
    },
    [
      board,
      lastMove,
      evaluateMove,
      whiteTurn,
      wkMoved,
      wqrMoved,
      wkrMoved,
      bkMoved,
      bqrMoved,
      bkrMoved,
    ]
  )

  const allAvailableMoves = useCallback(
    (_brd) => {
      const _board = _brd ?? board
      let allMoves = []
      for (let y = 0; y < _board.length; y++) {
        for (let x = 0; x < _board[y].length; x++) {
          if (whiteTurn && !_board[y][x].startsWith("w")) {
            continue
          }
          if (!whiteTurn && !_board[y][x].startsWith("b")) {
            continue
          }

          allMoves = [...allMoves, ...availableMoves({ x, y })]
        }
      }

      return allMoves
    },
    [board, whiteTurn, availableMoves]
  )

  const inCheckmate = useCallback(
    (brd, code) => {
      for (let y = 0; y < brd.length; y++) {
        for (let x = 0; x < brd.length; x++) {
          if (brd[y][x].startsWith(code[0])) {
            const moves = availableMoves({ x, y }, brd, code.startsWith("w"))
            if (moves.length > 0) {
              return false
            }
          }
        }
      }
      return true
    },
    [availableMoves]
  )

  const movePiece = useCallback(
    (src, dest) => {
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

        const brd = evaluateMove(src, dest)
        console.log({ brd })
        setLastMove([src, dest])
        setBoard(brd)
        setHistory([...history, [src, dest]])
        // if a pawn needs to promote, don't switch the turn or evaluate check
        if (dest.y === (whiteTurn ? 0 : 7) && brd[dest.y][dest.x] === (whiteTurn ? "wp" : "bp")) {
          setAwaitingPromotion(true)
          return
        }

        let checked = false
        if (whiteTurn) {
          setWhiteInCheck(false)
          checked = inCheck(brd, "bk")
          setBlackInCheck(checked)
        } else {
          setBlackInCheck(false)
          checked = inCheck(brd, "wk")
          setWhiteInCheck(checked)
        }

        // check checkmate
        if (whiteTurn && checked) {
          // black is in check
          const checkmate = inCheckmate(brd, "bk")
          if (checkmate) {
            setBlackInCheckmate(true)
          }
        } else if (!whiteTurn && checked) {
          // white is in check
          if (inCheckmate(brd, "wk")) {
            setWhiteInCheckmate(true)
          }
        }

        setWhiteTurn(!whiteTurn)
      }
    },
    [availableMoves, evaluateMove, history, inCheckmate, whiteTurn]
  )

  const promotePawn = useCallback(
    (src, choice) => {
      if (!awaitingPromotion) {
        return
      }

      const brd = copyBoard(board)
      brd[src.y][src.x] = choice
      setBoard(brd)

      let checked = false
      if (whiteTurn) {
        setWhiteInCheck(false)
        checked = inCheck(brd, "bk")
        setBlackInCheck(checked)
      } else {
        setBlackInCheck(false)
        checked = inCheck(brd, "wk")
        setWhiteInCheck(checked)
      }

      // check checkmate
      if (whiteTurn && checked) {
        // black is in check
        const checkmate = inCheckmate(brd, "bk")
        if (checkmate) {
          setBlackInCheckmate(true)
        }
      } else if (!whiteTurn && checked) {
        // white is in check
        if (inCheckmate(brd, "wk")) {
          setWhiteInCheckmate(true)
        }
      }

      setWhiteTurn(!whiteTurn)
      setAwaitingPromotion(false)
    },
    [awaitingPromotion, board, inCheckmate, whiteTurn]
  )

  return {
    availableMoves,
    allAvailableMoves,
    awaitingPromotion,
    board,
    history,
    whiteTurn,
    movePiece,
    promotePawn,
    whiteInCheck,
    blackInCheck,
    whiteInCheckmate,
    blackInCheckmate,
  }
}
export default useBoard

export const copyBoard = (board) => {
  return board.map((row) => [...row])
}

export const inBounds = ({ x, y }) => {
  return x >= 0 && x < 8 && y >= 0 && y < 8
}

export const isEmpty = (board, ...squares) => {
  return squares.every((s) => board[s.y][s.x] === "  ")
}

const inCheck = (board, code) => {
  if (!code || !code.endsWith("k")) {
    return false
  }
  const black = code === "bk"

  // find the king's coordinates
  let king
  for (const y in board) {
    for (const x in board[y]) {
      if (board[y][x] === code) {
        king = { x: +x, y: +y }
        break
      }
    }
  }
  if (!king) {
    return false
  }

  // check diagonal moves
  const diagonalMoves = availableBishopMoves(board, king)
  for (let [, move] of diagonalMoves) {
    if (
      board[move.y][move.x] === (black ? "wb" : "bb") ||
      board[move.y][move.x] === (black ? "wq" : "bq")
    ) {
      return true
    }

    if (
      black &&
      move.y === king.y + 1 &&
      (move.x === king.x + 1 || move.x === king.x - 1) &&
      board[move.y][move.x] === "wp"
    ) {
      return true
    }
    if (
      !black &&
      move.y === king.y - 1 &&
      (move.x === king.x + 1 || move.x === king.x - 1) &&
      board[move.y][move.x] === "bp"
    ) {
      return true
    }

    if (
      (move.y === king.y + 1 || move.y === king.y - 1) &&
      (move.x === king.x + 1 || move.x === king.x - 1) &&
      board[move.y][move.x] === (black ? "wk" : "bk")
    ) {
      return true
    }
  }

  // check horizontal moves
  const straightMoves = availableRookMoves(board, king)
  for (let [, move] of straightMoves) {
    if (
      board[move.y][move.x] === (black ? "wr" : "br") ||
      board[move.y][move.x] === (black ? "wq" : "bq")
    ) {
      return true
    }

    const offY = move.y === king.y + 1 || move.y === king.y - 1
    const offX = move.x === king.x + 1 || move.x === king.x - 1
    if (((offX && !offY) || (!offX && offY)) && board[move.y][move.x] === (black ? "wk" : "bk")) {
      return true
    }
  }

  // check knight moves
  const knightMoves = availableKnightMoves(board, king)
  for (let [, move] of knightMoves) {
    if (board[move.y][move.x] === (black ? "wn" : "bn")) {
      return true
    }
  }
  return false
}
