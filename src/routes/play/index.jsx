import React from "react"
import styled from "styled-components"
import Board from "../../components/Board"
import ControlPanel from "../../components/ControlPanel"
import useBoard from "../../hooks/use-board"

const PlayRoute = () => {

  const board = useBoard()
  return (
    <Page>
      <Board board={board} />
      <ControlPanel history={board.history} whiteTurn={board.whiteTurn} />
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
