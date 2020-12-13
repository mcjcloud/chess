import React from "react"
import styled from "styled-components"
import pieces from "./pieces"

const Square = ({
  black,
  piece = "  ",
  showPlaceholder,
  selectable,
  handler,
  inCheck,
  promote,
}) => {
  const Wrapper = black ? BlackSquare : WhiteSquare
  const style = { border: showPlaceholder ? "3px solid blue" : "none" }
  if (inCheck) {
    style.backgroundColor = "red"
  }
  if (selectable) {
    style.cursor = "pointer"
  }

  if (promote) {
    const Rook = pieces[piece.startsWith("b") ? "br" : "wr"]
    const Knight = pieces[piece.startsWith("b") ? "bn" : "wn"]
    const Bishop = pieces[piece.startsWith("b") ? "bb" : "wb"]
    const Queen = pieces[piece.startsWith("b") ? "bq" : "wq"]

    return (
      <Wrapper style={style} onClick={() => {}}>
        <PromotionSquare>
          <Rook viewBox="0 0 45 45" onClick={() => handler && handler("r")} />
          <Knight viewBox="0 0 45 45" onClick={() => handler && handler("n")} />
          <Bishop viewBox="0 0 45 45" onClick={() => handler && handler("b")} />
          <Queen viewBox="0 0 45 45" onClick={() => handler && handler("q")} />
        </PromotionSquare>
      </Wrapper>
    )
  }

  const Piece = pieces[piece]
  return (
    <Wrapper
      style={style}
      onClick={() => {
        if (selectable && handler) {
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
  background-color: #188fa7;
  color: white;
`
const WhiteSquare = styled(SquareWrapper)`
  background-color: #d0ceba;
  color: black;
`

const PromotionSquare = styled.div`
  flex: 1;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`
