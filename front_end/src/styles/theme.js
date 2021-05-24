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

import { blue } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

const defaultTheme = createMuiTheme()

const sharedButtonStyles = {
  root: {
    borderRadius: '0.5rem',
    lineHeight: '2',
  },
  sizeLarge: {
    padding: '0.5rem 2rem',
    fontSize: '1.2rem',
    fontWeight: 400,
    [defaultTheme.breakpoints.down('sm')]: {
      padding: '0.25rem 1rem',
      fontSize: '0.8rem',
    },
  },
}

const lightButtonStyles = {
  contained: {
    backgroundColor: '#000',
    color: '#fff',
    fontWeight: 'bold',
  },
}

const darkButtonStyles = {
  contained: {
    backgroundColor: '#fff',
    color: '#000',
    fontWeight: 'bold',
  },
}

export const sharedStyles = {
  typography: {
    fontFamily: ['Cabin', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontWeight: '100',
      fontSize: '3.5rem',
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2rem',
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '1.6rem',
      },
    },
    h3: {
      fontSize: '1.6rem',
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '1.4rem',
      },
    },
    h4: {
      fontSize: '1.4rem',
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
      },
    },
    h5: {
      fontSize: '1.2rem',
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '0.8rem',
      },
    },
    h6: {
      fontSize: '0.8rem',
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '0.7rem',
      },
    },
  },
}

const lightStyles = {
  ...sharedStyles,
  palette: {
    primary: {
      main: blue[500],
    },
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#000',
    },
  },
  overrides: {
    MuiButton: { ...sharedButtonStyles, ...lightButtonStyles },
  },
}

const darkStyles = {
  ...sharedStyles,
  palette: {
    background: {
      paper: '#000',
    },
    text: {
      primary: '#fff',
    },
  },
  overrides: {
    MuiButton: { ...sharedButtonStyles, ...darkButtonStyles },
  },
}

export const lightTheme = createMuiTheme(lightStyles)
export const darkTheme = createMuiTheme(darkStyles)
