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
    rt = null, // Restaurant table
    pt = null, // Photo table
    ct = null, // Comment table
    ft = null; // Favorites table

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
      rt = db.collection('YelpCollection');
      pt = db.collection('PhotoCollection');
      ct = db.collection('CommentCollection');
      ft = db.collection('FavoriteCollection');
      isInitialized = true;
      callback(false);
    } catch (err) {
      console.error(err);
      callback(err);
    }
  }
}

// Looks up and returns a restaurant by its Name.
const searchRestaurant = function(callback, name) {
  rt.find({ name : { "$regex": name, "$options": "i" } }).toArray(function(err, docs) {
    if (err) {
      callback(err, null); // fail securely
    } else if (docs.length == 0) {
      console.error('searchRestaurant: Restaurant to find by Name does not exist');
      callback(false, null);
    } else { // Reluctance to trust
      callback(false, docs);
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
      // If multiple restaurants found, returns first
      lookupPhotos(
        function(err, item) {
          if (!err && item) {
            docs[0].photo_id = item.photo_id;
          }
          callback(false, docs[0]);
        },
      id);
    }
  });
}

// Get restaurants by criteria
const getRestaurantsByMood = function(callback, mood) {
  rt.find({ 'attributes.Ambience' : {$regex : "'" + mood + "': True"} }).toArray(function(err, docs) {
    if (err) {
      callback(err, null);
    } else if (docs.length == 0) {
      console.error('getRestaurantsByMood: No restaurants exist for mood: ' + mood);
      callback(false, null);
    } else {
      callback(false, docs);
    }
  });
}

// Get all restaurants
const getAllRestaurants = function(callback) {
  rt.find({}).sort( { stars: -1 } ).toArray(function(err, docs) {
    if (err) {
      callback(err, null);
    } else {
      callback(false, docs);
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
      // If multiple restaurants found, returns first
      callback(false, docs[0]);
    }
  });
}

// Get all comments of a restaurant by its ID.
const lookupComments = function(callback, id) {
  ct.findOne({ business_id : id }, function(err, doc) {
    if (err) {
      callback(err, null);
    } else if (doc == null) {
      console.error('lookupComments: Restaurant does not exist');
      callback(false, null);
    } else {
      callback(false, [doc.comments, doc.ourAverage]);
    }
  });
}

// Get all comments of a restaurant by its ID.
const postComment = function(callback, id, username, text, rating) {
  ct.findOne({ business_id : id }, function(err, doc) {
    if (err) {
      callback(err);
    } else if (doc == null) {
      ct.insert({ business_id: id,
                  comments: [ { username: username, text: text } ],
                  ourAverage: rating, numRatings: 1 }, function(err, res) {
                    if (err) {
                      console.error(err);
                      callback(err);
                    } else {
                      console.log('postComment: Adding comment for new restaurant');
                      callback(false);
                    }
                });
    } else {
      var nr = doc.numRatings;
      ct.update({ business_id: id },
                { $push: { comments: { username: username, text: text } } ,
                  $set: { numRatings: doc.numRatings + 1, ourAverage:
                                 doc.ourAverage * nr / (nr + 1) + rating / (nr + 1) }
                }, function(err, res) {
                  if (err) {
                    console.error(err);
                    callback(err);
                  } else {
                    callback(false);
                  }
               });
    }
  });
}

// Add a favorite item to user's list.
const addFavorite = function(callback, email, rest_id, rest_name) {
  ft.find({ email : email }).toArray(function(err, docs) {
    if (err) {
      callback(err, null); // fail securely
    } else if (docs.length == 0) {
      console.error('addFavorite: User to find by email does not exist, adding now.');
      ft.insert({
          email: email,
          favorites: [ { rest_id: rest_id, rest_name: rest_name } ]
      }, function(err, res){
          if (err) {
            console.error(err);
            callback(err);
          } else {
            callback(false);
          }
      });
    } else {
      ft.update({ email: email },
                { $push: { favorites: { rest_id : rest_id, rest_name: rest_name } }
                }, function(err, res) {
                  if (err) {
                    console.error(err);
                    callback(err);
                  } else {
                    callback(false);
                  }
               });
    }
  });
}

// Remove a favorite from a user's list
const removeFavorite = function(callback, email, rest_id) {
  ft.update({ email: email },
            { $pull: { favorites: { rest_id: rest_id } } },
            function(err, res) {
              if (err) {
                console.error(err);
                callback(err);
              } else {
                callback(false);
              }
            });
}

// Get all favorites for a user
const getAllFavorites = function(callback, email) {
  ft.find({ email : email }).toArray(function(err, docs) {
    if (err) {
      callback(err, null);
    } else if (docs.length == 0) {
      console.log('getAllFavorites: No users exist with given email, returning empty array');
      callback(false, []);
    } else {
      // If multiple users found, return first
      callback(false, docs[0].favorites);
    }
  });
}

module.exports = {
  app : app,
  isInitialized : isInitialized,
  isLoaded : isLoaded,
  initdb : initdb,
  lookupRestaurant : lookupRestaurant,
  lookupPhotos : lookupPhotos,
  getRestaurantsByMood : getRestaurantsByMood,
  getAllRestaurants : getAllRestaurants,
  lookupComments : lookupComments,
  postComment : postComment,
  searchRestaurant: searchRestaurant,
  addFavorite: addFavorite,
  removeFavorite: removeFavorite,
  getAllFavorites: getAllFavorites
}
