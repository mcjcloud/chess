import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { useTimer } from "react-timer-hook"
import { notationForMove } from "../util/coordinate"

/*
 * should contain: move list, prev/next move, timer, resign, draw
 */

const ControlPanel = ({ board }) => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 600) // 10 minutes
  const {
    minutes: wMinutes,
    seconds: wSeconds,
    isRunning: wIsRunning,
    pause: wPause,
    resume: wResume,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => {
      wPause()
      bPause()
    },
  })
  const {
    minutes: bMinutes,
    seconds: bSeconds,
    isRunning: bIsRunning,
    pause: bPause,
    resume: bResume,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => {
      wPause()
      bPause()
    },
  })

  const [history, setHistory] = useState([])
  const [lastBoard, setLastBoard] = useState(board.board)
  const [anchor, setAnchor] = useState()
  
  // update history every time a move is made
  useEffect(() => {
    if (board.history.length === 0) {
      return
    }
    if (board.history.length === history.length) {
      return
    }

    const [src, dest] = board.history[board.history.length - 1]
    const piece = board.board[dest.y][dest.x]
    const takes = lastBoard[dest.y][dest.x] !== "  "
    const promotion = lastBoard[src.y][src.x].endsWith("p") && (dest.y === 7 || dest.y === 0)

    // skip updating the history if the promoted piece hasn't been chosen yet
    if (promotion && piece.endsWith("p")) {
      return
    }

    setHistory([...history, notationForMove(src, dest, piece, takes, promotion)])
    setLastBoard(board.board)

    if (anchor) {
      anchor.scrollIntoView()
    }
  }, [board.history, board.board])

  const toggleTimer = useCallback(() => {
    if (board.whiteInCheckmate || board.blackInCheckmate || board.history.length === 0) {
      bPause()
      wPause()
      return
    }

    if ((wMinutes === 0 && wSeconds === 0) || (bMinutes === 0 && bSeconds === 0)) {
      return
    }
    if (board.whiteTurn && !wIsRunning) {
      bPause()
      wResume()
    } else if (!board.whiteTurn && !bIsRunning) {
      wPause()
      bResume()
    }
  }, [
    board.whiteTurn,
    wIsRunning,
    bIsRunning,
    wPause,
    wResume,
    bPause,
    bResume,
    wMinutes,
    wSeconds,
    bMinutes,
    bSeconds,
  ])

  useEffect(() => {
    toggleTimer()
  }, [board.whiteTurn, toggleTimer])

  useEffect(() => {
    if (wIsRunning && bIsRunning) {
      wPause()
      bPause()
    }
  }, [wPause, bPause, wIsRunning, bIsRunning])

  return (
    <Wrapper>
      <TimerWrapper>
        <WhiteTimer>
          {wMinutes}:{wSeconds < 10 ? "0" : ""}{wSeconds}
        </WhiteTimer>
        <BlackTimer>
          {bMinutes}:{bSeconds < 10 ? "0" : ""}{bSeconds}
        </BlackTimer>
      </TimerWrapper>

      <MovesWrapper>
        {history.map((move, i) => (
          <>
            {i % 2 === 0 && (
              <Move key={`n${i}`}>
                {(i / 2) + 1}.
              </Move>
            )}
            <Move key={i}>
              {move}
            </Move>
          </>
        ))}
        <div ref={setAnchor}></div>
      </MovesWrapper>

      <ControlsWrapper></ControlsWrapper>
    </Wrapper>
  )
}
export default ControlPanel

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 400px;
  height: 70vmin;
  max-height: 1000px;
`

const TimerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Timer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16pt;
  width: 180px;
  height: 75px;
  text-align: center;
  border-radius: 25px;
  box-shadow: 16px 16px 24px 0 rgba(0, 0, 0, 0.2), -16px -16px 24px 0 rgba(255, 255, 255, 0.5);
`

const BlackTimer = styled(Timer)`
  background-color: #474954;
  color: #d6d6d6;
`

const WhiteTimer = styled(Timer)`
  background-color: #d6d6d6;
  color: #474954;
`

const MovesWrapper = styled.div`
  border-radius: 25px;
  box-shadow: 16px 16px 24px 0 rgba(0, 0, 0, 0.2), -16px -16px 24px 0 rgba(255, 255, 255, 0.5);
  flex: 1;
  margin: 24px 0;
  padding: 0 24px;

  display: grid;
  grid-template-columns: 1fr 4fr 4fr;
  grid-auto-rows: 50px;

  overflow: auto;
`

const Move = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ControlsWrapper = styled.div`
  border-radius: 25px;
  box-shadow: 16px 16px 24px 0 rgba(0, 0, 0, 0.2), -16px -16px 24px 0 rgba(255, 255, 255, 0.5);
  height: 75px;
`
