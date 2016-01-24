var StringBuilder = require('stringbuilder');
var fs = require('fs');
var mysql = require('mysql');

exports.getPersonAttribute = function(dbConnection, value, attribute, callback) {
  var sb = new StringBuilder();

  sb.append('SELECT * FROM `People` WHERE `');
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
  sb.append(' FROM People;');

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

exports.getPerson = function(dbPool, email, callback) {
  return exports.getPersonAttribute(dbPool, email, 'email', function(err, rows) {
    return {
    'email': email,
      'fullname': rows.fullname,
      'phone': rows.phone
    };
  });
}

exports.getAllPeople = function (dbPool, callback) {
return exports.getAttributeValues(dbPool, 'email', function(err, rows) {
    console.log("\nEMAILS");
    console.error(err);
    console.log(rows);
    
    return rows.map(function(currentValue, index, array) {
      console.log(currentValue.email);
      var result = exports.getPerson(dbPool, currentValue.email, function(err, result) {
        console.log(result);
        return result;
      });
    });
  });
}

// Adds a match between the 2 given people
exports.addMatch = function(dbPool, name, matchName, matchRank, callback) {
  var sb = new StringBuilder();

  sb.append('INSERT INTO Matches VALUES (');
      sb.append(name);
      sb.append(', ');
      sb.append(matchName);
      sb.append(', ');
      sb.append(matchRank);
      sb.append(');');

  var toReturn = undefined;

  return insert.build(function(err, result) {
    if (err) throw err;
    // console.log("Query: " + result);
    console.log(dbConnection.threadId);
    dbPool.query(result, callback);
  });
}

exports.getMatches = function(dbPool, name, callback) {
  var sb = new StringBuilder();

  sb.append('SELECT * FROM Matches WHERE name = ');
  sb.append(pname);
  sb.append(';');

  return insert.build(function(err, result) {
    if (err) throw err;
    // console.log("Query: " + result);
    console.log(dbConnection.threadId);
    return dbConnection.query(result, callback);
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

