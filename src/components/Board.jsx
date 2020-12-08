import React, { useCallback, useState } from "react"
import styled from "styled-components"
import useBoard from "../hooks/use-board"
import Square from "./Square"

const Board = () => {
  const { availableMoves, board, movePiece } = useBoard()
  const [selectedMoves, setSelectedMoves] = useState([])

  const selectPiece = useCallback(
    (square) => {
      const moves = availableMoves(square)
      console.log({ moves })
      setSelectedMoves(moves)
    },
    [availableMoves]
  )

  return (
    <BoardWrapper>
      {board && board.map((row, y) => {
        return (
          <Row key={`row_${y}`}>
            {row.map((piece, x) => {
              const [src] = selectedMoves.find(([, m]) => m.x === x && m.y === y) ?? [undefined]
              return (
                <Square
                  key={`square_${x}`}
                  piece={piece}
                  black={(y % 2 === 0 && x % 2 !== 0) || (y % 2 !== 0 && x % 2 === 0)}
                  showPlaceholder={src}
                  handler={() => {
                    if (src) {
                      console.log("move piece: ", src, { x, y })
                      movePiece(src, { x, y })
                      setSelectedMoves([])
                    } else {
                      console.log("select piece: ", { x, y })
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
  )
}
export default Board

const BoardWrapper = styled.div`
  width: 80vw;
  height: 80vw;
  max-width: 600px;
  max-height: 600px;

  display: grid;
  grid-template-rows: repeat(8, 1fr);
  overflow: hidden;
  `
  
  const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  overflow: hidden;
`
