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

import Head from 'next/head'
import styles from 'styles/Home.module.css'
import React from 'react'
import RaffleTopNavbar from 'components/raffle/RaffleTopNavbar'
import RaffleFooter from 'components/raffle/RaffleFooter'
import { motion } from 'framer-motion'
import {
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { useEntryAnimation } from 'effects/entryEffects'
import Carousel from 'react-material-ui-carousel'
import DepositInfo from 'components/DepositInfo'
import SubscribeSection from 'components/raffle/pageSections/Subscribe'
import { useSplashStyles } from 'styles/styles'

const useResponsiveStyles = makeStyles((theme) => {
  return {
    overlayTitle: {
      fontSize: '2rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
    },
    overlayDescription: {
      fontSize: '1.2rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.7rem',
      },
    },
    overlayContainer: {
      padding: '3rem 6rem',
      borderRadius: '3rem',
      gap: '1.5rem',
      [theme.breakpoints.down('sm')]: {
        padding: '1rem 2rem',
        borderRadius: '1rem',
        gap: '0.7rem',
      },
    },

    marginLeft: {
      marginLeft: '60px',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
      },
    },
    ticketButtons: {
      display: 'flex',
      gap: '1rem',
      maxWidth: '500px',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        gap: '0.5rem',
        maxWidth: '350px',
        width: '100%',
      },
    },
    animatedTicket: {
      display: 'block',
      maxWidth: '820px',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '350px',
      },
    },
    backgroundTickets: {
      display: 'block',
      height: '620px',
      [theme.breakpoints.down('sm')]: {
        height: '300px',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
      },
    },
  }
})

const TicketPage = () => {
  const [isDepositInfoOpen, setIsDepositInfoOpen] = React.useState(false)
  const openModal = () => {
    setIsDepositInfoOpen(true)
  }
  const closeModal = () => {
    setIsDepositInfoOpen(false)
  }
  // TODO: NFT-DAO needs to set these properly
  const depositAmount = 10
  const depositAddress = 'addr123todoneedstobesetproperly'

  return (
    <div className={styles.container}>
      <Head>
        <title>Akkadia</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <RaffleTopNavbar />
      <main className={styles.main}>
        <TicketSplash handleModalOpen={openModal} />
        <AkkadiaDescriptionSection />
        <FeaturedArtSection />
        <SubscribeSection />
        <DepositInfo
          open={isDepositInfoOpen}
          handleModalClose={closeModal}
          amount={depositAmount}
          addr={depositAddress}
        />
      </main>
      <RaffleFooter />
    </div>
  )
}

const TicketSplash = ({ handleModalOpen }) => {
  const responsive = useResponsiveStyles()

  const ref = React.useRef()
  const fgAnimationSettings = useEntryAnimation(
    ref,
    { y: '-8rem', opacity: 0 },
    { y: '0rem', opacity: 1, transition: { duration: 0.6 } }
  )
  const bgAnimationSettings = useEntryAnimation(
    ref,
    { y: '-1rem', opacity: 0 },
    { y: '2rem', opacity: 1, transition: { duration: 0.3 } }
  )

  return (
    <>
      <div
        style={{
          width: '100%',
          background: 'linear-gradient(180deg, #000000 62.5%, #081849 100%)',
          overflow: 'hidden',
        }}
        ref={ref}
      >
        <Container
          style={{
            maxWidth: '1600px',
            position: 'relative',
            paddingTop: '3rem',
            paddingBottom: '1rem',
            paddingLeft: '2rem',
            zIndex: 1,
          }}
        >
          <div style={{ position: 'inherit', color: 'white', zIndex: 1 }}>
            <div className={responsive.marginLeft}>
              <Typography variant='h2'>Introducing Akkadia tickets</Typography>
              <Typography variant='h2'>
                <i>Electrifying</i> NFT... with benefits
              </Typography>
            </div>

            <div style={{ position: 'relative' }}>
              <motion.div {...fgAnimationSettings}>
                <img
                  className={responsive.animatedTicket}
                  src='ticket_animated.webp'
                />
              </motion.div>
            </div>
            <div
              className={`${responsive.marginLeft} ${responsive.ticketButtons}`}
            >
              <Button
                variant='contained'
                color='primary'
                size='large'
                style={{ flex: '1 1 100px' }}
                onClick={handleModalOpen}
              >
                Buy now
              </Button>
              <Button
                variant='outlined'
                size='large'
                style={{
                  flex: '1 1 100px',
                  border: '1px solid white',
                  color: 'white',
                }}
                href='/tickets'
              >
                Learn more
              </Button>
            </div>
            <div
              className={responsive.marginLeft}
              style={{ marginTop: '1rem' }}
            >
              <Typography variant='h4' color='primary'>
                {/* TODO: this needs to be pulled from the DB */}
                123 tickets remaining at 10ADA each
              </Typography>
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              right: '2rem',
              bottom: 0,
              zIndex: 0,
            }}
          >
            <motion.div {...bgAnimationSettings}>
              <img
                className={responsive.backgroundTickets}
                src='tickets_falling.png'
              />
            </motion.div>
          </div>
        </Container>
      </div>
    </>
  )
}

