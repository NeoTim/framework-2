
var express = require('express')
  , http = require('http')
;

var app = express();



app.configure(function() {
    app.set('port', process.env.PORT || 3333)
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(app.router);
    app.use(express.static(__dirname + "/dist"));
});

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});

// var databaseUrl = "square"; // "username:password@example.com/mydb"
// var collections = ["users", "reports"]
// var db = require("mongojs").connect(databaseUrl, collections);

// db.users.find({sex: "female"}, function(err, users) {
//   if( err || !users) console.log("No female users found");
//   else users.forEach( function(femaleUser) {
//     console.log(femaleUser);
//   } );
// });