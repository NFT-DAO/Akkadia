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
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React from 'react'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

const useStyles = makeStyles(() => {
  return {
    divider: {
      backgroundColor: 'black',
      margin: '1rem 0',
    },
    '@keyframes flicker': {
      from: {
        opacity: 1,
      },
      to: {
        opacity: 0.07,
      },
    },
    flicker: {
      animationName: '$flicker',
      animationDuration: '1111ms',
      animationIterationCount: 'infinite',
      animationDirection: 'alternate',
      animationTimingFunction: 'ease-in-out',
      animationPlayState: 'running',
      marginRight: '1rem',
    },
  }
})

// todo: this should be pulled out and used by pages
const LiveAuctionHeader = () => {
  const classes = useStyles()

  return (
    <>
      <Grid container alignItems='center'>
        <Grid item>
          <IconButton size='small' disabled>
            <FiberManualRecordIcon
              className={classes.flicker}
              fontSize='small'
            />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant='h5'>Active Listings</Typography>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />
    </>
  )
}

export default LiveAuctionHeader
