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
