import React from "react"
import styled from "styled-components"
import pieces from "./pieces"

const Square = ({
  black,
  piece = "  ",
  showPlaceholder,
  selectable,
  promotionHandler,
  inCheck,
  promote,
}) => {
  const Wrapper = black ? BlackSquare : WhiteSquare
  const style = { boxShadow: showPlaceholder ? "inset 6px 6px 10px 0 rgba(0, 0, 0, 0.5), inset -6px -6px 10px 0 rgba(0, 0, 0, 0.5)" : "none" }
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
          <Rook viewBox="0 0 45 45" onClick={() => promotionHandler && promotionHandler("r")} />
          <Knight viewBox="0 0 45 45" onClick={() => promotionHandler && promotionHandler("n")} />
          <Bishop viewBox="0 0 45 45" onClick={() => promotionHandler && promotionHandler("b")} />
          <Queen viewBox="0 0 45 45" onClick={() => promotionHandler && promotionHandler("q")} />
        </PromotionSquare>
      </Wrapper>
    )
  }

  const Piece = pieces[piece]
  return (
    <Wrapper
      style={style}
      onClick={() => {
        if (selectable && promotionHandler) {
          promotionHandler()
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
  background-color: #474954;
  color: white;
`
const WhiteSquare = styled(SquareWrapper)`
  background-color: #d6d6d6;
  color: black;
`

const PromotionSquare = styled.div`
  flex: 1;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`
