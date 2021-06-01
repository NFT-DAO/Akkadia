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

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Link from 'next/link'
import WalletConnectModal from './WalletConnectModal'

const useStyles = makeStyles(() => {
  return {
    root: {
      width: '100%',
    },
    bar: {
      boxShadow: 'none',
    },
    options: {},
  }
})

export default function FixedTopNavbar() {
  const [isVisible, setIsVisible] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  // Change visibility based off wallet connect.
  const toggleVisibility = () => {
    if (isVisible === false) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Handles Wallet Connections.
  const connectWallet = () => {
    toggleVisibility()
    setAnchorEl(null)
    handleModalClose()
    console.log('Connect Wallet Clicked.')
  }

  const disconnectWallet = () => {
    toggleVisibility()
    setAnchorEl(null)
    handleModalClose()
    console.log('Connect Wallet Clicked.')
  }

  // Opens the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  // Closes the menu
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleModalOpen = () => {
    setOpen(true)
  }
  const handleModalClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='transparent' className={classes.bar}>
        <Toolbar>
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
          >
            <Grid item>
              {/* This button should be a cool looking Logo for Akkadia. */}
              <IconButton href='/market'>Akkadia</IconButton>
            </Grid>

            <Grid item>
              <Hidden mdDown>
                <ButtonGroup variant='text'>
                  <Button href='/market'>Home</Button>
                  <Button href='/market/artworks'>Artworks</Button>
                  <Button href='/market/artists'>Artists</Button>
                </ButtonGroup>
              </Hidden>
            </Grid>

            {/* Wallet Connect Modal Here */}
            {!isVisible && (
              <Grid item>
                <Button onClick={handleModalOpen}>Wallet Connect</Button>
              </Grid>
            )}

            {/* Viewable when wallet is connected. */}
            {isVisible && (
              <Grid item>
                <Button href='/market/orders'>Open Orders</Button>
                <Button href='/market/create'>Create</Button>
              </Grid>
            )}

            {/* This needs to disconnect a wallet. */}
            {isVisible && (
              <Grid item>
                <Button
                  aria-controls='simple-menu'
                  aria-haspopup='true'
                  onClick={handleClick}
                >
                  <span>
                    0 ADA
                    <br></br>
                    <small>addr1q...a426</small>
                  </span>
                  <AccountBoxIcon fontSize='large'></AccountBoxIcon>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  className={classes.bar}
                >
                  <MenuItem onClick={handleClose}>
                    <Link href='/market/myprofile'>View Your Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link href='/market/help'>Help and Support</Link>
                  </MenuItem>
                  <MenuItem onClick={disconnectWallet}>Disconnect</MenuItem>
                </Menu>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <WalletConnectModal
        handleClose={handleModalClose}
        open={open}
        connectWallet={connectWallet}
      />
    </div>
  )
}
