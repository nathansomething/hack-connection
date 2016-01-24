var StringBuilder = require('stringbuilder');
var fs = require('fs');
var mysql = require('mysql');

exports.getPersonAttribute = function(dbConnection, email, attribute) {
  var sb = new StringBuilder();

  sb.append('SELECT ');
  sb.append(attribute);
  sb.append(' FROM people WHERE email = \'');
  sb.append(email);
  sb.append('\';');

  var toReturn = undefined;

  sb.build(function(err, result) {
    console.log("Query: " + result);
    dbConnection.query(result, function(err, rows) {
      toReturn = rows[0];
      console.log(rows.sql);
    });
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
    dbConnection.query(result, function(err, rows) {
      toReturn = rows;
      console.log(rows.sql);
    });
  });

  return toReturn;
}

// Adds a new person with the given attributes to the database
exports.addPerson = function(dbConnection, fullname, email, phone, idea, interests, languages) {
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
        console.log(i + ": " + interests[i]);
        appendTo(insert, values, interests[i]);
      }

      for (var i in languages) {
        console.log(i + ": " + languages[i]);
        appendTo(insert, values, interests[i]);
      }

      insert.append(')');
      values.append(');');

      var insert_s = undefined;
      var values_s = undefined;

      insert.build(function(err, result) {
        console.log("Insert: ", result);
          insert_s = result;
        });

      values.build(function(err, result) {
        console.log("Values: ", result);
          values_s = result;
        });

      var result = insert_s + values_s;

      dbConnection.query(result, function(err, rows) {
        return rows.sql;
      });
}

function appendTo(insert, values, i) {
  insert.append(', `');
  insert.append(i);
  insert.append('`');
  values.append(', ');
  values.append(i);
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
    console.log("Query: " + result);
    dbConnection.query(result, function (err, out) {
      return out;
    });
  });
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

