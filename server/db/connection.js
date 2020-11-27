const Connection = require('tedious').Connection;
const config = {
  server: '192.168.31.137',
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: 'saadmin'
    }
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    encrypt: false,
    database: 'Phone',
    validateBulkLoadParameters: true
  }
}


const connection = new Connection(config);
if (connection.state === connection.STATE.INITIALIZED) {
  connection.connect();
}

module.exports = connection

