var StringBuilder = require('stringbuilder');
var fs = require('fs');
var EXPORTED_SYMBOLS = ["db_interface", "person"];

var person = {
  from_sql(sql_person) {
  },

  fullname: undefined,
  email: undefined,
  phone: undefined,
  idea: undefined,
  interests: {
    'frontend': undefined,
    'backend': undefined,
    'machineLearn': undefined,
    'design': undefined,
    'mobileApps': undefined,
    'games': undefined,
    'hardware': undefined,
    'analytics': undefined,
  },
  languages: {
    'python': undefined,
    'java': undefined,
    'javascript': undefined,
    'HTML_CSS': undefined,
    'C': undefined,
    'Cpp': undefined,
    'Csharp': undefined
  }
}

var db_interface = {
  constructor: function() {
    return {
      connection: mysql.createConnection({
        // TODO get actual database authentication info and put it in a sidecar file
        host     : 'localhost',
        user     : 'hack',
        password : fs.readFileSync('./pw.txt').toString(),
        database : 'HackATeam'
                  }),
      mysql: require('mysql'),

      function get_all_people() {
        connection.connect();

        connection.query('SELECT * FROM people',
            function(err, rows, fields) {
              if (err) throw err;

              console.log('People: ', rows);
            });
        connection.end();
      },

      // Fetch the Person with the given fullname from the database
      function get_person(fullname) {
                    connection.connect();

                    connection.query('SELECT * FROM people WHERE fullname = \'' + fullname,
                        function(err, rows, fields) {
                          if (err) throw err;

                          console.log('The person is: ', rows[0].fullname);
                        });

                    connection.end();
                    return rows[0].fullname;
                  },

      // Add a new person to the database
      function put_person(person) {
                    connection.connect();

                    var sb = new StringBuilder();

                    sb.append('INSERT INTO people VALUES (');
                        sb.append(person.fullname);
                        sb.append(', ');
                        sb.append(person.email);
                        sb.append(', ');
                        sb.append(person.phone);
                        sb.append(', ');
                        sb.append(person.idea);

                        for (var i in person.interests) {
                          sb.append(', ');
                          sb.append(i);
                        }

                        for (var l in person.languages) {
                          sb.append(', ');
                          sb.append(l);
                        }

                        sb.append(');');

                    connection.query(sb.toString());
                    connection.end();
                  },

      function get_connections(person) {
                         var previous_db = connection.database;
                         connection.connect();

                         // TODO

                         connection.end();
                       },

      function add_connection(person1, person2) {
                        var previous_db = connection.database;
                        connection.connect();
                        // TODO
                        connection.end();
                      },

      function perform_in_database(perform, database) {
                             var previous_db = connection.database;

                             connection.changeUser({database: database}, function(err) {
                               if (err) throw err;
                             });

                             connection.connect();
                             perform(connection);
                             connection.end();
                           }
    }
               },
}
