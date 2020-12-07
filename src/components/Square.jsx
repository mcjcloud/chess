import React from "react"
import styled from "styled-components"

const Square = ({ black, piece = "  ", showPlaceholder = false, handler }) => {
  const Wrapper = black ? BlackSquare : WhiteSquare
  return (
    <Wrapper
      style={{ border: showPlaceholder ? "3px solid blue" : "none" }}
      onClick={() => {
        if (handler) {
          handler()
        }
      }}
    >
      <pre>{piece}</pre>
    </Wrapper>
  )
}
export default Square

const BlackSquare = styled.div`
  background-color: black;
  color: white;
  text-align: center;
`
const WhiteSquare = styled.div`
  background-color: white;
  color: black;
  text-align: center;
`
