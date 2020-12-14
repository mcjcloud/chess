import React, { useCallback, useEffect } from "react"
import styled from "styled-components"
import { useTimer } from "react-timer-hook"

/*
 * should contain: move list, prev/next move, timer, resign, draw
 */

const ControlPanel = ({ history = [], play, whiteTurn }) => {
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

  const toggleTimer = useCallback(() => {
    if ((wMinutes === 0 && wSeconds === 0) || (bMinutes === 0 && bSeconds === 0)) {
      return
    }
    if (whiteTurn && !wIsRunning) {
      bPause()
      wResume()
    } else if (!whiteTurn && !bIsRunning) {
      wPause()
      bResume()
    }
  }, [
    whiteTurn,
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
  }, [whiteTurn, toggleTimer])

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
        {history.map(([src, dest], i) => (
          <div key={i}>
            {JSON.stringify(src)} {JSON.stringify(dest)}
          </div>
        ))}
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
`

const ControlsWrapper = styled.div`
  border-radius: 25px;
  box-shadow: 16px 16px 24px 0 rgba(0, 0, 0, 0.2), -16px -16px 24px 0 rgba(255, 255, 255, 0.5);
  height: 75px;
`
