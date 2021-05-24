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
import { Button, Container, makeStyles, Typography } from '@material-ui/core'
import { motion } from 'framer-motion'
import { useEntryAnimation } from 'effects/entryEffects'
import DepositInfo from 'components/DepositInfo'
import { useSplashStyles } from 'styles/styles'

const TicketDetailPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Akkadia</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <RaffleTopNavbar />
      <main className={styles.main}>
        <BuyNowBanner />
        <TicketSplash />
        <HowItWorksSection />
        <TicketTiersSection />
        <BuyTicketSection />
      </main>
      <RaffleFooter />
    </div>
  )
}

const BuyNowBanner = () => {
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
          style={{
            maxWidth: '600px',
            padding: '6rem 1rem',
            textAlign: 'center',
          }}
        >
          <div style={{ marginBottom: '1.2rem' }}>
            <Typography className={splashClasses.header}>
              Akkadia tickets.
              <br />
              The super collectable, lucky dip NFT
              <br />
              Just remember... always buy the dip!
            </Typography>
          </div>
          <Typography className={splashClasses.description}>
            Tickets, tickets, tickets! Come get your tickets. Akkadia tickets
            are inspired by the Cardano roadmap and are super charged with
            recurring NFT benefits!
            <br />
          </Typography>
          <Typography style={{ fontSize: '3rem' }}>👇</Typography>
        </Container>
      </div>
    </>
  )
}

