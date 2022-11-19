import React, { useEffect } from "react"
import { useDrag, useDrop } from "react-dnd"
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
  selectPiece,
  deselectPiece,
  movePiece,
  x,
  y,
}) => {
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: "piece",
      drop: (item) => {
        movePiece(item, { x, y })
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [x, y, movePiece]
  )

  const Wrapper = black ? BlackSquare : WhiteSquare
  const style = {
    boxShadow: showPlaceholder
      ? "inset 6px 6px 10px 0 rgba(0, 0, 0, 0.5), inset -6px -6px 10px 0 rgba(0, 0, 0, 0.5)"
      : "none",
  }
  if (inCheck) {
    style.backgroundColor = "red"
  } else if (isOver) {
    style.backgroundColor = "yellow"
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
      <Wrapper ref={dropRef} style={style} onClick={() => {}}>
        <PromotionSquare>
          <Rook viewBox="0 0 45 45" onClick={() => promotionHandler && promotionHandler("r")} />
          <Knight viewBox="0 0 45 45" onClick={() => promotionHandler && promotionHandler("n")} />
          <Bishop viewBox="0 0 45 45" onClick={() => promotionHandler && promotionHandler("b")} />
          <Queen viewBox="0 0 45 45" onClick={() => promotionHandler && promotionHandler("q")} />
        </PromotionSquare>
      </Wrapper>
    )
  }

  return (
    <Wrapper
      ref={dropRef}
      style={style}
      onClick={() => {
        if (selectable && promotionHandler) {
          promotionHandler()
        }
      }}
    >
      <Piece piece={piece} x={x} y={y} selectPiece={selectPiece} deselectPiece={deselectPiece} />
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

const Piece = ({ piece, x, y, selectPiece, deselectPiece }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "piece",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: { x, y },
  }))

  useEffect(() => {
    if (isDragging) {
      selectPiece({ x, y })
    } else {
      deselectPiece()
    }
  }, [isDragging, selectPiece, x, y])

  const PieceSVG = pieces[piece]
  return (
    <PieceWrapper
      ref={dragRef}
      style={{ backgroundColor: "transparent", opacity: isDragging && 0.5 }}
    >
      {PieceSVG && <PieceSVG viewBox="0 0 45 45" />}
    </PieceWrapper>
  )
}

const PieceWrapper = styled.div`
  flex: 1;
  display: flex;
  background: transparent;
  transform: translate(0, 0);
`
