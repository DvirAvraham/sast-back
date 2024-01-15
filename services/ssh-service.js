const Client = require('ssh2').Client;
require('dotenv').config();


module.exports = {
    executeCommand
  }

const password = process.env.LIN_PASS;
const username = process.env.LIN_USER;

const connectionOptions = {
  host: '172.16.120.139',
  port: 22,
  username, 
  password,
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


