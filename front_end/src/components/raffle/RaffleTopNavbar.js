/**
The MIT License (MIT)

Copyright (c) 2021 NFT-DAO Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Button,
  Container,
  Grid,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@material-ui/core'
import ComingSoonButton from 'components/ComingSoonButton'
import MenuIcon from '@material-ui/icons/Menu'
import { useRouter } from 'next/router'
const useStyles = makeStyles(() => {
  return {
    bar: {
      boxShadow: 'none',
    },
    homeText: {
      fontSize: '2rem',
    },
  }
})

export default function RaffleTopNavbar() {
  const classes = useStyles()

  return (
    <Container maxWidth='xl' style={{ paddingLeft: 0 }}>
      <AppBar position='static' color='transparent' className={classes.bar}>
        <Toolbar style={{ paddingLeft: 0 }}>
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
          >
            <Grid item>
              {/* This button should be a cool looking Logo for Akkadia. */}
              <Button className={classes.homeText} size='large' href='/'>
                Akkadia
              </Button>
            </Grid>

            <Grid item>
              <Hidden xsDown>
                <NavButtons />
              </Hidden>
              <Hidden smUp>
                <NavMenu />
              </Hidden>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Container>
  )
}

const NavButtons = () => {
  return (
    <Grid container spacing={0.7} alignItems='center'>
      <Grid item>
        <Button size='large' target='nftdao' href='https://www.nft-dao.org/'>
          NFT-DAO
        </Button>
      </Grid>
      <Grid item>
        <Button size='large' href='/tickets'>
          TICKETS
        </Button>
      </Grid>
      <Grid item>
        <Button size='large' href='/drops'>
          DROPS
        </Button>
      </Grid>
      <Grid item>
        <Button size='large' href='/faq'>
          FAQ
        </Button>
      </Grid>
      <Grid item>
        <ComingSoonButton variant='contained' size='large' color='primary'>
          LOGIN
        </ComingSoonButton>
      </Grid>
    </Grid>
  )
}

const NavMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const router = useRouter()
  const closeMenu = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Grid container spacing={1} alignItems='center' wrap='nowrap'>
        <Grid item>
          <IconButton
            onClick={(e) => {
              setAnchorEl(e.currentTarget)
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={anchorEl !== null}
            onClose={closeMenu}
          >
            <MenuItem
              onClick={() => {
                window.open('https://www.nft-dao.org/', 'nftdo')
              }}
            >
              NFT-DAO
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push('/tickets')
              }}
            >
              TICKETS
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push('/drops')
              }}
            >
              DROPS
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push('/faq')
              }}
            >
              FAQ
            </MenuItem>
          </Menu>
        </Grid>
        <Grid item>
          <ComingSoonButton variant='contained' size='large' color='primary'>
            LOGIN
          </ComingSoonButton>
        </Grid>
      </Grid>
    </>
  )
}
