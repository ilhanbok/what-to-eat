// Import necessary modules
const mongoDB = require('mongodb'),
      express = require('express'),
      app = express();

// Which port to run mongoDB on localhost
const PORT = 5000;
const mongoURL = 'mongodb://localhost';

var db = null, // Entire database
    ut = null, // User info table
    rt = null; // Restaurant table

//var yt = null; // Yelp data table

// Record when DB is properly initialized
var isInitialized = false;

// Record if server was able to load restaurant data
var isLoaded = false;

// Start up MongoDB server and tables
const initdb = function(callback) {
  mongoDB.connect(mongoURL, function(err, conn) {
    if (err) {
      callback(err);
    } else {
      db = conn;
      ut = db.collection('users');
      rt = db.collection('rests');
      isInitialized = true;
    }
  }, { useUnifiedTopology : true });
}

// Start server
app.listen(PORT);
console.log('Server running on port %s', PORT);

// Start database
if (!db) {
  initdb(function(err) {
    console.error(err);
  });
}
