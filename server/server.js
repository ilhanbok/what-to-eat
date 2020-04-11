/ Import necessary modules
const mongoDB = require('mongodb'),
    express = require('express'),
    app = express();
MongoClient = require('mongodb').MongoClient;

// Which port to run mongoDB on localhost
const PORT = 5000;
const mongoURL = 'mongodb://localhost';

var db = null, // Entire database
    ut = null, // User info table
    rt = null; // Restaurant table
// TODO: need the comment table from yelp data

//var yt = null; // Yelp data table

// Record when DB is properly initialized
var isInitialized = false;

// Record if server was able to load restaurant data
var isLoaded = false;

// Configures and connects the database on server startup,
// returning true and setting isInitialized if successful.
const initdb = function(callback) {
  mongoDB.connect(mongoURL, function(err, conn) {
    if (err) {
      callback(false);
    } else {
      db = conn;
      ut = db.collection('users');
      rt = db.collection('rests');
      isInitialized = true;
      callback(true);
    }
  }, { useUnifiedTopology : true });
}

// Queries the database to determine whether a user with the
// given username exists, returning true if it is the case
// and false otherwise.
const existsUser = function(callback, name) {
  ut.find({ username : name }).toArray(function(err, docs) {
    if (err) {
      callback(err, true); // fail securely
    } else {
      callback(true, docs.length > 0);
    }
  });
}

// Queries the database to retrieve a user’s password
const getPassword = function(callback, name) {
  ut.find({ username : name }).toArray(function(err, docs) {
    if (err) {
      callback(err, ''); // fail securely
    } else if (docs.length == 0) { // Unable to find user
      console.error('getPassword: User to find does not exist');
      callback(true, '');
    } else { // Reluctance to trust
      if (docs.length > 1) {
        console.log('getPassword: Duplicate users found, returning password of first');
      }
      callback(true, docs[0].password);
    }
  });
}

// Looks up and returns a restaurant by its ID.
const lookupRestaurant = function(callback, restaurantId) {
  rt.find({ business_id : restaurantId }).toArray(function(err, docs) {
    if (err) {
      callback(err, null); // fail securely
    } else if (docs.length == 0) {
      console.error('lookupRestaurant: Restaurant to find by ID does not exist');
      callback(true, null);
    } else { // Reluctance to trust
      if (docs.length > 1) {
        console.log('lookupRestaurant: Duplicate restaurants found, returning first');
      }
      callback(true, docs[0]);
    }
  });
}

// Looks up and returns a user by their ID.
const lookupUser = function(callback, userId) {
  ut.find({ id : userId }).toArray(function(err, docs) {
    if (err) {
      callback(err, null); // fail securely
    } else if (docs.length == 0) {
      console.error('lookupUser: User to find by ID does not exist');
      callback(true, null);
    } else { // Reluctance to trust
      if (docs.length > 1) {
        console.log('lookupUser: Duplicaate users found, returning first');
      }
      callback(true, docs[0]);
    }
  });
}

// Looks up and returns the name of a comment by its ID.
const lookupComment = function(callback, commentId) {
  // TODO: How would one implement this? We do not have a Comment class
}

// Search and returns a restaurant by its Name.
const searchRestaurant = function(callback, restaurantName){
  rt.find({ name : restaurantName }).toArray(function(err, docs) {
    if (err) {
      callback(err, null); // fail securely
    } else if (docs.length == 0) {
      console.error('lookupRestaurant: Restaurant to find by Name does not exist');
      callback(true, null);
    } else { // Reluctance to trust
      if (docs.length > 1) {
        console.log('lookupRestaurant: Duplicate restaurants found, returning first');
      }
      callback(true, docs[0]);
    }
  });
}

// Search and returns a restaurant by its Name.
const searchRestaurant = function(callback, restaurantName){
  var query = {name: restaurantName};
  rt.find(query).toArray(function(err, docs) {
    if (err) {
      callback(err, null); // fail securely
    } else if (docs.length == 0) {
      console.error('lookupRestaurant: Restaurant to find by Name does not exist');
      callback(true, null);
    } else { // Reluctance to trust
      if (docs.length > 1) {
        console.log('lookupRestaurant: Duplicate restaurants found, returning first');
      }
      callback(true, docs[0]);
      //console.log(docs);
      //rt.close();
    }
  });
}


// Start server
app.listen(PORT);
console.log('Server running on port %s', PORT);

