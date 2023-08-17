// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timeLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onDecrementTimeLimit = () => {
    const {timeLimitInMinutes} = this.state

    if (timeLimitInMinutes > 1) {
      this.setState(prevState => ({
        timeLimitInMinutes: prevState.timeLimitInMinutes - 1,
      }))
    }
  }

  onIncrementTimeLimit = () => {
    this.setState(prevState => ({
      timeLimitInMinutes: prevState.timeLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timeElapsedInSeconds, timeLimitInMinutes} = this.state
    const onDisableLimits = timeElapsedInSeconds > 0
    return (
      <div className="time-limit-controller-container">
        <p className="set-time-heading">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            type="button"
            disabled={onDisableLimits}
            className="limit-button"
            onClick={this.onDecrementTimeLimit}
          >
            -
          </button>
          <div className="timer-minutes-container">
            <p className="timer-minutes">{timeLimitInMinutes}</p>
          </div>
          <button
            type="button"
            className="limit-button"
            disabled={onDisableLimits}
            onClick={this.onIncrementTimeLimit}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeElapsedInSeconds, timeLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timeLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="timer-controller-container">
        <button
          onClick={this.onStartOrPauseTimer}
          type="button"
          className="controller-button"
        >
          <img
            src={startOrPauseImageUrl}
            alt={startOrPauseAltText}
            className="icon"
          />
          <p className="timer-controller-text">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          type="button"
          className="controller-button"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="icon"
          />
          <p className="timer-controller-text">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormate = () => {
    const {timeElapsedInSeconds, timeLimitInMinutes} = this.state
    const totalRemainingSeconds = timeLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const timerState = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="time-and-controls-container">
          <div className="time-bg-image-container">
            <div className="time-text-container">
              <h1 className="time">{this.getElapsedSecondsInTimeFormate()}</h1>
              <p className="timer-state">{timerState}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
