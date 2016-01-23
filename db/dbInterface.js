var StringBuilder = require('stringbuilder');
var fs = require('fs');
var mysql = require('mysql');

exports.getPersonAttribute = function(connection, fullname, attribute) {
  var sb = new StringBuilder();

  sb.append('SELECT ');
  sb.append(attribute);
  sb.append(' FROM people where fullname = \'');
  sb.append(fullname);
  sb.append('\';');

  sb.build(function(err, result) {
    console.log("Result: " + result);
  };

  console.log("Query: " + sb.build());
  
  var result = connection.query(sb.toString());
  
  return result;
}

exports.getAttributeValues = function(connection, attribute) {
  var sb = new StringBuilder();

  sb.append('SELECT ');
  sb.append(attribute);
  sb.append(' FROM people;');
  
  var result = connection.query(sb.toString());
  
  return result;
}

exports.defaultConnection = function() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'hack',
    password: fs.readFileSync('./pw.txt').toString().trim(),
    database: 'HackATeam'
  });
}
