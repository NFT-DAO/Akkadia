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

export interface InfrastructurePipelineStackProps extends cdk.StackProps {
  
  readonly githubOwner: string;
  readonly githubToken: string;
  readonly githubRepo: string;
  readonly githubBranch: string;
}

/**
 * CodePipeline Stack 
 */
export class InfrastructurePipelineStack extends cdk.Stack {
  constructor(app: cdk.App, id: string, props: InfrastructurePipelineStackProps) {
    
    super(app, id, props);

    /**
     * Build this CDK app and outputs CFN templates into dist folder
     */
    const build = new codebuild.PipelineProject(this, 'Build', {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: [
              'npm install'
            ],
          },
          build: {
            commands: [
              'npm run build',
              'npm run cdk synth -- -o dist'
            ],
          },
        },
        artifacts: {
          'base-directory': 'dist',
          files: [
            'CoreStack.template.json',
            'RdsStack.template.json',
            'CardanoNodeStack.template.json'
          ],
        },
      }),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_4_0,
      },
    });

   
    /**
     * Outputs
     */
    const sourceOutput = new codepipeline.Artifact('SrcOutput');
    const buildOutput = new codepipeline.Artifact('BuildOutput');

    
    /**
     * CI/CD Pipeline
     */
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
              trigger: codepipeline_actions.GitHubTrigger.WEBHOOK,
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
              outputs: [buildOutput],
            })
          ],
        },
        {
          stageName: 'Deploy',
          actions: [
            new codepipeline_actions.CloudFormationCreateUpdateStackAction({
              actionName: 'Deploy-Core',
              templatePath: buildOutput.atPath('CoreStack.template.json'),
              stackName: 'CoreStack',
              adminPermissions: true
            }),
            new codepipeline_actions.CloudFormationCreateUpdateStackAction({
              actionName: 'Deploy-RDS',
              templatePath: buildOutput.atPath('RdsStack.template.json'),
              stackName: 'RdsStack',
              adminPermissions: true,
            }),
            new codepipeline_actions.CloudFormationCreateUpdateStackAction({
              actionName: 'Deploy-Cardano-Node',
              templatePath: buildOutput.atPath('CardanoNodeStack.template.json'),
              stackName: 'CardanoNodeStack',
              adminPermissions: true,
            })
          ]
        },
      ],
    });
  }
}