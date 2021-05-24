import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as kms from '@aws-cdk/aws-kms';
import * as rds from '@aws-cdk/aws-rds';
import * as sm from '@aws-cdk/aws-secretsmanager';


export interface RdsStackProps extends cdk.StackProps {
    readonly vpc: ec2.Vpc;
    readonly instanceType: string;
    readonly allocatedStorage: number;
    readonly backupRetentionDays: cdk.Duration;
    readonly masterUserName: string;
    readonly dbName: string;
    readonly port: number;
}

export class RdsStack extends cdk.Stack {


  constructor(scope: cdk.Construct, id: string, props: RdsStackProps) {
    
    super(scope, id, props);

    /**
     * RDS (PostgreSQL)
     */

    const masterSecret = new sm.Secret(this, 'RdsMasterSecret', {
      generateSecretString: {
        excludeCharacters: '"@/\\',
        excludePunctuation: true,
        generateStringKey: 'password',
        passwordLength: 30,
        secretStringTemplate: `{ "username": "${props.masterUserName}" }`
      }
    });

    const key = new kms.Key(this, 'KmsKey', {
        enableKeyRotation: true,
        removalPolicy: cdk.RemovalPolicy.RETAIN
    });

    const rdsSecurityGroup = new ec2.SecurityGroup(this, 'RdsSecurityGroup', {
        vpc: props.vpc,
        allowAllOutbound: true
    });

    rdsSecurityGroup.addIngressRule(ec2.Peer.ipv4(props.vpc.vpcCidrBlock), ec2.Port.tcp(props.port), 'RDS');

    const paramGroup = new rds.ParameterGroup(this, 'RdsParameterGroup', {
        engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_12_3 }),
        parameters: {
            'ssl': '1',
            'rds.force_ssl': '1'
        }
    });

    new rds.DatabaseInstance(this, 'RdsDbInstance', {
      engine: rds.DatabaseInstanceEngine.postgres({version: rds.PostgresEngineVersion.VER_12_3}),
      instanceType: new ec2.InstanceType(props.instanceType),
      vpc: props.vpc,
      vpcPlacement: { subnetType: ec2.SubnetType.PRIVATE },
      storageEncrypted: true,
      storageEncryptionKey: key,
      multiAz: true,
      autoMinorVersionUpgrade: false,
      parameterGroup: paramGroup,
      allocatedStorage: props.allocatedStorage,
      storageType: rds.StorageType.GP2,
      backupRetention: props.backupRetentionDays,
      deletionProtection: false,
      credentials: rds.Credentials.fromSecret(masterSecret),
      databaseName: props.dbName,
      port: props.port,
      securityGroups: [rdsSecurityGroup]
    }); 
  }
}
