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

exports.getAttributeValues = function(dbConnection, attribute) {
  var sb = new StringBuilder();

  sb.append('SELECT ');
  sb.append(attribute);
  sb.append(' FROM people;');

  var toReturn = undefined;

  sb.build(function(err, result) {
    console.log("Query: " + result);
    toReturn = dbConnection.query(result);
  });

  return toReturn;
}

// Adds a new person with the given attributes to the database
exports.addPerson = function(dbConnection, fullname, email, phone, idea, interests, languages) {
  var insert = new StringBuilder();
  var values = new StringBuilder();

  insert.append('INSERT INTO people \( \`fullname\`, \`email\`, \`phone\`, \`idea\`');
      values.append('VALUES (');
      values.append(fullname);
      values.append(', ');
      values.append(email);
      values.append(', ');
      values.append(phone);
      values.append(', ');
      values.append(idea);

      for (var i in interests) {
        console.log("i: " + i);
        if (i != undefined) {
          appendTo(insert, values, i);
        }
      }

      for (var i in languages) {
        console.log("i: " + i);
        if (i != undefined) {
          appendTo(insert, values, i);
        }
      }

      insert.append(')');
      values.append(');');

      values.build(function(err, result) {
        console.log("Values: ", result);
        insert.append(result);
      });

      var toReturn = undefined;

      insert.build(function(err, result) {
        console.log("Query: " + result);
        toReturn = dbConnection.query(result);
      });

return toReturn;
}

function appendTo(insert, values, i) {
  insert.append(', `');
  insert.append(i);
  insert.append('`');
  values.append(', ');
  values.append(i);
}

// Adds a match between the 2 given people
exports.addMatch = function(name, matchName, matchRank) {
  var sb = new StringBuilder();
}

exports.defaultConnection = function() {
  return mysql.createConnection({
    host: 'localhost',
         user: 'hack',
         protocol: 'TCP',
         password: fs.readFileSync('./db/pw.txt').toString().trim(),
         database: 'HackATeam'
  });
}

