import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import NFTCardBrief from '../components/NFTCardBrief'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Acadia</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <NFTCardBrief title='samurai' creator={{ name: 'flaptraps' }} />
      </main>
    </div>
  )
}
