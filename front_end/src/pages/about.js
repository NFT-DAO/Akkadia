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

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Akkadia</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <RaffleTopNavbar />
      <main className={styles.main}>
        <AboutBanner />
        <AboutSection />
        <SubscribeSection />
      </main>
      <RaffleFooter />
    </div>
  )
}

const AboutBanner = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          height: '430px',
          backgroundImage: 'url(banner_background.jpg)',
          backgroundSize: 'cover',
        }}
      >
        test
      </div>
    </>
  )
}

const AboutSection = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          height: '1900px', // todo: dynamic and responsive layout
          background: 'linear-gradient(180deg, #000000 30%, #081849 100%)',
        }}
      >
        test
      </div>
    </>
  )
}

const SubscribeSection = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          height: '250px', // todo: dynamic and responsive layout
          backgroundImage: 'url(subscribe_background.jpg)',
          backgroundSize: 'cover',
        }}
      ></div>
    </>
  )
}

export default AboutPage
