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

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import { lightTheme } from 'styles/theme'

const useStyles = makeStyles(() => {
  return {
    backHvr: {
      backgroundColor: lightTheme.palette.primary.main,
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: lightTheme.palette.primary.main,
      },
    },
    foot: {
      width: '80%',
      bottom: '0',
      backgroundColor: lightTheme.palette.primary.main,
    },
    icon: {
      marginLeft: '1rem',
    },
    logo: {
      marginLeft: '1rem',
    },
    help: {
      marginLeft: '1rem',
    },
  }
})

// Bottom Left hand corner
export default function LinkFooter() {
  // Constants
  const classes = useStyles()

  return (
    <footer className={classes.foot}>
      <Grid container direction='row' justify='center'>
        {/* LOGO + Social Media */}
        <Grid item xs={6}>
          <Button
            variant='contained'
            className={`${classes.logo} ${classes.backHvr}`}
            href='#Home'
            size='small'
          >
            Akkadia
          </Button>
          <Button
            variant='contained'
            className={`${classes.icon} ${classes.backHvr}`}
            href='#Instagram'
            size='small'
          >
            <InstagramIcon />
          </Button>
          <Button
            variant='contained'
            className={`${classes.icon} ${classes.backHvr}`}
            href='#Twitter'
            size='small'
          >
            <TwitterIcon />
          </Button>
          <Button
            variant='contained'
            className={`${classes.icon} ${classes.backHvr}`}
            href='#Discord'
            size='small'
          >
            Discord
          </Button>
          <Button
            variant='contained'
            className={`${classes.icon} ${classes.backHvr}`}
            href='#Blog'
            size='small'
          >
            Blog
          </Button>
        </Grid>

        {/* Help, ToS, Privacy */}
        <Grid item xs={6}>
          <Button
            variant='contained'
            className={`${classes.icon} ${classes.backHvr}`}
            href='#Guide'
            size='small'
          >
            Guide
          </Button>
          <Button
            variant='contained'
            className={`${classes.icon} ${classes.backHvr}`}
            href='#ToS'
            size='small'
          >
            ToS
          </Button>
          <Button
            variant='contained'
            className={`${classes.icon} ${classes.backHvr}`}
            href='#Privacy'
            size='small'
          >
            Privacy
          </Button>
          <Button
            variant='contained'
            className={`${classes.icon} ${classes.backHvr}`}
            href='#DAO'
            size='small'
          >
            DAO
          </Button>
          <Button
            variant='contained'
            className={`${classes.help} ${classes.backHvr}`}
            href='#Help'
            size='small'
          >
            Help
          </Button>
        </Grid>
      </Grid>
    </footer>
  )
}
