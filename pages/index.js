import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'

export default function Home() {
  return (
    <div className={styles.container}>

      <Head>
        <title>Acadia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p className={styles.description}>
          NextJS App Is Working!
        </p>
      </main>

    </div>
  )
}
