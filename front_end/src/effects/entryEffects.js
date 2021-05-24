/**
The MIT License (MIT)

Copyright (c) 2021 NFT-DAO Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

import { useAnimation } from 'framer-motion'
import React from 'react'

export const useEntryAnimation = (
  ref,
  initialState,
  animationState,
  threshold = 0.7
) => {
  const entryControl = useAnimation()

  useEntryCallback(
    ref,
    (entries) => {
      // note: in this context, we are only observing 1 entry
      if (entries[0].isIntersecting) {
        entryControl.start(animationState)
      }
    },
    threshold
  )

  const animationSettings = {
    initial: initialState,
    animate: entryControl,
    transition: { ease: 'easeOut', type: 'tween' },
  }

  return animationSettings
}

export const useEntryCallback = (ref, callback, threshold) => {
  React.useEffect(() => {
    const observedElement = ref.current
    if (!observedElement) {
      return
    }

    console.log(threshold)

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: threshold,
    }
    const observer = new IntersectionObserver(callback, options)

    observer.observe(observedElement)

    return () => {
      observer.unobserve(observedElement)
    }
  }, [ref, callback, threshold])
}
