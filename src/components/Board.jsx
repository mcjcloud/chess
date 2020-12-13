import React, { useCallback, useState } from "react"
import styled from "styled-components"
import Square from "./Square"

const Board = ({ board: {
  availableMoves,
  awaitingPromotion,
  board,
  movePiece,
  promotePawn,
  whiteTurn,
  whiteInCheck,
  blackInCheck,
  whiteInCheckmate,
  blackInCheckmate
}}) => {
  const [selectedMoves, setSelectedMoves] = useState([])

  const selectPiece = useCallback(
    (square) => {
      const moves = availableMoves(square)
      setSelectedMoves(moves)
    },
    [availableMoves]
  )

  return (
    <div>
      <BoardWrapper>
        {board &&
          board.map((row, y) => {
            return (
              <Row key={`row_${y}`}>
                {row.map((piece, x) => {
                  const [src] = selectedMoves.find(([, m]) => m.x === x && m.y === y) ?? [undefined]
                  const pieceTurn = (whiteTurn && piece.startsWith("w")) || (!whiteTurn && piece.startsWith("b")) || src
                  const promotingPawn = whiteTurn ? (piece === "wp" && y === 0) : (piece === "bp" && y === 7)
                  return (
                    <Square
                      key={`square_${x}`}
                      promote={promotingPawn}
                      piece={piece}
                      black={(y % 2 === 0 && x % 2 === 0) || (y % 2 !== 0 && x % 2 !== 0)}
                      showPlaceholder={src}
                      inCheck={(piece === "wk" && whiteInCheck) || (piece === "bk" && blackInCheck)}
                      selectable={(pieceTurn && awaitingPromotion && promotingPawn) || (pieceTurn && !awaitingPromotion)}
                      handler={(choice) => {
                        if (choice) {
                          promotePawn({ x, y }, whiteTurn ? `w${choice}` : `b${choice}`)
                          return
                        }
                        if (src) {
                          movePiece(src, { x, y })
                          setSelectedMoves([])
                        } else if ((board[y][x].startsWith("w") && whiteTurn) || (board[y][x].startsWith("b") && !whiteTurn)) {
                          selectPiece({ x, y })
                        }
                      }}
                    />
                  )
                })}
              </Row>
            )
          })}
      </BoardWrapper>
    </div>
  )
}
export default Board

const BoardWrapper = styled.div`
  width: 80vmin;
  height: 80vmin;
  max-width: 1000px;
  max-height: 1000px;

  display: grid;
  grid-template-rows: repeat(8, 1fr);
  overflow: hidden;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  overflow: hidden;
`
