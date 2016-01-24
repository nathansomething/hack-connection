var dbInterface = require('./dbInterface');

var dbConnection = dbInterface.defaultConnection();
// connection.connect();

console.log(dbInterface.getAttributeValues(dbConnection, 'email'));
console.log(dbInterface.getPersonAttribute(dbConnection, 'Bruce Wayne', 'email'));
console.log(dbInterface.addPerson(dbConnection, 'John Deere', 'weed@wha.ck', 7605555555, 'grass',
      {'frontend': true, 'backend': true, 'machineLearn': true}, {'java': true}));

// console.log(emails);
dbConnection.end();
