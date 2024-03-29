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
import SubscribeSection from 'components/raffle/pageSections/Subscribe'
import { Container, Typography } from '@material-ui/core'
import { useSplashStyles } from 'styles/styles'

const FAQPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Akkadia</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <RaffleTopNavbar />
      <main className={styles.main}>
        <FAQBanner />
        <FAQSection />
        <SubscribeSection />
      </main>
      <RaffleFooter />
    </div>
  )
}

const FAQBanner = () => {
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
              Frequently Asked Questions
            </Typography>
          </div>
          <Typography className={splashClasses.description}>
            You have questions and we have answers. If you can&apos;t find what
            you&apos;re looking for down below, reach out directly to
            hello@nft-dao.org
          </Typography>
        </Container>
      </div>
    </>
  )
}

const FAQSection = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          background: 'linear-gradient(180deg, #000000 30%, #081849 100%)',
        }}
      >
        <Container style={{ padding: '4rem 2rem' }}>
          <FAQEntry
            question='What is Akkadia?'
            answer='Akkadia is an NFT marketplace created by NFT-DAO. We are artists, technologists, and NFT enthusiasts.'
          />
          <FAQEntry
            question='What are Akkadia tickets?'
            answer='Akkadia tickets are NFTs that provide membership to Akkadia. They are grouped by rarity ranging from common to ultra-rare. All tickets give you a shot at receiving recurring Akkadia NFT airdrops. The higher the rarity the better the chances.'
          />
          <FAQEntry
            question='How long will Akkadia exist?'
            answer='We plan for Akkadia to exist indefinitely, and as long as NFT-DAO exists so will Akkadia.'
          />
          <FAQEntry
            question='How many NFTs will be distributed each drop to ticket holders?'
            answer='We will mint and distribute up to 500 tickets per month to Akkadia ticket holders. Any tickets remaining after ticket distribution metrics will remain in the NFT-DAO treasury.'
          />
          <FAQEntry
            question='Who creates the NFTs that are airdropped?'
            answer='The NFTs are created by the Akkadia artist community. As the community grows, so do the diversity of NFTs dropped.'
          />
        </Container>
      </div>
    </>
  )
}

const FAQEntry = ({ question, answer }) => {
  return (
    <>
      <div style={{ margin: '1.5rem 0' }}>
        <Typography variant='h2' color='primary' style={{ fontSize: '2rem' }}>
          {question}
        </Typography>
        <Typography variant='h5' style={{ color: '#ccc' }}>
          {answer}
        </Typography>
      </div>
    </>
  )
}

export default FAQPage
