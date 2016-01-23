var StringBuilder = require('stringbuilder');
var fs = require('fs');
var mysql = require('mysql');

exports.getPersonAttribute = function(connection, fullname, attribute) {
  var sb = new StringBuilder();

  sb.append('SELECT ');
  sb.append(attribute);
  sb.append(' FROM people WHERE fullname = \'');
  sb.append(fullname);
  sb.append('\';');

  var toReturn = undefined;

  sb.build(function(err, result) {
    console.log("Query: " + result);
    toReturn = result;
  });
  
  return toReturn;
}

exports.getAttributeValues = function(connection, attribute) {
  var sb = new StringBuilder();

  sb.append('SELECT ');
  sb.append(attribute);
  sb.append(' FROM people;');

  var toReturn = undefined;
  
  sb.build(function(err, result) {
    console.log("Query: " + result);
    toReturn = result;
  });
  
  return toReturn;
}

exports.defaultConnection = function() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'hack',
    password: fs.readFileSync('./pw.txt').toString().trim(),
    database: 'HackATeam'
  });
}
