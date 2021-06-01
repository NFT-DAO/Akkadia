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
import { Container } from '@material-ui/core'
import { useRouter } from 'next/router'
import NFTCardBrief from 'components/market/NFTCardBrief'
import BackToTop from 'components/market/BackToTopButton'
import FixedTopNavbar from 'components/market/FixedTopNavbar'
import LinkFooter from 'components/market/LinkFooter'
import { sampleCards, sampleUsers } from 'utils/dummyData'

const CardPage = ({ tempCardProps }) => {
  // todo: dynamically get card data?
  const router = useRouter()
  const { id } = router.query

  // TODO: this needs to be the detailed card view
  return (
    <div className={styles.container}>
      <Head>
        <title>Acadia</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <BackToTop></BackToTop>
      <FixedTopNavbar></FixedTopNavbar>
      <main className={styles.main}>
        <Container maxWidth='xl'>
          <NFTCardBrief {...tempCardProps} />
        </Container>
      </main>
      <LinkFooter></LinkFooter>
    </div>
  )
}

// todo: should this be statically generated with data getting served dynamically as a later request?
export const getServerSideProps = async (context) => {
  // placeholder logic with sample data
  const { id } = context.query

  const card = sampleCards.find((card) => {
    return card.id === id
  })

  const author = sampleUsers.find((user) => {
    return user.username === card.author
  })

  const tempCardProps = {
    ...card,
    author: {
      username: author.username,
      displayName: author.displayName,
      avatarURL: author.avatarURL,
    },
  }

  return {
    props: {
      tempCardProps: tempCardProps,
    },
  }
}

export default CardPage
