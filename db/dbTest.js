var dbInterface = require('./dbInterface');

var connection = dbInterface.defaultConnection();
// connection.connect();

console.log(dbInterface.getAttributeValues(connection, 'email'));
console.log(dbInterface.getPersonAttribute(connection, 'Bruce Wayne', 'email'));

// console.log(emails);
connection.end();
