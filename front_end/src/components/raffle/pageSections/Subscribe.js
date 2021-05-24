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
