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
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    maxWidth: 400,
  },
  media: {
    aspectRatio: 1,
  },
  aligned: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: '0.5rem',
  },
  bidInfo: {
    backgroundColor: '#222222',
    color: '#ffffff',
  },
  tickerLabels: {
    color: '#aaaaaa',
  },
})

const defaultProps = {
  title: 'samurai',
  author: {
    username: 'flaptrap',
    displayName: 'Flap Trap',
    avatarURL:
      'https://cdna.artstation.com/p/users/avatars/000/013/574/large/16282a24ee1cfa509872be8401bf7d57.jpg?1589275424',
  },
  price: 400,
  imageURL:
    'https://cdnb.artstation.com/p/assets/images/images/031/678/153/large/richard-anderson-flaptraps-art-ink-35.jpg?1604306844',
}

const NFTCardBrief = ({ id, title, author, price, imageURL }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link href={`/market/card/${id}`}>
          <CardMedia className={classes.media} image={imageURL} />
        </Link>
        <CardContent>
          <Link href={`/market/card/${id}`}>
            <Typography gutterBottom variant='h5' component='h2'>
              {title}
            </Typography>
          </Link>
          <Grid container className={classes.aligned}>
            <Grid item>
              <Link href={`/market/user/${author.username}`}>
                <Avatar src={author.avatarURL} />
              </Link>
            </Grid>
            <Grid item>
              <Link href={`/market/user/${author.username}`}>
                <Typography>{author.displayName}</Typography>
              </Link>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent className={classes.bidInfo}>
          <Typography>{`${price} ₳`}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

NFTCardBrief.defaultProps = defaultProps

export default NFTCardBrief

// TODO: grid preview version with pricetag and hover overlay info (title, avatar, author)
// i.e. artstation view but with pricetag somewhere
export const NFTCardGridPreview = () => {
  return <div>todo</div>
}
