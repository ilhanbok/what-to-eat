var assert = require('assert');
var mongo = require('../server/mongo');

////////// DB initialization ////////////

describe('#initdb', function() {
  it('initdb should return false after starting server correctly', async function() {
    await mongo.initdb(function(err) {
      assert.equal(err, false);
    });
  });
});

////////// Restaurant finding ////////////

// Restaurant not in collection
describe('Collection', function() {
	describe('#lookupRestaurant', function() {
	  it('should return `null` when the business_id is not present in the collection', function() {
	    mongo.lookupRestaurant(function(err, docs) {
	      assert.equal(docs, null);
	    }, 'jaoFwU5mqxtw2JpZrM73Yh');
	  });
	});
});

// Restaurant in collection
describe('Collection', function() {
	describe('#lookupRestaurant', function() {
	  it('should return a JSON object when the business_id is present in the collection', function() {
	    mongo.lookupRestaurant(function(err, docs) {
	      assert.notEqual(docs, null);
	    }, 'jaoFwU5mqxtw2JpZrM73Yg');
	  });
	});
});

////////// Get all restaurants ////////////

describe('Collection', function() {
	describe('#getAllRestaurants', function() {
	  it('should return all 571 restaurants in the collection', function() {
	    mongo.getAllRestaurants(function(err, docs) {
	      assert.equal(docs.length, 571);
	    });
	  });
	});
});

////////// Filter by mood ////////////

// Mood to filter by not valid
describe('Collection', function() {
	describe('#getRestaurantsByMood', function() {
	  it('should return `null` when the mood is not available in the collection', function() {
	    mongo.getRestaurantsByMood(function(err, docs) {
	      assert.equal(docs, null);
	    }, 'invalid_mood');
	  });
	});
});

// Valid mood to filter by
describe('Collection', function() {
	describe('#getRestaurantsByMood', function() {
	  it('should return a JSON object when the mood is available in the collection', function() {
	    mongo.getRestaurantsByMood(function(err, docs) {
	      assert.notEqual(docs, null);
	    }, 'hipster');
	  });
	});
});

////////// Find photo for restaurant ////////////

// Restaurant not in collection
describe('Collection', function() {
	describe('#lookupPhotos', function() {
	  it('should return `null` when the business_id is not present in the photo collection', function() {
	    mongo.lookupPhotos(function(err, docs) {
	      assert.equal(docs, null);
	    }, 'jaoFwU5mqxtw2JpZrM73Yh');
	  });
	});
});

// Restaurant in collection
describe('Collection', function() {
	describe('#lookupPhotos', function() {
	  it('should return a JSON object when the business_id is present in the photo collection', function() {
	    mongo.lookupPhotos(function(err, docs) {
	      assert.notEqual(docs, null);
	    }, 'jaoFwU5mqxtw2JpZrM73Yg');
	  });
	});
});