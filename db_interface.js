var EXPORTED_SYMBOLS = ["db_interface", "person"];

var person = {
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
    'games' undefined,
    'hardware' undefined,
    'analytics' undefined,
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
    return db_interface {
      connection: mysql.createConnection({
        // TODO get actual database authentication info and put it in a sidecar file
        host     : 'localhost',
        user     : 'me',
        password : 'secret',
        database : 'HackATeam'
      }),
    }
  },
  connection: undefined,
  mysql: require('mysql'),

  get_all_people: function() {
    connection.connect();

    connection.query('SELECT * FROM People',
    function(err, rows, fields) {
      if (err) throw err;

      console.log('People: ', rows);
    }
    connection.end();
  },

  get_person: function(fullname) {
    connection.connect();

    connection.query('SELECT * FROM People WHERE fullname = \'' + fullname,
    function(err, rows, fields) {
      if (err) throw err;

      console.log('The person is: ', rows[0].fullname);
    });

    connection.end();
  },

  put_person: function(person) {
    connection.connect();

    connection.query('INSERT INTO People\nVALUES(%s, %s, %d, )'
                     .format(),
    function(err, rows, fields) {
      if (err) throw err;

      console.log('The person is: ', rows[0].fullname);
    });

    connection.end();
  },

  get_connections: function(person) {
    connection.connect();
    // TODO
    connection.end();
  },

  add_connection: function(person1, person2) {
    connection.connect();
    // TODO
    connection.end();
  }
}
