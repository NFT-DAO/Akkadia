#!/usr/bin/env node
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
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

import { CoreStack } from '../lib/core-stack';
import { RdsStack } from '../lib/rds-stack';
import { InfrastructurePipelineStack } from '../lib/infrastructure-pipeline-stack';
import { FrontendPipelineStack } from '../lib/frontend-pipeline-stack';
import { CardanoBinariesPipelineStack } from '../lib/cardano-binaries-pipeline-stack';
import { CardanoNodeStack } from '../lib/cardano-node-stack';
import * as config from './config';

const app = new cdk.App();

const vpcStack = new CoreStack(app, 'CoreStack', {
  env: {
    region: config.region 
  },
  bastionInstanceType: config.bastion['instanceType'],
  internalDomain: config.internalDomain
});

new RdsStack(app, 'RdsStack', {
  env: {
    region: config.region 
  },
  vpc: vpcStack.vpc,
  instanceType: config.rds['instanceType'],
  allocatedStorage: +config.rds['allocatedStorage'],
  backupRetentionDays: cdk.Duration.days(+config.rds['backupRetentionDays']),
  masterUserName: config.rds['masterUserName'],
  dbName: config.rds['dbName'],
  port: +config.rds['port']
});

new InfrastructurePipelineStack(app, 'InfrastructurePipelineStack', {
  env: {
    region: config.region 
  },
  githubOwner: config.repos['infrastructure']['account'],
  githubToken: config.githubToken,
  githubRepo: config.repos['infrastructure']['repo'],
  githubBranch: config.repos['infrastructure']['branch']
});

new FrontendPipelineStack(app, 'FrontendPipelineStack', {
  env: {
    region: config.region 
  },
  githubOwner: config.repos['frontend']['account'],
  githubToken: config.githubToken,
  githubRepo: config.repos['frontend']['repo'],
  githubBranch: config.repos['frontend']['branch']
});

const cardanoBinariesPipelineStack = new CardanoBinariesPipelineStack(app, 'CardanoBinariesPipelineStack', {
  env: {
    region: config.region 
  },
  githubOwner: config.repos['cardano-node']['account'],
  githubToken: config.githubToken,
  githubRepo: config.repos['cardano-node']['repo'],
  githubBranch: config.repos['cardano-node']['branch'],
  nodeConfig: config.cardanoNode,
  downloads: config.downloads
});

const cardanoNodeStack = new CardanoNodeStack(app, 'CardanoNodeStack', {
  env: {
    region: config.region 
  },
  vpc: vpcStack.vpc,
  binariesBucketName: cardanoBinariesPipelineStack.deploymentBucketName,
  config: config.cardanoNode,
  internalHostedZoneId: vpcStack.internalHostedZone.hostedZoneId,
  internalHostedZoneName: config.internalDomain
});

app.synth();
