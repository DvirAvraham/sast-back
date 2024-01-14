const Client = require('ssh2').Client;

module.exports = {
    executeCommand
  }

const connectionOptions = {
  host: '16.171.254.158',
  port: 22,
  username: 'ec2-user', 
  privateKey: require('fs').readFileSync('EC2 Test.pem'),
};

const commandToExecute = 'pwd'; // Replace with your desired command

function executeCommand() {
    return new Promise((resolve, reject) => {
      const conn = new Client();
  
      conn.on('ready', () => {
        conn.exec(commandToExecute, (err, stream) => {
          if (err) reject(err);
  
          let data = '';
  
          stream
            .on('close', (code, signal) => {
              conn.end();
              resolve(data);
            })
            .on('data', (chunk) => {
              data += chunk;
            })
            .stderr.on('data', (stderrData) => {
              console.error('STDERR: ' + stderrData);
              reject(stderrData);
            });
        });
      });
  
      conn.on('error', (err) => {
        console.error('Error connecting to SSH:', err);
        reject(err);
      });
  
      conn.connect(connectionOptions);
    });
  }


