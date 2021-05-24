import { Button, Typography } from '@material-ui/core'
import { useRefCallback } from 'effects/refCallbackEffects'
import { motion, useAnimation } from 'framer-motion'
import React from 'react'

const ComingSoonButton = ({ children, variant, size, color }) => {
  const comingSoonControl = useAnimation()
  const buttonTextControl = useAnimation()

  const [contentRect, setContentRect] = React.useState(null)
  const [overlayRect, setOverlayRect] = React.useState(null)

  // some large enough value to make the "Coming Soon" text render outside the button's render area.
  const overflowPosY = '10rem'

  const showComingSoon = () => {
    // note: using keyframes instead of "spring" type, because that seems to have a bug
    // where animations freeze if the event is triggered at specific times.
    comingSoonControl.start({
      y: [overflowPosY, '-0.5rem', '0rem'],
      transition: { duration: 0.3 },
    })
    buttonTextControl.start({ opacity: 0, transition: { duration: 0.1 } })
  }

  const showButtonText = () => {
    comingSoonControl.start({
      y: overflowPosY,
      transition: { duration: 0.2 },
    })
    buttonTextControl.start({ opacity: 1, transition: { duration: 0.1 } })
  }
  const contentRef = useRefCallback((node) => {
    setContentRect(node.getBoundingClientRect())
  })
  const overlayRef = useRefCallback((node) => {
    setOverlayRect(node.getBoundingClientRect())
  })

  let overlayTop = 0
  let overlayLeft = 0
  if (overlayRect && contentRect) {
    overlayTop = (contentRect.height - overlayRect.height) / 2
    overlayLeft = (contentRect.width - overlayRect.width) / 2
  }

  return (
    <Button
      onMouseEnter={showComingSoon}
      onMouseLeave={showButtonText}
      onClick={showComingSoon}
      onBlur={showButtonText}
      style={{ overflow: 'hidden' }}
      variant={variant}
      size={size}
      color={color}
    >
      <div style={{ position: 'relative' }}>
        <motion.div animate={buttonTextControl} ref={contentRef}>
          <Typography variant='inherit'>{children}</Typography>
        </motion.div>
        <div
          style={{
            position: 'absolute',
            top: overlayTop,
            left: overlayLeft,
            lineHeight: '1rem',
          }}
        >
          <motion.div
            initial={{ y: overflowPosY }}
            animate={comingSoonControl}
            ref={overlayRef}
          >
            <Typography variant='inherit' style={{ textJustify: 'center' }}>
              <b>COMING SOON</b>
            </Typography>
          </motion.div>
        </div>
      </div>
    </Button>
  )
}

export default ComingSoonButton
