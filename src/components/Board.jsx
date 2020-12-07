import React, { useCallback, useState } from "react"
import styled from "styled-components"
import useBoard from "../hooks/useBoard"
import Square from "./Square"

const Board = () => {
  const { availableMoves, board } = useBoard()
  const [selectedMoves, setSelectedMoves] = useState([])

  const selectPiece = useCallback(
    (square) => {
      const moves = availableMoves(square)
      setSelectedMoves(moves)
    },
    [availableMoves]
  )

  return (
    <BoardWrapper>
      {board && board.map((row, x) => {
        return (
          <Row key={`row_${x}`}>
            {row.map((piece, y) => {
              return (
                <Square
                  key={`square_${y}`}
                  piece={piece}
                  black={(x % 2 === 0 && y % 2 !== 0) || (x % 2 !== 0 && y % 2 === 0)}
                  showPlaceholder={selectedMoves.includes({ x, y })}
                  handler={() => {
                    console.log("clicked: ", { x, y })
                    selectPiece({ x, y })
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
`

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`
