import Head from 'next/head'
import styles from 'styles/Home.module.css'
import React from 'react'
import { Container } from '@material-ui/core'
import RaffleTopNavbar from 'components/raffle/RaffleTopNavbar'
import RaffleFooter from 'components/raffle/RaffleFooter'

const HelpPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Akkadia</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <RaffleTopNavbar></RaffleTopNavbar>
      <main className={styles.main}>
        <Container maxWidth='xl'>help page placeholder</Container>
      </main>
      <RaffleFooter />
    </div>
  )
}

export default HelpPage
