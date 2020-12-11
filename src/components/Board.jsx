import React, { useCallback, useState } from "react"
import styled from "styled-components"
import useBoard from "../hooks/use-board"
import Square from "./Square"

const Board = () => {
  const { availableMoves, board, movePiece, whiteTurn, whiteInCheck, blackInCheck, whiteInCheckmate, blackInCheckmate } = useBoard()
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
      <pre>{`${blackInCheckmate}`}</pre>
      <BoardWrapper>
        {board &&
          board.map((row, y) => {
            return (
              <Row key={`row_${y}`}>
                {row.map((piece, x) => {
                  const [src] = selectedMoves.find(([, m]) => m.x === x && m.y === y) ?? [undefined]
                  return (
                    <Square
                      key={`square_${x}`}
                      piece={piece}
                      black={(y % 2 === 0 && x % 2 === 0) || (y % 2 !== 0 && x % 2 !== 0)}
                      showPlaceholder={src}
                      inCheck={(piece === "wk" && whiteInCheck) || (piece === "bk" && blackInCheck)}
                      selectable={(whiteTurn && piece.startsWith("w")) || (!whiteTurn && piece.startsWith("b")) || src}
                      handler={() => {
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
      <pre>{`${whiteInCheckmate}`}</pre>
    </div>
  )
}
export default Board

const BoardWrapper = styled.div`
  width: 80vw;
  height: 80vw;
  max-width: 80vmin;
  max-height: 80vmin;

  display: grid;
  grid-template-rows: repeat(8, 1fr);
  overflow: hidden;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  overflow: hidden;
`
