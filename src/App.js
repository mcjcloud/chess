import React from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import styled from "styled-components"
import PlayRoute from "./routes/play"

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <AppWrapper>
        <PlayRoute />
      </AppWrapper>
    </DndProvider>
  )
}
export default App

const AppWrapper = styled.div``