const TicketSplash = () => {
  const ref = React.useRef()
  const ticketAnimationSettings = useEntryAnimation(
    ref,
    { y: '-8rem', opacity: 0 },
    { y: '0rem', opacity: 1, transition: { duration: 0.5 } },
    0.2
  )

  return (
    <>
      <div
        style={{
          width: '100%',
          background: 'linear-gradient(180deg, #000000 62.5%, #081849 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <motion.div {...ticketAnimationSettings} ref={ref}>
          <img
            src='tickets_diagonal.png'
            style={{
              minWidth: '500px',
              maxWidth: '1800px',
              width: '105%',
              position: 'relative',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </motion.div>
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
      marginLeft: '4rem',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
      },
    },
  }
})

const HowItWorksSection = () => {
  const responsiveClasses = useResponsiveStyles()
  const splashClasses = useSplashStyles()

  const imageContainerStyle = {
    flex: '1 1 auto',
  }

  const imageGapStyle = {
    flex: '1 1 50px',
  }

  const imageStyle = {
    width: '100%',
    maxWidth: '350px',
    minWidth: 0,
    minHeight: 0,
    marginBottom: '1rem',
  }

  return (
    <>
      <div
        style={{
          width: '100%',
          backgroundImage: 'url(tickets_how_background.jpg)',
          backgroundSize: 'cover',
          textAlign: 'center',
          padding: '4rem 0',
          overflow: 'hidden',
        }}
      >
        <Typography className={splashClasses.header}>
          Airdrops in perpetuity! Here&apos;s how it works:
        </Typography>

        <Container>
          <div
            className={responsiveClasses.rowToColumn}
            style={{
              justifyContent: 'center',
              marginTop: '6rem',
              width: '100%',
            }}
          >
            <div style={imageContainerStyle}>
              <img src='how_step_1.png' style={imageStyle} />
              <Typography className={splashClasses.description}>
                Buy a ticket!
              </Typography>
            </div>
            <div style={imageGapStyle} />
            <div style={imageContainerStyle}>
              <img src='how_step_2.png' style={imageStyle} />
              <Typography className={splashClasses.description}>
                Keep it safe!
              </Typography>
            </div>
            <div style={imageGapStyle} />
            <div style={imageContainerStyle}>
              <img src='how_step_3.png' style={imageStyle} />
              <Typography className={splashClasses.description}>
                Reap the rewards!
              </Typography>
            </div>
          </div>
        </Container>

        <Container
          style={{ maxWidth: '600px', marginTop: '4rem', marginBottom: '4rem' }}
        >
          <div>
            <Typography
              style={{ marginBottom: '0.7rem', ...useSplashStyles.description }}
            >
              <b> Only 10,000 tickets will ever be minted.</b>
            </Typography>
            <Typography className={splashClasses.description}>
              <b>Get in quick because:</b>
              <br />
              The first 1,000 tickets sold are only 10 ADA.
              <br />
              The next 1,000 tickets will be 20 ADA, followed by 30 ADA for the
              next batch of 1,000. The pattern will repeat culminating in the
              final 1,000 tickets being sold for 100 ADA each.
            </Typography>
          </div>
        </Container>
        <Typography className={splashClasses.header}>
          Membership gives you the following perks
        </Typography>
        <Container style={{ maxWidth: '600px' }}>
          <Typography
            style={{ marginTop: '1rem', ...useSplashStyles.description }}
          >
            We will be dropping up to 500 NFTs per month that will be
            distributed among Akkadia ticket holders. The rarer the ticket, the
            more likely it is to receive an NFT. Full breakdown is as follows:
          </Typography>
        </Container>
      </div>
    </>
  )
}

const TicketTiersSection = () => {
  // TODO: numDrawn need to be pulled from some API

  return (
    <>
      <div
        style={{
          width: '100%',
          background: 'linear-gradient(180deg, #000000 62.5%, #081849 100%)',
        }}
      >
        <Container style={{ padding: '6rem 0', overflow: 'hidden' }}>
          <TicketTier
            imageSrc='ticket_1_cardano.png'
            name='Cardano'
            quantity={1}
            rarity='Ultra Rare'
            numDrawn={1}
            dropChance={100}
          />
          <TicketTier
            imageSrc='ticket_2_voltaire.png'
            name='Voltaire'
            quantity={10}
            rarity='Super Rare'
            numDrawn={9}
            dropChance={90}
          />
          <TicketTier
            imageSrc='ticket_3_basho.png'
            name='Basho'
            quantity={100}
            rarity='Very Rare'
            numDrawn={25}
            dropChance={25}
          />
          <TicketTier
            imageSrc='ticket_4_goguen.png'
            name='Goguen'
            quantity={1000}
            rarity='Rare'
            numDrawn={100}
            dropChance={10}
          />
          <TicketTier
            imageSrc='ticket_5_shelley.png'
            name='Shelley'
            quantity={3000}
            rarity='Uncommon'
            numDrawn={150}
            dropChance={5}
          />
          <TicketTier
            imageSrc='ticket_6_byron.png'
            name='Byron'
            quantity={5889}
            rarity='Common'
            numDrawn={177}
            dropChance={3}
          />
        </Container>
      </div>
    </>
  )
}

const TicketTier = ({
  imageSrc,
  name,
  quantity,
  rarity,
  numDrawn,
  dropChance,
}) => {
  const responsive = useResponsiveStyles()
  const splashClasses = useSplashStyles()

  const ref = React.useRef()
  const animationSettings = useEntryAnimation(
    ref,
    { y: '-8rem', opacity: 0 },
    { y: '0rem', opacity: 1, transition: { duration: 0.3 } },
    0.5
  )

  return (
    <motion.div ref={ref} {...animationSettings} style={{ color: 'white' }}>
      <div
        className={responsive.rowToColumn}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <img
          src={imageSrc}
          style={{
            maxHeight: '250px',
            maxWidth: '500px',
            width: '100%',
            objectFit: 'contain',
          }}
        />
        <div className={responsive.marginLeft}>
          <div style={{ marginLeft: '0.5rem' }}>
            <Typography variant='h2' component='body1'>
              {name}
            </Typography>
            <Typography variant='h4' component='body1'>
              {` x ${quantity}`}
            </Typography>
          </div>
          <div>
            <ul>
              <li className={splashClasses.description}>
                <Typography className={splashClasses.description}>
                  {rarity}
                </Typography>
              </li>
              <li className={splashClasses.description}>
                <Typography
                  className={splashClasses.description}
                >{`${numDrawn} out of ${quantity} drawn`}</Typography>
              </li>
              <li className={splashClasses.description}>
                <Typography
                  className={splashClasses.description}
                >{`${dropChance.toFixed(
                  0
                )}% receive an NFT each airdrop`}</Typography>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const BuyTicketSection = () => {
  const splashClasses = useSplashStyles()

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
    <>
      <div
        style={{
          width: '100%',
          backgroundImage: 'url(tickets_how_background.jpg)',
          backgroundSize: 'cover',
          backgroundPositionY: 'center',
          padding: '3rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography className={splashClasses.header}>
          Stay tuned and watch the benefits grow
        </Typography>
        <Typography
          style={{
            marginTop: '0.5rem',
            marginBottom: '1rem',
            ...useSplashStyles.description,
          }}
        >
          Buy your membership ticket now
        </Typography>
        <Button
          variant='contained'
          color='primary'
          size='large'
          onClick={openModal}
          style={{ margin: '1rem 0' }}
        >
          Purchase now
        </Button>
        <Typography variant='h4' color='primary'>
          {/* TODO: this needs to be pulled from the DB */}
          123 tickets remaining at 10ADA each
        </Typography>
      </div>
      <DepositInfo
        open={isDepositInfoOpen}
        handleModalClose={closeModal}
        amount={depositAmount}
        addr={depositAddress}
      />
    </>
  )
}

export default TicketDetailPage
