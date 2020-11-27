const Request = require('tedious').Request
const connection = require('./connection')

function executeStatement(field, table, where) {

  return new Promise((resolve, reject) => {

    let querySQL = `SELECT ${field} FROM ${table}`

    if (where) {
      querySQL += ` WHERE ${where}`
    }

    querySQL += ` FOR JSON AUTO`

    let request = new Request(querySQL, function (err) {
      if (err) {
        reject(err)
      }
    })
    let result = ''
    request.on('row', (columns) => {
      columns.forEach((column) => {
        if (column.value === null) {
          console.log('VALUE NULL')
        } else {
          result += column.value + ' '
        }
      })
      resolve(result)
    })
    connection.execSql(request)
  })
}

module.exports = executeStatement
