import React from "react"
import styled from "styled-components"
import pieces from "./pieces"

const Square = ({ black, piece = "  ", showPlaceholder, handler }) => {
  const Wrapper = black ? BlackSquare : WhiteSquare
  const Piece = pieces[piece]

  return (
    <Wrapper
      style={{ border: showPlaceholder ? "3px solid blue" : "none" }}
      onClick={() => {
        if (handler) {
          handler()
        }
      }}
    >
      {Piece && <Piece viewBox="0 0 45 45" />}
    </Wrapper>
  )
}
export default Square

const SquareWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const BlackSquare = styled(SquareWrapper)`
  background-color: darkgray;
  color: white;
`
const WhiteSquare = styled(SquareWrapper)`
  background-color: gray;
  color: black;
`