const AkkadiaDescriptionSection = () => {
  const splashClasses = useSplashStyles()

  return (
    <>
      <div
        style={{
          width: '100%',
          backgroundImage: 'url(akkadia_description_background.jpg)',
          backgroundSize: 'cover',
        }}
      >
        <Container
          style={{
            maxWidth: '600px',
            padding: '6rem 1rem',
            textAlign: 'center',
          }}
        >
          <div style={{ marginBottom: '1.2rem' }}>
            <Typography className={splashClasses.header}>
              Welcome to Akkadia
              <br />
              Collectable NFTs for a new epoch
            </Typography>
          </div>
          <Typography className={splashClasses.description}>
            Akkadia is a community driven, eco-friendly art marketplace
            developed for the Cardano community. It&apos;s a prototype of the
            marketplaces others can build upon the BOXCAR Framework. The art is
            next level.
          </Typography>
        </Container>
      </div>
    </>
  )
}

const PromoImage = ({ imageURI, title, author }) => {
  const bgBlurRadius = 20

  const BGBlurredImage = () => {
    return (
      <img
        src={imageURI}
        style={{
          position: 'absolute',
          left: `-${bgBlurRadius}px`,
          top: `-${bgBlurRadius}px`,
          height: `calc(80vh + ${2 * bgBlurRadius}px)`,
          width: `calc(100% + ${2 * bgBlurRadius}px)`,
          objectFit: 'cover',
          objectPosition: 'center',
          minWidth: 0,
          minHeight: 0,
          zIndex: 0,
          filter: `blur(${bgBlurRadius / 2}px)`,
        }}
      />
    )
  }

  const DetailOverlay = () => {
    const responsive = useResponsiveStyles()

    return (
      <div
        style={{
          position: 'relative',
          top: '-50%',
          transform: 'translateY(-50%)',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <div
          className={responsive.overlayContainer}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(10, 23, 67, 0.8)',
          }}
        >
          <Typography
            className={responsive.overlayTitle}
            style={{ color: 'white' }}
          >
            {author} - {title}
          </Typography>
          <Typography
            className={responsive.overlayDescription}
            style={{ color: 'white' }}
          >
            {/* TODO: what is this? */}
            Learn about the journey
          </Typography>
        </div>
      </div>
    )
  }

  return (
    <Paper
      style={{
        position: 'relative',
        height: '80vh',
        maxHeight: '800px',
      }}
    >
      <img
        src={imageURI}
        style={{
          position: 'inherit',
          height: '80vh',
          width: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
          minWidth: 0,
          minHeight: 0,
          maxHeight: '800px',
          zIndex: 1,
        }}
      />
      <BGBlurredImage />
      <DetailOverlay />
    </Paper>
  )
}

const FeaturedArtSection = () => {
  return (
    <div style={{ width: '100%' }}>
      <Carousel
        indicatorContainerProps={{
          style: {
            position: 'absolute',
            bottom: '50px',
            top: 'unset',
            zIndex: 9000,
          },
        }}
        indicatorIconButtonProps={{
          style: { padding: '0 1rem', width: '2rem', height: '2rem' },
        }}
        navButtonsProps={{
          style: { zIndex: 9000 },
        }}
      >
        <PromoImage
          imageURI='/promo_4.png'
          author='New Mindflow'
          title='Cardano in Hypocycloids'
        />
        <PromoImage
          imageURI='/promo_1.png'
          author='New Mindflow'
          title='Ada Lovelace - The Enchantress of Numbers'
        />
        <PromoImage
          imageURI='/promo_2.png'
          author='New Mindflow'
          title='Iele - The Fiery Dance'
        />
        <PromoImage
          imageURI='/promo_3.png'
          author='Andrew Shaw'
          title='Mary Shelley'
        />
      </Carousel>
    </div>
  )
}

export default TicketPage
