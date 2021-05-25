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

import * as cdk from '@aws-cdk/core';
/**
 * AWS Infrastructure
 */
export const region = 'us-west-2';
export const internalDomain = 'akkadia.internal';

/**
 * GitHub repos config
 * (for triggering CI/CD pipelines)
 */
export const repos: {[key: string]: {[key: string]: string}} = {
    'infrastructure': {
        'account': 'NFT-DAO',
        'repo': 'Akkadia',
        'branch': 'infra'
    },
    'frontend': {
        'account': 'NFT-DAO',
        'repo': 'Akkadia',
        'branch': 'frontend'
    },
    'backend': {
        'account': 'NFT-DAO',
        'repo': 'Akkadia',
        'branch': 'backend'
    },
    'cardano-node': {
        'account': 'NFT-DAO',
        'repo': 'Akkadia',
        'branch': 'cardano-node',
    }
}

/**
 * GitHub token
 * 
 * Follow this doc https://cloudaffaire.com/how-to-trigger-a-codebuild-build-using-github-webhook/
 * to create token for the GitHub hook
 */
export const githubToken = process.env.GITHUB_TOKEN || "";


/**
 * Cardano Node config
 */
export const cardanoNode: {[key: string]: string} = {
    'release': '1.26.1',
    'libsodiumCommit': '66f017f1',
    'cabalRelease': '3.4.0.0',
    'ghcRelease': '8.10.2',
    'port': '3001',
    'network': 'testnet',
    'autostart': 'true',
    'instanceType': 't3a.large',
    //'snapshotId': '',
    'dataVolumeSizeGb': '500'
}

export const downloads: {[key:string]:{[key: string]: string}} = {
    'cabal': {
        '3.4.0.0': 'https://downloads.haskell.org/~cabal/cabal-install-3.4.0.0/cabal-install-3.4.0.0-x86_64-ubuntu-16.04.tar.xz'
    },
    'ghc': {
        '8.10.2': 'https://downloads.haskell.org/~ghc/8.10.2/ghc-8.10.2-x86_64-centos7-linux.tar.xz'
    }
}

/**
 * RDS Config
 */

export const rds: {[key: string]: string} = {
    'instanceType': 't3.large',
    'allocatedStorage': '25',
    'backupRetentionDays': '5',
    'masterUserName': 'master',
    'dbName': 'akkadia',
    'port': '5432'
}

/**
 * Bastion config
 */
export const bastion: {[key: string]: string} = {
    'instanceType': 't3.nano'
}