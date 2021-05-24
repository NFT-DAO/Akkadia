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
        'account': 'FunProjectos',
        'repo': 'nft-mvp-cdk',
        'branch': 'dev'
    },
    'frontend': {
        'account': 'FunProjectos',
        'repo': 'NFT-MVP',
        'branch': 'aws_deployment'
    },
    'backend': {
        'account': 'FunProjectos',
        'repo': 'CardanoDev',
        'branch': 'dev'
    },
    'cardano-node': {
        'account': 'FunProjectos',
        'repo': 'cardano-node',
        'branch': 'nft-dao-build',
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