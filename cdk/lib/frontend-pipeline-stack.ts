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

export interface FrontendPipelineStackProps extends cdk.StackProps {
  readonly githubOwner: string;
  readonly githubToken: string;
  readonly githubRepo: string;
  readonly githubBranch: string;
}

/**
 * CodePipeline Stack 
 */
export class FrontendPipelineStack extends cdk.Stack {
  constructor(app: cdk.App, id: string, props: FrontendPipelineStackProps) {
    super(app, id, props);

    /**
     * Policy to deploy Serverless NextJS application with CodeBuild
     * https://www.serverless.com/blog/serverless-nextjs
     * 
     * Mostly taken from here: https://www.1strategy.com/blog/2018/03/06/serverless-cicd-tutorial-part-2-test/
     * but with a few modifications to make it work with the latest version of Serverless
     * 
     * It's not the most restrictive policy, since most of the resources are wildcarded to '*'
     * Could be tigthened further, by providing more restrictive resource definitions
     *  */ 
    const serverlessPolicy = new iam.ManagedPolicy(this, 'CodeBuildServerlessPolicy', {
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'cloudformation:List*',
            'cloudformation:Get*',
            'cloudformation:ValidateTemplate'
          ],
          resources: ['*']
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'cloudformation:CreateStack',
            'cloudformation:CreateUploadBucket',
            'cloudformation:DeleteStack',
            'cloudformation:Describe*',
            'cloudformation:UpdateStack',
            'cloudformation:ValidateTemplate'
          ],
          resources: ['*']
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'lambda:Get*',
            'lambda:List*',
            'lambda:CreateFunction'
          ],
          resources: ['*']
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            's3:GetBucketLocation',
            's3:CreateBucket',
            's3:DeleteBucket',
            's3:ListBucket',
            's3:ListBucketVersions',
            's3:GetAccelerateConfiguration',
            's3:PutAccelerateConfiguration',
            's3:GetEncryptionConfiguration',
            's3:PutEncryptionConfiguration',
            's3:GetBucketPolicy',
            's3:PutBucketPolicy'
          ],
          resources: ['*']
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            's3:PutObject',
            's3:GetObject',
            's3:DeleteObject'
          ],
          resources: ['*']
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'lambda:AddPermission',
            'lambda:CreateAlias',
            'lambda:DeleteFunction',
            'lambda:InvokeFunction',
            'lambda:PublishVersion',
            'lambda:RemovePermission',
            'lambda:Update*',
            'lambda:EnableReplication*'
          ],
          resources: ['*']
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'apigateway:GET',
            'apigateway:POST',
            'apigateway:PUT',
            'apigateway:DELETE',
            'apigateway:PATCH'
          ],
          resources: [
            'arn:aws:apigateway:*::/restapis*',
            'arn:aws:apigateway:*::/apikeys*',
            'arn:aws:apigateway:*::/usageplans*'
          ]
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'iam:PassRole'
          ],
          resources: [
            'arn:aws:iam::*:role/*'
          ]
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [ 'kinesis:*' ],
          resources: ['*']
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'iam:GetRole',
            'iam:CreateRole',
            'iam:PutRolePolicy',
            'iam:DeleteRolePolicy',
            'iam:DeleteRole',
            'iam:CreateServiceLinkedRole'
          ],
          resources: ['*']
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['sqs:*'],
          resources: ['*']
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'cloudwatch:GetMetricStatistics'
          ],
          resources: ['*']
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'logs:CreateLogGroup',
            'logs:CreateLogStream',
            'logs:DeleteLogGroup'
          ],
          resources: [
            'arn:aws:logs:*:*:*'
          ]
          
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'logs:PutLogEvents'
          ],
          resources: [
            'arn:aws:logs:*:*:*'
          ]
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'logs:DescribeLogStreams',
            'logs:DescribeLogGroups',
            'logs:FilterLogEvents'
          ],
          resources: ['*']
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'events:Put*',
            'events:Remove*',
            'events:Delete*'
          ],
          resources: ['*']
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'events:DescribeRule'
          ],
          resources: ['*']
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'dynamodb:*'
          ],
          resources: [
            'arn:aws:dynamodb:*:*:table/*'
          ]
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            's3:CreateBucket'
          ],
          resources: ['*']
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'cloudfront:*'
          ],
          resources: ['*']
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'route53:*'
          ],
          resources: ['*']
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'acm:*'
          ],
          resources: ['*']
        })
      ]
    });

    /**
     * This is default CodeBuild policy
     * We just create it here, so we can attach it to our custom  IAM role
     */
    const codebuildPolicy = new iam.ManagedPolicy(this, 'CodeBuildPolicy', {
      statements: [  
        new iam.PolicyStatement({
            actions: [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            resources: ['*'],
            effect: iam.Effect.ALLOW
        }),
        new iam.PolicyStatement({
          actions: [
                "codebuild:CreateReportGroup",
                "codebuild:CreateReport",
                "codebuild:UpdateReport",
                "codebuild:BatchPutTestCases",
                "codebuild:BatchPutCodeCoverages"
            ],
            resources: ['*'],
            effect: iam.Effect.ALLOW
        }),
        new iam.PolicyStatement({
          actions: [
                "s3:GetObject*",
                "s3:GetBucket*",
                "s3:List*",
                "s3:DeleteObject*",
                "s3:PutObject",
                "s3:Abort*"
            ],
            resources: ['*'],
            effect: iam.Effect.ALLOW
        }),
        new iam.PolicyStatement({
          actions: [
                "kms:Decrypt",
                "kms:DescribeKey",
                "kms:Encrypt",
                "kms:ReEncrypt*",
                "kms:GenerateDataKey*"
            ],
            resources: ['*'],
            effect: iam.Effect.ALLOW
        }),
        new iam.PolicyStatement({
          actions: [
                "kms:Decrypt",
                "kms:Encrypt",
                "kms:ReEncrypt*",
                "kms:GenerateDataKey*"
            ],
            resources: ['*'],
            effect: iam.Effect.ALLOW
        })
      ]
    });

    /***
     * IAM Role for deploying Serverless Next JS app
     */
    const serverlessRole = new iam.Role(this, 'CodeBuildServerlessRole', {
      assumedBy: new iam.ServicePrincipal('codebuild.amazonaws.com'),
      managedPolicies: [
        serverlessPolicy,
        codebuildPolicy
      ]
    });

    /**
       * Deployment bucket
       * 
       * Serverless deployments create duplicate CloudFront distributions and 
       * fail on subsequent deployments due to CNAME records already existing in Route53
       * unless the content of the .serverless folder is synced from the previous deployment
       * as described here: https://github.com/serverless-nextjs/serverless-next.js/issues/328#issuecomment-608626599
       */

    const deploymentBucket = new s3.Bucket(this, "DeploymentBucket", {
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    new cdk.CfnOutput(this, 'DeploymentBucketOutput', {
      exportName: 'FrontendDeploymentBucket',
      value: deploymentBucket.bucketName
    });

    /**
     * Will build and deploy Serverless NextJS app
     * Note, that usually deployment happens at the Deploy stage, 
     * but Serverless has it's own way of deploying to AWS (not with CloudFormation),
     * and changing it will take us to the weeds where we don't want to go.
     * So building and deploying with native Serverless method makes more sense. 
     */
    const frontendBuild = new codebuild.PipelineProject(this, 'FrontendBuild', {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: [
              'npm install',
              'npm install -g serverless --unsafe-perm=true'
            ],
          },
          build: {
            commands: [
              `aws s3 sync s3://${deploymentBucket.bucketName}/.serverless .serverless --delete`,
              'serverless',
              `aws s3 sync .serverless s3://${deploymentBucket.bucketName}/.serverless --delete`
            ],
          },
        },
        artifacts: {
          'base-directory': '.serverless',
          files: [
            
          ],
        },
      }),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_4_0,
      },
      role: serverlessRole
    });
    

    /**
     * Frontend Outputs
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
              actionName: 'Build-Deploy',
              project: frontendBuild,
              input: sourceOutput,
              outputs: [buildOutput]
            })
          ],
        }
      ],
    });

    /**
     * This allows CodePipeline to assume our custom IAM role for Serverless
     */
    serverlessRole.assumeRolePolicy?.addStatements(
      new iam.PolicyStatement(
        {
          effect: iam.Effect.ALLOW,
          actions: ['sts:AssumeRole'],
          principals: [pipeline.role]
        }
      )
    );
  }
}
