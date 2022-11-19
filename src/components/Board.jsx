import React, { useCallback, useState } from "react"
import styled from "styled-components"
import Square from "./Square"

const Board = ({
  board: {
    availableMoves,
    awaitingPromotion,
    board,
    movePiece,
    promotePawn,
    whiteTurn,
    whiteInCheck,
    blackInCheck,
    whiteInCheckmate,
    blackInCheckmate,
  },
}) => {
  const [selectedMoves, setSelectedMoves] = useState([])

  const selectPiece = useCallback(
    (square) => {
      const moves = availableMoves(square)
      setSelectedMoves(moves)
    },
    [availableMoves]
  )

  const deselectPiece = useCallback(() => {
    setSelectedMoves([])
  })

  return (
    <div>
      <BoardWrapper>
        {board &&
          board.map((row, y) => {
            return (
              <Row key={`row_${y}`}>
                {row.map((piece, x) => {
                  const [src] = selectedMoves.find(([, m]) => m.x === x && m.y === y) ?? [undefined]
                  const pieceTurn =
                    (whiteTurn && piece.startsWith("w")) ||
                    (!whiteTurn && piece.startsWith("b")) ||
                    src
                  const promotingPawn = whiteTurn
                    ? piece === "wp" && y === 0
                    : piece === "bp" && y === 7
                  return (
                    <Square
                      key={`square_${x}`}
                      promote={promotingPawn}
                      piece={piece}
                      black={(y % 2 === 0 && x % 2 !== 0) || (y % 2 !== 0 && x % 2 === 0)}
                      showPlaceholder={src}
                      inCheck={(piece === "wk" && whiteInCheck) || (piece === "bk" && blackInCheck)}
                      selectable={
                        (pieceTurn && awaitingPromotion && promotingPawn) ||
                        (pieceTurn && !awaitingPromotion)
                      }
                      promotionHandler={(choice) => {
                        if (choice) {
                          promotePawn({ x, y }, whiteTurn ? `w${choice}` : `b${choice}`)
                          return
                        }
                        if (src) {
                          movePiece(src, { x, y })
                          setSelectedMoves([])
                        } else if (
                          (board[y][x].startsWith("w") && whiteTurn) ||
                          (board[y][x].startsWith("b") && !whiteTurn)
                        ) {
                          selectPiece({ x, y })
                        }
                      }}
                      x={x}
                      y={y}
                      movePiece={movePiece}
                      selectPiece={selectPiece}
                      deselectPiece={deselectPiece}
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
  width: 70vmin;
  height: 70vmin;
  max-width: 1000px;
  max-height: 1000px;
  background-color: #eee;
  margin-right: 5rem;

  display: grid;
  grid-template-rows: repeat(8, 1fr);
  overflow: hidden;
  border-radius: 25px;
  box-shadow: 16px 16px 24px 0 rgba(0, 0, 0, 0.2), -16px -16px 24px 0 rgba(255, 255, 255, 0.5);
`

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  overflow: hidden;
`
