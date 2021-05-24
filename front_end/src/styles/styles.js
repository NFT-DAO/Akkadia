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
