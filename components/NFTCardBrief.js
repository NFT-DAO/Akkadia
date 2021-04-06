import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    maxHeight: 1200,
  },
  media: {
    height: 300,
    width: 300,
  },
  aligned: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  content2: {
    backgroundColor: '#222222',
    color: '#ffffff',
  },
  tickerLabels: {
    color: '#aaaaaa',
  },
})

export default function NFTCardBrief({ title, creator, imageURL }) {
  const classes = useStyles()

  const testImageURL =
    'https://cdnb.artstation.com/p/assets/images/images/031/678/153/large/richard-anderson-flaptraps-art-ink-35.jpg?1604306844'
  const testAvatarURL =
    'https://cdna.artstation.com/p/users/avatars/000/013/574/large/16282a24ee1cfa509872be8401bf7d57.jpg?1589275424'

  imageURL = testImageURL
  creator.avatarURL = testAvatarURL

  /*
    NOTES:
    bid time should be handled by a setInterval counting down from the time provided by the page load
    this can be a server-render prop value when populating all the cards
    should probably be managed by some internal countdown-timer component which also can be customized to change color at threshold
    
    the bid value needs to be updated dynamically
    push notification from server?
    polling?
    websockets?
  */

  const testBidString = '400 ₳'
  const testBidTime = '00:12:23'

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia height='300' className={classes.media} image={imageURL} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Box className={classes.aligned}>
            <Avatar src={creator.avatarURL} />
            <Box m={1}>
              <Typography>{creator.name}</Typography>
            </Box>
          </Box>
        </CardContent>
        <CardContent className={classes.content2}>
          <Grid container>
            <Grid item sm>
              <Typography className={classes.tickerLabels}>
                Current Bid
              </Typography>
              <Typography>{testBidString}</Typography>
            </Grid>
            <Grid item sm>
              <Typography className={classes.tickerLabels}>
                Ending in
              </Typography>
              <Typography>{testBidTime}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
