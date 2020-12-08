import React from "react"
import styled from "styled-components"
import Board from "../../components/Board"

const PlayRoute = () => {
  return (
    <Page>
      <Board />
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
