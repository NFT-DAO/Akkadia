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
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import * as r53 from '@aws-cdk/aws-route53';

export interface CoreStackProps extends cdk.StackProps {
  readonly bastionInstanceType: string;
  readonly internalDomain: string;
}

export class CoreStack extends cdk.Stack {
  
  public readonly vpc: ec2.Vpc;
  public readonly instanceRole: iam.Role;
  public readonly internalHostedZone: r53.PrivateHostedZone;

  constructor(scope: cdk.Construct, id: string, props: CoreStackProps) {
    
    super(scope, id, props);

      /**
       * VPC
       */

      this.vpc = new ec2.Vpc(this, 'VPC');

      /**
       * Instance Role
       * Allows connection to an EC2 instance via SSM
       */

      this.instanceRole = new iam.Role(this, 'InstanceRole', {
        assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore')
        ]
      });

      /**
       * Bastion host
       * Used for connection to resources in private subnet, such as RDS
       */

      // create bootrstrap (user data)
      const bootstrap = ec2.UserData.forLinux();

      bootstrap.addCommands(
        'yum install -y https://s3.region.amazonaws.com/amazon-ssm-region/latest/linux_amd64/amazon-ssm-agent.rpm',
        'yum install -y nmap'
      );

      // launch instance
      const bastion = new ec2.Instance(this, 'Bastion', {
        instanceType: new ec2.InstanceType(props.bastionInstanceType),
        vpc: this.vpc,
        vpcSubnets: {subnetType: ec2.SubnetType.PRIVATE},
        machineImage: new ec2.AmazonLinuxImage(),
        role: this.instanceRole,
        userData: bootstrap,
        userDataCausesReplacement: true
      });

      cdk.Tags.of(bastion).add('configuration', 'bastion');

      /**
       * Internal Hosted Zone
       */
      this.internalHostedZone = new r53.PrivateHostedZone(this, 'HostedZone', {
        vpc: this.vpc,
        zoneName: props.internalDomain
      });

      new cdk.CfnOutput(this, 'InternalHostedZoneOutput', {
        exportName: 'InternalHostedZone',
        value: this.internalHostedZone.hostedZoneId
      });

  }
}
