var db_interface = require('./db_interface');

var db = db_interface.constructor();
console.log(db.get_all_people());
