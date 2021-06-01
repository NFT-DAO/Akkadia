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
import NFTCardBrief from './NFTCardBrief'
import { Box } from '@material-ui/core'
import { sampleCards, sampleUsers } from 'utils/dummyData'

const useStyles = makeStyles(() => {
  return {
    cardGrid: {
      marginTop: '1rem',
    },
    limitRowCount: {
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: '21%', // makes sure that we never get more than 4 cards per row
    },
  }
})

// note: this will go away with the DB queries, ignore the slow lookup
const generateCards = () => {
  const cards = sampleCards
  return cards.map((card) => {
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
}

const defaultProps = {
  cards: generateCards(),
}

// m by n card grid
const CardGrid = ({ cards, gridJustification = 'center' }) => {
  // Constants
  const classes = useStyles()

  return (
    <Box className={classes.cardGrid}>
      <Grid container justify={gridJustification} spacing={5}>
        {cards.map((card) => {
          return (
            <Grid className={classes.limitRowCount} key={card.id} item lg>
              <NFTCardBrief {...card} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

CardGrid.defaultProps = defaultProps

export default CardGrid
