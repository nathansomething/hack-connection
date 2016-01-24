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

// Adds a new person with the given attributes to the database
exports.addPerson = function(fullname, email, phone, idea, interests, languages) {
  // TODO
}

// Adds a connection between the 2 given people
exports.addConnection = function(person1, person2) {
  // TODO
}

exports.defaultConnection = function() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'hack',
    password: fs.readFileSync('./pw.txt').toString().trim(),
    database: 'HackATeam'
  });
}

