/**
 Copyright 2021 NFT-DAO LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  endingSoon: {
    color: 'rgb(255,100,100)',
    opacity: 1,
    transition: 'opacity 0.2s',
  },
  blinkOff: {
    opacity: 0,
  },
})

// in milliseconds
const endingSoonTime = 10000

export default function CountdownTimer({ initialRemainingTime }) {
  const [time, setTime] = React.useState(initialRemainingTime)
  const [blinkState, setBlinkState] = React.useState()

  const classes = useStyles()
  const endingSoon = time < endingSoonTime ? classes.endingSoon : null

  useCountdown(initialRemainingTime, setTime, setBlinkState, classes)

  return (
    <Typography className={`${endingSoon} ${blinkState}`}>
      {time <= 0 ? 'Auction Over' : msToDHMSString(time)}
    </Typography>
  )
}

const useCountdown = (
  initialRemainingTime,
  setTime,
  setBlinkState,
  classes
) => {
  React.useEffect(() => {
    // any time we get updated time data, we need to start a new countdown
    const onInterval = (remainingTime) => {
      setTime(remainingTime)

      if (remainingTime < endingSoonTime) {
        setBlinkState(classes.blinkOff)
        setTimeout(() => {
          setBlinkState()
        }, 200)
      }
    }

    const newCountdown = createCountdown(initialRemainingTime, onInterval)

    // as well as handle cleaning up the old interval handler
    const cleanup = () => {
      clearInterval(newCountdown)
    }

    return cleanup
  }, [initialRemainingTime, setTime, setBlinkState, classes])
}

/**
 * NOTE: this might be something that we want to pull up/out when we get to card grids, because
 * then each card will be managing its own countdown. That'll be a lot of layout thrashing, but
 * worse, it'll probably have a bunch of visual noise when each card is slightly out of sync with
 * each other.
 *
 * Can deal with that later.
 */
const createCountdown = (initialRemainingTime, callback) => {
  const countdownStart = Date.now()

  // this can be tweaked to be shorter if we're finding that the timers are "skipping"
  const delay = 1000

  const intervalID = setInterval(() => {
    // calculate elapsed time over intervals, as setInterval is not a guaranteed
    // interval timer, and can drift over time. i.e. long tasks/microtasks can
    // block the next interval from being called on time
    const elapsedTime = Date.now() - countdownStart

    // consumer can update their state or whatever with this value
    let remainingTime = initialRemainingTime - elapsedTime
    if (remainingTime <= 0) {
      remainingTime = 0
      clearInterval(intervalID)
    }

    callback(remainingTime)
  }, delay)

  return intervalID
}

const msToDHMSString = (milliseconds) => {
  const msInSecond = 1000
  const msInMinute = msInSecond * 60
  const msInHour = msInMinute * 60
  const msInDay = msInHour * 24

  // chop up ms into time units
  const days = Math.floor(milliseconds / msInDay)
  milliseconds -= days * msInDay

  const hours = Math.floor(milliseconds / msInHour)
  milliseconds -= hours * msInHour

  const minutes = Math.floor(milliseconds / msInMinute)
  milliseconds -= minutes * msInMinute

  const seconds = Math.floor(milliseconds / msInSecond)

  // convert to padded strings
  const dayString = `${days}`.padStart(3, '0')
  const hourString = `${hours}`.padStart(2, '0')
  const minuteString = `${minutes}`.padStart(2, '0')
  const secondString = `${seconds}`.padStart(2, '0')

  return `${dayString}:${hourString}:${minuteString}:${secondString}`
}
