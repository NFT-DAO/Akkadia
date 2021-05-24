import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');
import iam = require('@aws-cdk/aws-iam');
import asc = require('@aws-cdk/aws-autoscaling');
import r53 = require('@aws-cdk/aws-route53');
import s3 = require('@aws-cdk/aws-s3');
import elb = require('@aws-cdk/aws-elasticloadbalancingv2');

import * as bootstrap from './cardano-node-bootstrap';


export interface CardanoNodeStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
  binariesBucketName: string;
  config: {[key: string]: string};
  internalHostedZoneId: string;
  internalHostedZoneName: string;
};

export class CardanoNodeStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props: CardanoNodeStackProps) {

    super(scope, id, props);

    /** 
     * Instance Role
    */
      
    const instanceRolePolicy = new iam.ManagedPolicy(this, 'InstanceRolePolicy', {
      statements: [
          new iam.PolicyStatement( {
              effect: iam.Effect.ALLOW,
              resources: [ 
                  `arn:aws:s3:::${props.binariesBucketName}/*`
              ] ,
              actions: [ 
                's3:GetObject'
              ]
          })
      ]
    });

    const instanceRole = new iam.Role(this, 'InstanceRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'),
        instanceRolePolicy
      ]
    });


    /**
     * Security Group
     */

    const sg = new ec2.SecurityGroup(this, 'SG', {
        vpc: props.vpc,
        allowAllOutbound: true
    });

    sg.addIngressRule(
        ec2.Peer.ipv4(props.vpc.vpcCidrBlock), 
        ec2.Port.tcp(+props.config['port'])
    );

    /**
     * Bootstrap Script (User Data)
     */

    const userData = ec2.UserData.forLinux();
    userData.addCommands(
        ...bootstrap.attachDataDrive(), 
        ...bootstrap.buildLibsodium(props.config['libsodiumCommit']),
        ...bootstrap.downloadCompiledCardanoBinaries(props.binariesBucketName, props.config['release'], props.config['snapshotId']),
        ...bootstrap.downloadConfiguration(props.config['network'], props.config['snapshotId']),
        ...bootstrap.createCardanoUser(),
        ...bootstrap.createStartupScript(props.config['network'], +props.config['port']),
        ...bootstrap.installGLiveView(props.config['network']),
        ...bootstrap.startNode(props.config['autostart'] == 'true')
    );

    /**
     * Auto Scaling Group
     */
    
    const asg = new asc.AutoScalingGroup(this, 'ASG', {
        vpc: props.vpc,
        vpcSubnets: {
            subnets: props.vpc.privateSubnets.slice(0,2)
        },
        instanceType: new ec2.InstanceType(props.config['instanceType']),
        machineImage: new ec2.AmazonLinuxImage({
            generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
            cpuType: ec2.AmazonLinuxCpuType.X86_64
        }),
        blockDevices: [{
            deviceName: '/dev/sdb', 
            volume: props.config['snapshotId'] 
                ? { ebsDevice: { snapshotId: props.config['snapshotId']} } 
                : asc.BlockDeviceVolume.ebs(+props.config['dataVolumeSizeGb'])
        }],
        minCapacity: 1,
        role: instanceRole,
        userData: userData,
        securityGroup: sg
    });

    cdk.Tags.of(asg).add('configuration', 'cardano-node');
    cdk.Tags.of(asg).add('network', props.config['network']);

    /**
     * Network Load Balancer
     */

    const nlb = new elb.NetworkLoadBalancer(this, 'NLB', {
        vpc: props.vpc,
        internetFacing: false
    });

    const listener = nlb.addListener('Listener', {
        port: +props.config['port'],
    });

    listener.addTargets('Fleet', {
        port: +props.config['port'],
        targets: [asg]
    });

    /**
     * Domain Record
     */

    const hostedZone = r53.HostedZone.fromHostedZoneAttributes(this, 'InternalHostedZone', {
        hostedZoneId: props.internalHostedZoneId,
        zoneName: props.internalHostedZoneName
    
    });
  
    new r53.CnameRecord(this, `NlbCnameRecord`, {
        zone: hostedZone,
        recordName: 'cardano-node',
        domainName: nlb.loadBalancerDnsName
    });

  }
}