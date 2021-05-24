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

import {
  Button,
  Container,
  IconButton,
  makeStyles,
  ThemeProvider,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { darkTheme } from 'styles/theme'

const useStyles = makeStyles(() => {
  return {
    text: {
      color: '#3F4C79',
      textTransform: 'none',
      padding: '0.2rem 1rem',
    },
  }
})

const useResponsiveStyles = makeStyles((theme) => {
  return {
    rowToColumn: {
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    gap: {
      gap: (props) => {
        return props.gapMain
      },
      [theme.breakpoints.down('sm')]: {
        gap: (props) => {
          return props.gapResponsive
        },
      },
    },
    alignEnd: {
      alignItems: 'flex-end',
      [theme.breakpoints.down('sm')]: {
        alignItems: 'center',
      },
    },
  }
})

export default function RaffleFooter() {
  const classes = useStyles()
  const responsive = useResponsiveStyles()

  return (
    <ThemeProvider theme={darkTheme}>
      <footer
        style={{
          width: '100%',
          backgroundColor: '#0A1743',
          paddingBottom: '1rem',
          color: 'white',
        }}
      >
        <Container
          style={{
            padding: '3rem 3rem',
            maxWidth: '1600px',
          }}
        >
          <div
            className={responsive.rowToColumn}
            style={{ justifyContent: 'space-between' }}
          >
            <Partnerships />
            <div>
              <div
                className={responsive.alignEnd}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Button size='large' className={classes.text} href='about'>
                  About Us
                </Button>
                <Button size='large' className={classes.text} href='help'>
                  Get Help
                </Button>
                <Button
                  size='large'
                  className={classes.text}
                  href='artist-application'
                >
                  Artist Application
                </Button>
              </div>
              <SocialButtons />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button className={classes.text}>Terms of Service</Button>
            <Button className={classes.text}>Privacy Policy</Button>
          </div>
        </Container>
        <CardanoTrademark />
      </footer>
    </ThemeProvider>
  )
}

const Partnerships = () => {
  const responsive = useResponsiveStyles({
    gapMain: '4rem',
    gapResponsive: '1rem',
  })

  const imageStyle = {
    flex: '1 1 auto',
    width: '100%',
    maxWidth: '150px',
    minWidth: 0,
    minHeight: 0,
  }

  return (
    <div
      className={responsive.gap}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Button
        href='https://www.nft-dao.org/'
        target='nftdao'
        style={imageStyle}
      >
        <img src='nftdao_logo.png' style={imageStyle} />
      </Button>
      <Button href='https://cardano.org/' target='cardano' style={imageStyle}>
        <div
          style={{
            display: 'flex',
            position: 'relative',
            ...imageStyle,
          }}
        >
          <img src='/cardano_logo.png' style={imageStyle} />
          <Typography
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              fontWeight: 'bold',
              fontSize: '0.8rem',
            }}
          >
            TM
          </Typography>
        </div>
      </Button>
    </div>
  )
}

const SocialButtons = () => {
  const imageStyle = {
    flex: '1 1 auto',
    width: '100%',
    maxWidth: '350px',
    minWidth: 0,
    minHeight: 0,
  }

  return (
    <div
      style={{ display: 'flex', gap: '1rem', marginTop: '1rem', width: '100%' }}
    >
      <IconButton
        target='twitter'
        href='https://twitter.com/nft_dao'
        style={imageStyle}
      >
        <img src='footer_twitter_icon.png' style={{ height: '50px' }} />
      </IconButton>
      <IconButton style={imageStyle}>
        <img src='footer_telegram_icon.png' style={{ height: '50px' }} />
      </IconButton>
      <IconButton style={imageStyle}>
        <img src='footer_instagram_icon.png' style={{ height: '50px' }} />
      </IconButton>
      <IconButton style={imageStyle}>
        <img src='footer_discord_icon.png' style={{ height: '40px' }} />
      </IconButton>
    </div>
  )
}

const CardanoTrademark = () => {
  const classes = useStyles()

  return (
    <Container maxWidth='md' style={{ marginTop: '2rem' }}>
      <Typography className={classes.text}>
        Cardano™ and the Cardano Logo™ are trademarks of Cardano Foundation,
        CHE-184.477.354, Dammstrasse 16, 6300 Zug, Switzerland, in Switzerland
        and other countries
      </Typography>
    </Container>
  )
}
