var StringBuilder = require('stringbuilder');
var fs = require('fs');
var mysql = require('mysql');

exports.getPersonAttribute = function(dbConnection, value, attribute, callback) {
  var sb = new StringBuilder();

  sb.append('SELECT * FROM `people` WHERE `');
  sb.append(attribute);
  sb.append('` = "');
  sb.append(value);
  sb.append('";');

  var toReturn = undefined;

  return sb.build(function(err, result) {
    // console.log("Query: " + result);
    return dbConnection.query(result, callback);
  });
}

exports.getAttributeValues = function(dbConnection, attribute, callback) {
  var sb = new StringBuilder();

  sb.append('SELECT ');
  sb.append(attribute);
  sb.append(' FROM people;');

  var toReturn = undefined;

  return sb.build(function(err, result) {
    // console.log("Query: " + result);
    return dbConnection.query(result, callback);
  });
}

// Adds a new person with the given attributes to the database
exports.addPerson = function(dbConnection, fullname, email, phone, idea, interests, languages, callback) {
  var insert = new StringBuilder();
  var values = new StringBuilder();

  insert.append('INSERT INTO People ( `fullname`, `email`, `phone`, `idea`');
      values.append(' VALUES (');
      values.append(fullname);
      values.append(', ');
      values.append(email);
      values.append(', ');
      values.append(phone);
      values.append(', ');
      values.append(idea);

      for (var i in interests) {
        // console.log(i + ": " + interests[i]);
        appendTo(insert, values, interests[i]);
      }

      for (var l in languages) {
        // console.log(i + ": " + languages[l]);
        appendTo(insert, values, languages[l]);
      }

      insert.append(')');
      values.append(');');

      var insert_s = "";
      var values_s = "";

      insert.build(function(err, result) {
        // console.log("Insert: ", result);
          insert_s = result;
        });

      values.build(function(err, result) {
        // console.log("Values: ", result);
          values_s = result;
        });

      var result = insert_s + values_s;

      return dbConnection.query(result, callback);
}

function appendTo(insert, values, item) {
  insert.append(', `');
  insert.append(item);
  insert.append('`');
  values.append(', ');
  values.append(item);
}

exports.getPerson = function(dbConnection, email) {
  return {
    'fullname': getPersonAttribute(dbConnection, email, 'fullname'),
    'email': email,
    'phone': getPersonAttribute(dbConnection, email, 'phone')
  };
}

// Adds a match between the 2 given people
exports.addMatch = function(name, matchName, matchRank) {
  var sb = new StringBuilder();

  sb.append('INSERT INTO Matches VALUES (');
      sb.append(name);
      sb.append(', ');
      sb.append(matchName);
      sb.append(', ');
      sb.append(matchRank);
      sb.append(');');

  var toReturn = undefined;

  insert.build(function(err, result) {
    if (err) throw err;
    // console.log("Query: " + result);
    console.log(dbConnection.threadId);
    dbConnection.query(result, function (err, out) {
      return out;
    });
  });
}

exports.defaultPool = function() {
  return mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
         user: 'hack',
         password: fs.readFileSync('./db/pw.txt').toString().trim(),
         database: 'hackateam'
  });
}

