import { Button, Container, Typography } from '@material-ui/core'
import React from 'react'
import { useSplashStyles } from 'styles/styles'

const SubscribeSection = () => {
  const splashClasses = useSplashStyles()

  return (
    <>
      <div
        style={{
          width: '100%',
          backgroundImage: 'url(subscribe_background.jpg)',
          backgroundSize: 'cover',
        }}
      >
        <Container
          style={{
            textAlign: 'center',
            padding: '3rem 1rem',
          }}
        >
          <Typography className={splashClasses.header}>
            Be the first to know
          </Typography>
          <Typography
            style={{
              marginTop: '0.5rem',
              marginBottom: '2rem',
              ...useSplashStyles.description,
            }}
          >
            Subscribe to our newsletter for upcoming drops, promotions, and new
            features
          </Typography>
          {/* TODO: should be a subscribe form where user inputs their email. Need an API */}
          <Button
            variant='contained'
            color='primary'
            size='large'
            href='https://nft-dao.typeform.com/to/JLsNFrE6'
          >
            Subscribe
          </Button>
        </Container>
      </div>
    </>
  )
}

export default SubscribeSection
