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
import BackToTop from 'components/market/BackToTopButton'
import FixedTopNavbar from 'components/market/FixedTopNavbar'
import LinkFooter from 'components/market/LinkFooter'
import CardGrid from 'components/market/CardGrid'
import { Container } from '@material-ui/core'
import LiveAuctionHeader from 'components/market/LiveAuctionHeader'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Akkadia</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <BackToTop></BackToTop>
      <FixedTopNavbar></FixedTopNavbar>
      <main className={styles.main}>
        {/* todo: featured artwork */}
        <Container maxWidth='xl'>
          <LiveAuctionHeader />
          <CardGrid />
        </Container>
      </main>
      <LinkFooter></LinkFooter>
    </div>
  )
}
