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

import * as cdk from  '@aws-cdk/core';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as iam from '@aws-cdk/aws-iam';
import * as s3 from '@aws-cdk/aws-s3';


export interface CardanoBinariesPipelineStackProps extends cdk.StackProps {
  
  readonly githubOwner: string;
  readonly githubToken: string;
  readonly githubRepo: string;
  readonly githubBranch: string;
  readonly nodeConfig: {[key: string]: string};
  readonly downloads: {[key: string]: {[key: string]: string}};

}



/**
 * CodePipeline Stack 
 */
export class CardanoBinariesPipelineStack extends cdk.Stack {
  
  public readonly deploymentBucketName: string;
  public readonly deploymentBucketArn: string;

  constructor(app: cdk.App, id: string, props: CardanoBinariesPipelineStackProps) {
    
    super(app, id, props);


    const deploymentBucket = new s3.Bucket(this, "DeploymentBucket", {
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    this.deploymentBucketArn = deploymentBucket.bucketArn;
    this.deploymentBucketName = deploymentBucket.bucketName;

    new cdk.CfnOutput(this, 'DeploymentBucketArnOutput', {
      exportName: 'CardanoBinariesDeploymentBucketArn',
      value: this.deploymentBucketArn
    });

    new cdk.CfnOutput(this, 'DeploymentBucketNameOutput', {
      exportName: 'CardanoBinariesDeploymentBucketName',
      value: this.deploymentBucketName
    });

    function file(url: string): string {
      return url.split('/').pop() || ''
    }

    const build = new codebuild.PipelineProject(this, 'Build', {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: [
              // install required packages
              'yum update -y',
              'yum install git gcc gcc-c++ tmux gmp-devel make tar wget nmap -y',
              'yum install zlib-devel libtool autoconf -y',
              'yum install systemd-devel ncurses-devel ncurses-compat-libs -y',
              'yum install libtool -y',
              // remember source directory
              'export SRC_DIR=`pwd`',
              'echo "Source Directory: $SRC_DIR"',
              // create installation directory
              'mkdir -p /tmp/cardano-build',
              'cd /tmp/cardano-build',
              // install cabal
              `wget ${props.downloads['cabal'][props.nodeConfig['cabalRelease']]}`,
              `tar -xf ${file(props.downloads['cabal'][props.nodeConfig['cabalRelease']])}`,
              'mv cabal /usr/local/bin',
              'export PATH=/usr/local/bin:$PATH',
              'cabal update',
              // install GHC
              `wget ${props.downloads['ghc'][props.nodeConfig['ghcRelease']]}`,
              `tar -xf ${file(props.downloads['ghc'][props.nodeConfig['ghcRelease']])}`,
              `rm -f ${file(props.downloads['ghc'][props.nodeConfig['ghcRelease']])}`,
              `cd ghc-${props.nodeConfig['ghcRelease']}`,
              './configure',
              'make install',
              'cd ..',
              // install libsodium
              'export LD_LIBRARY_PATH="/usr/local/lib:$LD_LIBRARY_PATH"',
              'export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:$PKG_CONFIG_PATH"',
              'git clone https://github.com/input-output-hk/libsodium',
              'cd libsodium',
              `git checkout ${props.nodeConfig['libsodiumCommit']}`,
              './autogen.sh',
              './configure',
              'make',
              'make install',
              'cd ..'
            ],
          },
          build: {
            commands: [
              // go back to the source directory
              'cd $SRC_DIR',
              // build cardano binaries
              `cabal configure -O0 -w ghc-${props.nodeConfig['ghcRelease']}`,
              'echo -e "package cardano-crypto-praos\\n flags: -external-libsodium-vrf" > cabal.project.local',
              'export HOME="/root"',
              'sed -i $HOME/.cabal/config -e "s/overwrite-policy:/overwrite-policy: always/g"',
              'cabal clean',
              'cabal update',
              'cabal build cardano-cli cardano-node',         
              'mkdir -p /tmp/cardano-build/bin',
              `cp dist-newstyle/build/x86_64-linux/ghc-${props.nodeConfig['ghcRelease']}/cardano-node-${props.nodeConfig['release']}/x/cardano-node/build/cardano-node/cardano-node /tmp/cardano-build/bin`,
              `cp dist-newstyle/build/x86_64-linux/ghc-${props.nodeConfig['ghcRelease']}/cardano-cli-${props.nodeConfig['release']}/x/cardano-cli/build/cardano-cli/cardano-cli /tmp/cardano-build/bin`
            ],
          },
        },
        artifacts: {
          'base-directory': '/tmp/cardano-build/bin',
          files: [
            'cardano-node',
            'cardano-cli'
          ],
        },
      }),
      environment: {
        buildImage: codebuild.LinuxBuildImage.AMAZON_LINUX_2,
      },
    });

    const sourceOutput = new codepipeline.Artifact('SrcOutput');
    const buildOutput = new codepipeline.Artifact('BuildOutput');

    const pipeline = new codepipeline.Pipeline(this, 'Pipeline', {
      restartExecutionOnUpdate: true,
      stages: [
        {
          stageName: 'Source',
          actions: [
            new codepipeline_actions.GitHubSourceAction({
              actionName: 'Checkout',
              output: sourceOutput,
              owner: props.githubOwner,
              repo: props.githubRepo,
              branch: props.githubBranch,
              oauthToken: cdk.SecretValue.plainText(props.githubToken),
              trigger: codepipeline_actions.GitHubTrigger.WEBHOOK
            })
          ],
        },
        {
          stageName: 'Build',
          actions: [
            new codepipeline_actions.CodeBuildAction({
              actionName: 'Build',
              project: build,
              input: sourceOutput,
              outputs: [buildOutput]
            })
          ],
        },
        {
          stageName: 'Deploy',
          actions: [
            new codepipeline_actions.S3DeployAction({
              actionName: 'S3-Upload',
              input: buildOutput,
              bucket: deploymentBucket
            })
          ]
        },
      ]
    });
  }
}