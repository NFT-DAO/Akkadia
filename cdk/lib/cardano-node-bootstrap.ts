import cdk = require('@aws-cdk/core');

export function attachDataDrive(): Array<string> {
    
    return [
        'mkfs -t xfs /dev/sdb',
        'mkdir /cardano',
        'mount /dev/sdb /cardano',
        'cp /etc/fstab /etc/fstab.orig',
        'echo "UUID=$(sudo blkid -o value -s UUID /dev/sdb)  /cardano  xfs  defaults,nofail  0  2" >> /etc/fstab',
    ]
};

export function buildLibsodium(commit: string): Array<string> {
    
    return [
        'yum install git libtool -y',
        'cd /cardano',
        'export LD_LIBRARY_PATH="/usr/local/lib:$LD_LIBRARY_PATH"',
        'export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:$PKG_CONFIG_PATH"',
        'git clone https://github.com/input-output-hk/libsodium',
        'cd libsodium',
        `git checkout ${commit}`,
        './autogen.sh',
        './configure',
        'make',
        'make install',
        'cd ..',
    ]
}

export function buildCardanoNodeBinaries (
    s3BucketArn: string,
    config: {[key: string]: string},
    downloads:  {[key:string]:{[key: string]: string}}
    ): Array<string> {

    const s3Path = `s3://${s3BucketArn.split(':').slice(-1)[0]}/bin/${config['cardanoNodeRelease']}/`;

    function file(url: string): string {
        return url.split('/').pop() || ''
    }
    
    return [
        // install dev libs and compilers
        'yum update -y',
        'yum install git gcc gcc-c++ tmux gmp-devel make tar wget nmap -y',
        'yum install zlib-devel libtool autoconf -y',
        'yum install systemd-devel ncurses-devel ncurses-compat-libs -y',

        // install Cabal
        'cd ~',
        
        `wget ${config['cabalRelease']}`,
        `tar -xf ${file(config['cabalRelease'])}`,
        'mv cabal /usr/local/bin',
        'export PATH=/usr/local/bin:$PATH',
        'cabal update',

        // install GHC
        'cd /cardano',
        `wget ${downloads['ghc'][config['ghcRelease']]}`,
        `tar -xf ${file(downloads['ghc'][config['ghcRelease']])}`,
        `rm -f ${file(downloads['ghc'][config['ghcRelease']])}`,
        `cd ghc-${config['ghcRelease']}`,
        './configure',
        'make install',
        'cd ..',

        ...buildLibsodium(config.libsodiumCommit),

        // build Cardano node
        'git clone https://github.com/input-output-hk/cardano-node.git',
        'cd cardano-node',
        'git fetch --all --recurse-submodules --tags',
        `git checkout tags/${config.cardanoNodeRelease}`,
        `cabal configure -O0 -w ghc-${config.ghcRelease}`,
        'echo -e "package cardano-crypto-praos\\n flags: -external-libsodium-vrf" > cabal.project.local',
        'export HOME="/root"',
        'sed -i $HOME/.cabal/config -e "s/overwrite-policy:/overwrite-policy: always/g"',
        'cabal clean',
        'cabal update',
        'cabal build cardano-cli cardano-node',
        'cd ..',

        // copy binaries to S3 bucket
        `aws s3 cp cardano-node/dist-newstyle/build/x86_64-linux/ghc-${config.ghcRelease}/cardano-node-${config.cardanoNodeRelease}/x/cardano-node/build/cardano-node/cardano-node ${s3Path}`,
        `aws s3 cp cardano-node/dist-newstyle/build/x86_64-linux/ghc-${config.ghcRelease}/cardano-cli-${config.cardanoNodeRelease}/x/cardano-cli/build/cardano-cli/cardano-cli ${s3Path}`,
    ]
} 

export function stopInstance(region: string, stop?: boolean): Array<string> {
    return stop ?
    [
        'instance_id=`curl http://169.254.169.254/latest/meta-data/instance-id`',
        `aws ec2 stop-instances --instance-ids \${instance_id} --region ${region}`
    ] :
    [
        'echo "Stop the instance manually to avoid unnecessary expense"'
    ]
}

export function downloadOfficialCardanoBinaries(): Array<string> {
    return [
        'yum install tar wget -y',
        'wget -O /tmp/cardano-node.tar.gz https://hydra.iohk.io/job/Cardano/cardano-node/cardano-node-linux/latest/download-by-type/file/binary-dist',
        'mkdir -p /tmp/cardano',
        'tar -xzvf /tmp/cardano-node.tar.gz -C /tmp/cardano',
        'mkdir -p /cardano/bin',
        'cp /tmp/cardano/cardano-* /cardano/bin'
    ]
}

export function downloadCompiledCardanoBinaries(s3BucketName: string, release: string, snapshotId?: string): Array<string> {

    const s3Path = `s3://${s3BucketName}`;

    return snapshotId 
    ? [`echo "Using binaries from snapshot ${snapshotId}"`]
    : [
        'mkdir -p /cardano/bin',
        `aws s3 cp ${s3Path}/cardano-node /cardano/bin/`,
        `aws s3 cp ${s3Path}/cardano-cli /cardano/bin/`,
        'chmod +x /cardano/bin/cardano-node /cardano/bin/cardano-cli'
    ]
}

