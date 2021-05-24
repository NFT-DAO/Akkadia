import 'styles/globals.css'
import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { Paper } from '@material-ui/core'
import { lightTheme } from 'styles/theme'

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ThemeProvider theme={lightTheme}>
      <Paper>
        <Component {...pageProps} />
      </Paper>
    </ThemeProvider>
  )
}

export default MyApp
