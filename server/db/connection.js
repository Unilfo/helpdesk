const Connection = require('tedious').Connection;
const config = {
  server: '192.168.3.134',
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
    database: 'test',
    validateBulkLoadParameters: true
  }
}


const connection = new Connection(config);
if (connection.state === connection.STATE.INITIALIZED) {
  connection.connect();
}
connection.on('connect', function(err) {
  console.log("Connected");
  executeStatement1();
});

const Request = require('tedious').Request

function executeStatement1() {
  let request = new Request("SELECT * FROM TEST", function(err) {
    if (err) {
      console.log(err);}
  });
  request.on('row', function(columns) {
    columns.forEach(function(column) {
      if (column.value === null) {
        console.log('NULL');
      } else {
        console.log(column.value);
      }
    });
  });
  connection.execSql(request);
}
