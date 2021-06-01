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
import { Modal, TextField, Button, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      position: 'absolute',
      width: '31.8%',
      backgroundColor: theme.palette.background.default,
      border: '0 solid #000',
      padding: theme.spacing(2, 4, 3),
      textAlign: 'center',
      [theme.breakpoints.down('md')]: {
        width: '80%',
      },
    },
    full: {
      width: '100%',
    },
    root: {
      textAlign: 'center',
      margin: theme.spacing(1, 'auto'),
    },
    options: {
      marginTop: '0.1rem',
      marginBottom: '0.1rem',
    },
    yoroi: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.default,
      border: '1px solid black',
      '&:hover': {
        backgroundColor: theme.palette.background.default,
        color: 'black',
        border: '1px solid black',
      },
    },
    modalStyle: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  }
})

export default function WalletConnectModal({
  handleClose,
  open,
  connectWallet,
}) {
  const classes = useStyles()

  const body = (
    <div className={`${classes.paper} ${classes.modalStyle}`}>
      <p id='simple-modal-description'>
        Please use a Cardano public address when connecting to the marketplace.
        The smart contract assumes funds will arrive from this address.
      </p>
      <p>
        The contract is built with open source technology. Your funds will be
        safe.
      </p>
      <form
        className={classes.root}
        autoComplete='off'
        onSubmit={connectWallet}
      >
        <TextField
          fullWidth
          id='outlined-basic'
          label='Your Public Address'
          variant='outlined'
          required
        />
        <Grid
          className={classes.options}
          container
          justify='center'
          spacing={6}
        >
          <Grid item>
            <Button type='submit' size='large'>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleClose} size='large'>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
      <small>
        Your funds and winning tokens will be sent to this address. Make sure
        your wallet can take care of tokens!
      </small>
      <form className={classes.root} noValidate autoComplete='off'>
        <p>Yoroi Wallet Integration not available.</p>
        <Button className={classes.yoroi} onClick={connectWallet}>
          Yoroi Wallet Integration
        </Button>
      </form>
    </div>
  )

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  )
}
