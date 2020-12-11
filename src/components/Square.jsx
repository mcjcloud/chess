import React from "react"
import styled from "styled-components"
import pieces from "./pieces"

const Square = ({ black, piece = "  ", showPlaceholder, selectable, handler, inCheck }) => {
  const Wrapper = black ? BlackSquare : WhiteSquare
  const Piece = pieces[piece]

  const style = { border: showPlaceholder ? "3px solid blue" : "none" }
  if (inCheck) {
    style.backgroundColor = "red"
  }
  if (selectable) {
    style.cursor = "pointer"
  }

  return (
    <Wrapper
      style={style}
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
  background-color: #188FA7;
  color: white;
`
const WhiteSquare = styled(SquareWrapper)`
  background-color: #d0ceba;
  color: black;
`
