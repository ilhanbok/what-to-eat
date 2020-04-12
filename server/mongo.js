// Import necessary modules
const { MongoClient } = require('mongodb'),
      express = require('express'),
      fs = require('fs'),
      app = express();

// Which port to run mongoDB on localhost
const PORT = 5000;
// Atlas server URL, read from JSON file (DO NOT hardcode this)
const mongoURL = JSON.parse(fs.readFileSync('url.json')).url;
// Start the client connection
const client = new MongoClient(mongoURL);

var db = null, // Entire database
    ut = null, // User info table
    rt = null, // Restaurant table
    pt = null; // Photo table

// Record when DB is properly initialized
var isInitialized = false;

// Record if server was able to load restaurant data
var isLoaded = false;

// Configures and connects the database on server startup,
// returning true and setting isInitialized if successful.
async function initdb(callback) {
  if (!db) {
    try {
      await client.connect();
      console.log('Connected to Atlas server.');
      db = client.db('WhatToEatData');
      ut = db.collection('UserCollection');
      rt = db.collection('YelpCollection');
      pt = db.collection('PhotoCollection');
      isInitialized = true;
      callback(false);
    } catch (err) {
      console.error(err);
      callback(err);
    }
  }
}

// Queries the database to determine whether a user with the
// given username exists, returning true if it is the case
// and false otherwise.
const existsUser = function(callback, name) {
  ut.find({ username : name }).toArray(function(err, docs) {
    if (err) {
      callback(err, true); // fail securely
    } else {
      callback(false, docs.length > 0);
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
      callback(false, '');
    } else { // Reluctance to trust
      if (docs.length > 1) {
        console.log('getPassword: Duplicate users found, returning password of first');
      }
      callback(false, docs[0].password);
    }
  });
}

// Looks up and returns a restaurant by its ID.
const lookupRestaurant = function(callback, id) {
  rt.find({ business_id : id }).toArray(function(err, docs) {
    if (err) {
      callback(err, null); // fail securely
    } else if (docs.length == 0) {
      console.error('lookupRestaurant: Restaurant to find by ID does not exist');
      callback(false, null);
    } else { // Reluctance to trust
      if (docs.length > 1) {
        console.log('lookupRestaurant: Duplicate restaurants found, returning first');
      }
      callback(false, docs[0]);
    }
  });
}

// Get all photos of a restaurant by its ID.
const lookupPhotos = function(callback, id) {
  pt.find({ business_id : id }).toArray(function(err, docs) {
    if (err) {
      callback(err, null);
    } else if (docs.length == 0) {
      console.error('lookupPhotos: No photos exist for restaurant');
      callback(false, null);
    } else {
      if (docs.length > 1) {
        console.log('lookupPhotos: Duplicate photos found, returning first');
      }
      callback(false, docs[0]);
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
      callback(false, null);
    } else { // Reluctance to trust
      if (docs.length > 1) {
        console.log('lookupUser: Duplicaate users found, returning first');
      }
      callback(false, docs[0]);
    }
  });
}

// Looks up and returns the name of a comment by its ID.
const lookupComment = function(callback, commentId) {
  // TODO: How would one implement this? We do not have a Comment class
}

module.exports = {
  app : app,
  isInitialized : isInitialized,
  isLoaded : isLoaded,
  initdb : initdb,
  lookupRestaurant : lookupRestaurant,
  lookupPhotos : lookupPhotos
}
