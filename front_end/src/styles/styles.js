import { makeStyles } from '@material-ui/core'
import { sharedStyles } from 'styles/theme'

export const useSplashStyles = makeStyles((theme) => {
  return {
    header: {
      color: '#444',
      ...sharedStyles.typography.h2,
    },
    description: {
      color: '#777',
      fontSize: '1.3rem',
    },
  }
})
