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
import React, { useEffect } from 'react'
import BackToTop from 'components/market/BackToTopButton'
import FixedTopNavbar from 'components/market/FixedTopNavbar'
import LinkFooter from 'components/market/LinkFooter'
import UserProfile from 'components/market/UserProfile'
import { sampleUsers } from 'utils/dummyData'

const UserProfilePage = ({ tempProps }) => {
  // TODO: unify naming convention for data types
  const userInfo = {
    displayName: tempProps.displayName,
    alias: tempProps.username,
    followerCount: tempProps.followerCount,
    followingCount: tempProps.followingCount,
    avatarURL: tempProps.avatarURL,
    bannerURL: tempProps.bannerURL,
    social: tempProps.social,
  }
  const profileInfo = {
    bio: tempProps.bio,
    links: tempProps.links,
    joinDate: tempProps.joinDate,
  }

  useEffect(() => {
    console.log('todo: fetch the user works by ID after the page is served')
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Akkadia</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <BackToTop></BackToTop>
      <FixedTopNavbar></FixedTopNavbar>
      <main className={styles.userMain}>
        <UserProfile
          userInfo={userInfo}
          profileInfo={profileInfo}
          works={tempProps.works}
          owned={tempProps.owned}
        />
      </main>
      <LinkFooter></LinkFooter>
    </div>
  )
}

// todo: should this be statically generated with data getting served dynamically as a later request?
export const getServerSideProps = async (context) => {
  // placeholder logic with sample data
  const { username } = context.query
  const tempProps = {
    ...sampleUsers.find((user) => {
      return user.username === username
    }),
  }

  return {
    props: {
      tempProps: tempProps,
    },
  }
}

export default UserProfilePage