export function downloadConfiguration(network: string, snapshotId?: string): Array<string> {
    
    return snapshotId 
    ? [`echo "Using configuration from snapshot ${snapshotId}"`]
    : [
        `mkdir /cardano/config/${network}`,
        ...[
            'config',
            'shelley-genesis',
            'byron-genesis',
            'topology'
        ].map(
            (k: string) => { return `wget -P /cardano/config/${network} https://hydra.iohk.io/job/Cardano/cardano-node/cardano-deployment/latest-finished/download/1/${network}-${k}.json`}
        ),
        `sed -i /cardano/config/${network}/${network}-config.json -e "s/TraceBlockFetchDecisions\\": false/TraceBlockFetchDecisions\\": true/g"`,
    ]
}

export function createCardanoUser(): Array<string> {

    return [
        'useradd -m cardano',
        'sudo chown -R cardano /cardano',
        'echo "export LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH" >> /home/cardano/.bashrc',
        'echo "export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig:$PKG_CONFIG_PATH" >> /home/cardano/.bashrc',
        'echo "export PATH=/cardano/bin:$PATH" >> /home/cardano/.bashrc',
        'echo "export CARDANO_NODE_SOCKET_PATH=/cardano/db/node.socket" >> /home/cardano/.bashrc',
    ]
}

export function createStartupScript(network: string, port: number): Array<string> {

    return [
       `cat > /cardano/bin/start-node.sh << EOF 
#!/bin/bash
/cardano/bin/cardano-node run \\
    --topology /cardano/config/${network}/${network}-topology.json \\
    --database-path /cardano/db \\
    --socket-path /cardano/db/node.socket \\
    --host-addr 0.0.0.0 \\
    --port ${port} \\
    --config /cardano/config/${network}/${network}-config.json
EOF`,
        'chmod +x /cardano/bin/start-node.sh',
        `cat > /tmp/cardano-node.service << EOF 
# The Cardano node service (part of systemd)
# file: /etc/systemd/system/cardano-node.service 
[Unit]
Description = Cardano node service
Wants = network-online.target
After = network-online.target 

[Service]
User = cardano
Environment = "LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH"
Environment = "PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:$PKG_CONFIG_PATH"
Type = simple
WorkingDirectory = /cardano/bin
ExecStart = /bin/bash -c '/cardano/bin/start-node.sh'
KillSignal = SIGINT
RestartKillSignal = SIGINT
TimeoutStopSec = 2
LimitNOFILE = 32768
Restart = always
RestartSec = 5

[Install]
WantedBy = multi-user.target
EOF`,
    `cat > /etc/sudoers.d/cardano << EOF 
%cardano ALL= NOPASSWD: /bin/systemctl start cardano-node
%cardano ALL= NOPASSWD: /bin/systemctl stop cardano-node
%cardano ALL= NOPASSWD: /bin/systemctl restart cardano-node
%cardano ALL= NOPASSWD: /bin/systemctl status cardano-node
EOF`,
        'mv /tmp/cardano-node.service /etc/systemd/system/cardano-node.service',
        'chmod 644 /etc/systemd/system/cardano-node.service',
        'systemctl daemon-reload',
        'systemctl enable cardano-node'
    ]
}

export function startNode(autoStart: boolean): Array<string> {
    return autoStart ? 
    [
        'systemctl start cardano-node'
    ] :
    [
        'echo "Start cardano node manually"',
        'echo "sudo systemctl start cardano-node"'
    ]
}

export function installGLiveView(network: string): Array<string> {
    return [
        'yum install jq -y',
        'mkdir -p /cardano/glive-view',
        'curl -s -o /cardano/glive-view/glive-view.sh https://raw.githubusercontent.com/cardano-community/guild-operators/master/scripts/cnode-helper-scripts/gLiveView.sh',
        'curl -s -o /cardano/glive-view/env https://raw.githubusercontent.com/cardano-community/guild-operators/master/scripts/cnode-helper-scripts/env',
        'chmod 755 /cardano/glive-view/glive-view.sh',
        'chown -R cardano /cardano/glive-view',
        `sed -i /cardano/glive-view/env -e "s/\\#CONFIG=\\"\\\${CNODE_HOME}\\/files\\/config.json\\"/CONFIG=\\"\\/cardano\\/config\\/${network}\\/${network}-config.json\\"/g"`,
        `sed -i /cardano/glive-view/env -e "s/\\#SOCKET=\\"\\\${CNODE_HOME}\\/sockets\\/node0.socket\\"/SOCKET=\\"\\/cardano\\/db\\/node.socket\\"/g"`
    ]
}

export function installSimpleLiveView(): Array<string> {
    return [
        'mkdir -p /cardano/simple-live-view',
        'git clone https://github.com/crypto2099/simpleLiveView /cardano/simple-live-view',
        'chown -R cardano /cardano/simple-live-view'
    ]
}
