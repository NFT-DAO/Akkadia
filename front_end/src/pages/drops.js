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

import Head from 'next/head'
import styles from 'styles/Home.module.css'
import React from 'react'
import RaffleTopNavbar from 'components/raffle/RaffleTopNavbar'
import RaffleFooter from 'components/raffle/RaffleFooter'
import {
  Avatar,
  Button,
  Container,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core'
import SubscribeSection from 'components/raffle/pageSections/Subscribe'
import { useSplashStyles } from 'styles/styles'

const DropsPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Akkadia</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <RaffleTopNavbar />
      <main className={styles.main}>
        <UpcomingDropsBanner />
        <UpcomingDropsSection />
        <SubscribeSection />
      </main>
      <RaffleFooter />
    </div>
  )
}

const UpcomingDropsBanner = () => {
  const splashClasses = useSplashStyles()

  return (
    <>
      <div
        style={{
          width: '100%',
          backgroundImage: 'url(banner_background.jpg)',
          backgroundSize: 'cover',
        }}
      >
        <Container
          style={{ maxWidth: '530px', padding: '6rem 0', textAlign: 'center' }}
        >
          <div style={{ marginBottom: '1.2rem' }}>
            <Typography className={splashClasses.header}>
              Upcoming Drops
            </Typography>
          </div>
          <Typography className={splashClasses.description}>
            Fresh art coming your way! Learn about a few of our featured artists
            that will be dropping new Cardano inspired art soon.
            <br />
          </Typography>
        </Container>
      </div>
    </>
  )
}

const UpcomingDropsSection = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          background: 'linear-gradient(180deg, #000000 30%, #081849 100%)',
        }}
      >
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6rem',
            alignItems: 'center',
            padding: '6rem 1rem',
          }}
        >
          <UpcomingDrop
            imageSrc='promo_3.png'
            title='Mary Shelley'
            author='muntface'
            authorLink='https://twitter.com/Munt_Face'
            authorIconSrc='author_icon_muntface.png'
            description='Mary Shelley celebrates the Cardano Mary hardfork, which ushered in a new paradigm in native token creation'
            dropDate={new Date(2021, 5, 3, 18)}
          />
          <UpcomingDrop
            imageSrc='promo_1.png'
            title='Ada Lovelace - The Enchantress of Numbers'
            author='newmindflow'
            authorLink='https://twitter.com/newmindflow'
            authorIconSrc='author_icon_newmindflow.png'
            description='Forget this world and all its troubles and if possible its multitudinous Charlatans—every thing in short but the Enchantress of Number. - Charles Babbage'
            dropDate={new Date(2021, 5, 10, 18)}
          />
        </Container>
      </div>
    </>
  )
}

const useResponsiveStyles = makeStyles((theme) => {
  return {
    rowToColumn: {
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    marginLeft: {
      marginLeft: '8rem',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
      },
    },
  }
})

const UpcomingDrop = ({
  imageSrc,
  title,
  author,
  authorLink,
  authorIconSrc,
  description,
  dropDate,
}) => {
  const responsive = useResponsiveStyles()

  return (
    <>
      <div className={responsive.rowToColumn} style={{ alignItems: 'center' }}>
        <img
          src={imageSrc}
          style={{
            maxHeight: '500px',
            height: '100%',
            maxWidth: '500px',
            width: '100%',
          }}
        />
        <div className={responsive.marginLeft} style={{ maxWidth: '450px' }}>
          <Typography variant='h1' color='primary'>
            {title}
          </Typography>
          <div>
            <Link
              href={authorLink}
              target='twitter'
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Avatar src={authorIconSrc} />
              <Typography
                variant='h2'
                style={{ marginLeft: '0.3rem', color: '#777' }}
              >{`@${author}`}</Typography>
            </Link>
            <Typography
              variant='h5'
              style={{ color: '#ccc', marginTop: '1rem' }}
            >
              {description}
            </Typography>
            <CountdownText dropTime={dropDate.getTime()} />
            <Button color='primary' size='large' variant='contained'>
              Get notified
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

const CountdownText = ({ dropTime }) => {
  const [currentTime, setCurrentTime] = React.useState(null)
  React.useEffect(() => {
    if (!currentTime) {
      setCurrentTime(Date.now())
      return
    }

    const onTimeout = () => {
      setCurrentTime(currentTime + 1000)
    }

    const newCountdown = setTimeout(onTimeout, 1000)

    return () => {
      clearInterval(newCountdown)
    }
  }, [currentTime, setCurrentTime])

  const timeRemaining = dropTime - currentTime

  return (
    <Typography variant='h2' style={{ color: '#ccc', margin: '1rem 0' }}>
      {`Dropping in: ${msToDHMSString(timeRemaining)}`}
    </Typography>
  )
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
  const dayString = `${days}`.padStart(2, '0')
  const hourString = `${hours}`.padStart(2, '0')
  const minuteString = `${minutes}`.padStart(2, '0')
  const secondString = `${seconds}`.padStart(2, '0')

  return `${dayString}d ${hourString}h ${minuteString}m ${secondString}s`
}

export default DropsPage
