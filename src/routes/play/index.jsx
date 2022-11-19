import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Board from "../../components/Board"
import ControlPanel from "../../components/ControlPanel"
import useBoard from "../../hooks/use-board"
import { GreedyPlayer } from "../../models/player"

const PlayRoute = () => {
  const board = useBoard()
  const [opponent] = useState(new GreedyPlayer("b"))
  // const [opponent] = useState(undefined)

  // detect if the opponent should make a move
  useEffect(() => {
    if (!opponent) {
      return
    }
    if (board.whiteInCheckmate || board.blackInCheckmate) {
      return
    }
    if ((board.whiteTurn && opponent !== "w") || (!board.whiteTurn && opponent === "w")) {
      return
    }
    ;(async () => {
      const [src, dest] = await opponent.selectMove(board.board, board.allAvailableMoves())
      board.movePiece(src, dest)
    })()
  }, [board.whiteTurn, board.whiteInCheckmate, board.blackInCheckmate])

  return (
    <Page>
      <Board board={board} />
      <ControlPanel board={board} />
    </Page>
  )
}
export default PlayRoute

const Page = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`
