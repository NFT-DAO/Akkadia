# Akkadia AWS Infrastructure 

## Prerequisites 
_Note: This instructions have been tested on MacOs Catalina v10.15.7_

Check if Node is already installed:
```
$ node -v
$ npm -v
```
if not:
```
$ brew install node
```
If brew is not installed:
```
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### AWS CDK
Check if AWS CDK is already installed:
```
$ cdk --version
```
If not:
```
$ npm install -g aws-cdk
```

#### AWS CLI
Check if AWS CLI is already installed: 
```
$ aws --version
```
If not:
```
$ curl https://awscli.amazonaws.com/AWSCLIV2.pkg -o /tmp/AWSCLIV2.pkg
$ sudo installer -pkg /tmp/AWSCLIV2.pkg -target /
$ rm /tmp/AWSCLIV2.pkg
```

#### JQ
Check if JQ is installed:
```
$ jq --version
```
If, not:
```
$ brew install jq
```

#### Session Manager Plugin
You need this for being able to connect to resources launched in private subnets

```
$ curl https://s3.amazonaws.com/session-manager-downloads/plugin/latest/mac/sessionmanager-bundle.zip -o /tmp/sessionmanager-bundle.zip
$ unzip /tmp/sessionmanager-bundle.zip -d /tmp
$ sudo /tmp/sessionmanager-bundle/install -i /usr/local/sessionmanagerplugin -b /usr/local/bin/session-manager-plugin
$ rm -rf /tmp/sessionmanager*
```

#### Configure AWS profile
Read [this doc](https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html) to understand how to create and admin account with AWS access keys. Here is the gist:
* Don't use your root credentials for accessing AWS Console
    * Even if you don't use it, secure it with MFA
* Create non-root admin account and configure it with MFA
    * Create AWS acces keys for this account and download them into a secure place. Never share them with anyone and periodically rotate. 
* Use an app with MFA features, such as 1Password to store your credentials. Look for documentation how to configure MFA 1-time codes. 
* For added security you can create non-admin account with a policy only sufficient for launching the stacks and resources in this guide

Configure AWS profile, by following the steps in this command. Choose region closest to you from the [list of AWS regions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions), and use `json` for the default output format, unless you prefer something else. 
```
$ aws configure --profile <your-profile-name>
```
Give some cool name to your AWS profile

_Note: Though it's possible to create an AWS profile without specifying the profile name, it's not recommended, since you might have more than one AWS account and it's better always knowing which one is set as a default_

Set your AWS profile as default in your shell config
```
$ echo "export AWS_PROFILE=<your-profile-name>" >> ~/.zshrc
$ source ~/.zshrc
```
If your shell is not ZSH, then use `.bash_profile` for Bash, or whatever it is for something else you might have.


The `cdk.json` file tells the CDK Toolkit how to execute your app.

## CI/CD Pipeline
CI/CD pipeline is set up using [this doc](https://docs.aws.amazon.com/cdk/latest/guide/codepipeline_example.html) and this [Medium post](https://medium.com/swlh/github-codepipeline-with-aws-cdk-and-typescript-d37183463302) 

## Creating GitHub OAuth token
Use [this doc](https://cloudaffaire.com/how-to-trigger-a-codebuild-build-using-github-webhook/) to create your GitHub Hook

## GitHub environment variables
Set the following GitHub environment variable
```
export GITHUB_TOKEN=personal-authentication-token
```

## Installing Packages
```
$ npm install
```

## Deploying Pipelines
```
$ cdk bootstrap
$ cdk deploy InfrastructurePipelineStack
$ cdk deploy FrontendPipelineStack
$ cdk deploy CardanoBinariesPipelineStack
```

## Deleting Pipelines
```
$ cdk destroy InfrastructurePipelineStack
$ cdk destroy FrontendPipelineStack
$ cdk destroy CardanoBinariesPipelineStack
```

## Connecting to bastion host
Bastion host instance allows connecting to resources in private subnet, such as RDS
To connect to bastion, use:
```
$ bin/connect bastion
```

## Monitoring cardano node
```
[local $] bin/connect cardano-node

[cardano-node $] sudo su cardano
[cardano-node $] /cardano/glive-view/glive-view.sh
``` 

## Testing connection to cardano node from bastion
```
[local $] bin/connect bastion

[bastion $] nc -z -v cardano-node.akkadia.internal 3001 
Connection to cardano-node.akkadia.internal 3001 port [tcp/*] succeeded!

```


## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
