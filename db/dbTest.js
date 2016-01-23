var dbInterface = require('./dbInterface');

var connection = dbInterface.defaultConnection();
// connection.connect();

var batman_idea = dbInterface.getPersonAttribute(connection, 'Bruce Wayne', 'email');
var emails = dbInterface.getAttributeValues(connection, 'email');

// console.log(emails);
connection.end();
