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

import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import window from 'global' // This fixes the window undefined eslint error due to ssr.

const useStyles = makeStyles(() => {
  return {
    toTopButton: {
      width: '100%',
      position: 'fixed',
      bottom: '0',
      left: '0',
    },
  }
})

// Bottom Left hand corner
export default function BackToTop() {
  // Constants
  const [isVisible, setIsVisible] = useState(false)
  const classes = useStyles()
  const pixelOffset = 100

  // Change visibility based off vertical pixel location.
  const toggleVisibility = () => {
    if (window.pageYOffset > pixelOffset) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set the top cordinate to 0 and make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // When scrolling toggle.
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div className={classes.toTopButton}>
      {isVisible && (
        <IconButton onClick={scrollToTop}>
          <ArrowUpwardIcon fontSize='large' />
        </IconButton>
      )}
    </div>
  )
}
