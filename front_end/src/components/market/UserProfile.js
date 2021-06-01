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

import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'
import React from 'react'
import CardGrid from './CardGrid'
import Twitter from '@material-ui/icons/Twitter'
import Instagram from '@material-ui/icons/Instagram'
import { sampleCards, sampleUsers } from 'utils/dummyData'

const useStyles = makeStyles((theme) => {
  const fullBannerHeight = '14rem'
  const smallBannerHeight = '10rem'

  return {
    banner: {
      position: 'relative',
      height: fullBannerHeight,
      [theme.breakpoints.down('xs')]: {
        height: smallBannerHeight,
      },
      // overlay gradient on the banner image inside
      '&:after': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(to bottom, white, transparent 50%)',
      },
    },
    bannerImage: {
      position: 'relative',
      height: fullBannerHeight,
      width: '100%',
      objectPosition: '50% 30%',
      objectFit: 'cover',
      [theme.breakpoints.down('xs')]: {
        height: smallBannerHeight,
      },
    },
    avatarBar: {
      height: '4rem',
      width: '100%',
      position: 'relative',
      marginBottom: '1rem',
    },
    avatar: {
      width: '9rem',
      height: '9rem',
      position: 'absolute',
      bottom: 0,
      left: '1rem',
      borderRadius: '2rem',
      borderWidth: '0.5rem',
      borderColor: 'white',
      borderStyle: 'solid',
    },
    container: {
      padding: '0 3rem',
    },
    profileColumn: {
      flexBasis: '20rem',
      flexGrow: 0,
      flexShrink: 0,
    },
    cardColumn: {
      flexBasis: '30rem',
      flexGrow: 1,
      flexShrink: 1,
    },
    alias: {
      backgroundImage:
        'linear-gradient(110.78deg, rgb(118, 230, 80) -1.13%, rgb(249, 214, 73) 15.22%, rgb(240, 142, 53) 32.09%, rgb(236, 81, 87) 48.96%, rgb(255, 24, 189) 67.94%, rgb(26, 75, 255) 85.34%, rgb(98, 216, 249) 99.57%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      marginBottom: '2rem',
    },
    divider: {
      margin: '0.7rem 0',
    },
    profileInfo: {
      marginTop: '3rem',
    },
    shadowed: {
      boxShadow: 'rgba(0,  0, 0, 10%) 0px 5px 10px',
    },
    chip: {
      marginTop: '1rem',
      fontWeight: 'bold',
    },
    boldLight: {
      fontWeight: 500,
    },
  }
})

const defaultProps = {
  userInfo: {
    displayName: 'Nicolas Bouvier',
    alias: 'sparth',
    followerCount: 3000,
    followingCount: 1,
    avatarURL:
      'https://f8n-production.imgix.net/creators/profile/q52p19mmi-sparth-avatar-s-jpg-nxbxbp.jpg',
    bannerURL:
      'https://cdnb.artstation.com/p/users/covers/000/219/419/default/59b0c0b798083a4e2b531c1a397b9965.jpg?1590664077',
    social: {
      twitter: {
        alias: 'nbsparth',
        url: '',
      },
      instagram: {
        alias: 'sparth',
        url: '',
      },
    },
  },
  profileInfo: {
    bio: 'I am the commander of this ship',
    links: ['www.google.com', 'www.fdsoufdsuiafdsafhoidsa.com'],
    joinDate: 'April 2021',
  },
  works: ['903ndl'],
  owned: ['02nfl2', 'zpsn23', 'pdj20d'],
}

