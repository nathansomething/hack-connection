var dbInterface = require('./dbInterface');

var dbPool = dbInterface.defaultPool();
dbPool.getConnection(function(err) {
  console.error(err)
});

dbPool.query('SELECT 1', function(err, rows) {
  console.log(rows);
});

var emails = dbInterface.getAttributeValues(dbPool, 'email', function(err, rows) {
  console.log('\nEMAILS');
  console.error(err);
  console.log(rows);
});

var bruce = dbInterface.getPersonAttribute(dbPool, 'bruce@notbatman.edu', 'email', function(err, rows, cells) {
  console.log('\nBRUCE');
  console.error(err);
  console.log(rows);
});

var deere = dbInterface.addPerson(dbPool, 'John Deere', 'weed@wha.ck', 7605555555, 'grass', {'frontend': true, 'backend': true, 'machineLearn': true}, {'java': true}, function(err, rows) {
  console.log('\nDEERE');
  console.error(err);
  console.log(rows);
});