const UserProfile = ({ userInfo, profileInfo, works, owned }) => {
  const classes = useStyles()

  return (
    <>
      <Banner avatarURL={userInfo.avatarURL} bannerURL={userInfo.bannerURL} />
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid className={classes.profileColumn} item>
            <UserColumn userInfo={userInfo} profileInfo={profileInfo} />
          </Grid>
          <Grid className={classes.cardColumn} item>
            <CardTabs works={works} owned={owned} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

const Banner = ({ avatarURL, bannerURL }) => {
  const classes = useStyles()

  return (
    <>
      <Box className={classes.banner}>
        <img className={classes.bannerImage} src={bannerURL} />
      </Box>
      <Container className={classes.container}>
        <Box className={classes.avatarBar}>
          <Avatar className={classes.avatar} src={avatarURL} />
        </Box>
      </Container>
    </>
  )
}

const UserColumn = ({ userInfo, profileInfo }) => {
  return (
    <>
      <Header displayName={userInfo.displayName} alias={userInfo.alias} />
      <Social
        followerCount={userInfo.followerCount}
        followingCount={userInfo.followingCount}
        social={userInfo.social}
      />
      <Bio bio={profileInfo.bio} />
      <Links links={profileInfo.links} />
      <JoinedStats joinDate={profileInfo.joinDate} />
    </>
  )
}

const Header = ({ displayName, alias }) => {
  const classes = useStyles()
  return (
    <>
      <Typography className={classes.boldLight} variant='h4'>
        {displayName}
      </Typography>
      <Typography className={classes.alias} variant='h5'>
        @{alias}
      </Typography>
    </>
  )
}

const Social = ({ followerCount, followingCount, social }) => {
  return (
    <>
      <FollowStats
        followerCount={followerCount}
        followingCount={followingCount}
      />
      <br />
      <SocialChips social={social} />
    </>
  )
}

const FollowStats = ({ followerCount, followingCount }) => {
  return (
    <>
      <Grid container spacing={2} alignItems='center'>
        <Grid item>
          <Box>{followerCount}</Box>
          <Box>Followers</Box>
        </Grid>
        <Grid item>
          <Box>{followingCount}</Box>
          <Box>Following</Box>
        </Grid>
        <Grid item>
          <Button variant='contained'>FOLLOW</Button>
        </Grid>
      </Grid>
    </>
  )
}

const SocialChips = ({ social }) => {
  const classes = useStyles()
  return (
    <>
      {social.twitter && (
        <Box>
          <Chip
            className={`${classes.shadowed} ${classes.chip}`}
            label={`@${social.twitter.alias}`}
            icon={<Twitter />}
            component='a'
            href={`https://www.twitter.com/${social.twitter.alias}`}
            clickable
          />
        </Box>
      )}
      {social.instagram && (
        <Box>
          <Chip
            className={`${classes.shadowed} ${classes.chip}`}
            label={`@${social.instagram.alias}`}
            icon={<Instagram />}
            component='a'
            href={`https://www.instagram.com/${social.instagram.alias}`}
            clickable
          />
        </Box>
      )}
    </>
  )
}

const Bio = ({ bio }) => {
  const classes = useStyles()

  return (
    <>
      <Typography className={classes.profileInfo} variant='h6'>
        Bio
      </Typography>
      <Divider className={classes.divider} />
      <Typography>{bio}</Typography>
    </>
  )
}

const Links = ({ links }) => {
  const classes = useStyles()

  return (
    <>
      <Typography className={classes.profileInfo} variant='h6'>
        Links
      </Typography>
      <Divider className={classes.divider} />
      {links.map((link) => {
        return <Typography key={link}>{link}</Typography>
      })}
    </>
  )
}

const JoinedStats = ({ joinDate }) => {
  const classes = useStyles()
  return (
    <>
      <Divider className={classes.divider} style={{ marginTop: '3rem' }} />
      <Grid container justify='space-between' alignItems='center'>
        <Grid item>
          <Typography variant='h6'>Joined</Typography>
        </Grid>
        <Grid item>
          <Typography>{joinDate}</Typography>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
    </>
  )
}

const CardTabs = ({ works, owned }) => {
  const [activePanel, setActivePanel] = React.useState(0)
  const onTabSwitch = (event, newValue) => {
    setActivePanel(newValue)
  }

  const [cardWorks, setCardWorks] = React.useState([])
  const [cardOwned, setCardOwned] = React.useState([])

  // dynamically fetch the cards by ID
  React.useEffect(() => {
    // TODO: this should be some API request, but for now search through the samples
    console.log(works)
    console.log(owned)
    setCardWorks(getCardsByID(works))

    setCardOwned(getCardsByID(owned))
  }, [works, owned])

  return (
    <>
      <Tabs value={activePanel} onChange={onTabSwitch}>
        <Tab label='Works' />
        <Tab label='Owned' />
      </Tabs>
      <TabView value={activePanel} index={0}>
        <CardGrid cards={cardWorks} gridJustification='flex-start' />
        <br />
      </TabView>
      <TabView value={activePanel} index={1}>
        <CardGrid cards={cardOwned} gridJustification='flex-start' />
        <br />
      </TabView>
    </>
  )
}

const getCardsByID = (ids) => {
  const cards = ids.map((id) => {
    const card = sampleCards.find((card) => {
      return card.id === id
    })

    const author = sampleUsers.find((user) => {
      return user.username === card.author
    })

    return {
      ...card,
      author: {
        username: author.username,
        displayName: author.displayName,
        avatarURL: author.avatarURL,
      },
    }
  })

  // remove nulls
  return cards.filter((card) => {
    return card
  })
}

const TabView = ({ children, value, index: activeIndex }) => {
  return <div hidden={value !== activeIndex}>{children}</div>
}

UserProfile.defaultProps = defaultProps

export default UserProfile
