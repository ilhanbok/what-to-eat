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

// Restaurant with no photo
describe('Collection', function() {
	describe('#lookupRestaurant', function() {
	  it('photo should be `null` when the business has no photos in the collection', function() {
	    mongo.lookupRestaurant(function(err, docs) {
	      assert.equal(docs.photo_id, null);
	    }, 'bqNV9FU60H9BVPJ4kWptOA');
	  });
	});
});

// Improper input
describe('Collection', function() {
	describe('#lookupRestaurant', function() {
	  it('should assert error when the business_id is an invalid value', function() {
	    mongo.lookupRestaurant(function(err, docs) {
	      assert.notEqual(err, false);
	    }, {$slice : 1});
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

// Invalid query
describe('Collection', function() {
	describe('#lookupPhotos', function() {
	  it('should assert error when the business_id is invalid', function() {
	    mongo.lookupPhotos(function(err, docs) {
	      assert.notEqual(err, false);
	    }, {$slice:1});
	  });
	});
});

////////// Filter the restaurant by name ////////////// Name to filter by not valid
describe('Collection', function() {
	describe('#searchRestaurant', function() {
		it('should return `null` when the name is not available in the collection', function() {
			mongo.searchRestaurant(function(err, docs) {
				assert.equal(docs, null);
			}, 'invalid_name');
		});
	});
});

// Valid Name to filter by
describe('Collection', function() {
	describe('#searchRestaurant', function() {
		it('should return a JSON object when the part of name is available in the collection', function() {
			mongo.searchRestaurant(function(err, docs) {
				assert.notEqual(docs, null);
			}, 'chicken');
		});
	});
});

// Invalid regex
describe('Collection', function() {
	describe('#searchRestaurant', function() {
		it('should return an error when the name is invalid', function() {
			mongo.searchRestaurant(function(err, docs) {
				assert.notEqual(err, false);
			}, null);
		});
	});
});

///////// Comments ////////////

// Looks up comments
describe('Collection', function() {
	describe('#lookupComments', function() {
		it('should return null when the comment does not exist', function() {
			mongo.lookupComments(function(err, docs) {
				assert.equal(docs, null);
			}, 'chicken');
		});
	});
});

// Looks up comments
describe('Collection', function() {
	describe('#lookupComments', function() {
		it('should return comments when the restaurant has them', function() {
			mongo.lookupComments(function(err, docs) {
				assert.notEqual(docs[0], null);
			}, '3a1w3Ufs9CCC3GJTAV8EpQ');
		});
	});
});

// Invalid restaurant ID
describe('Collection', function() {
	describe('#lookupComments', function() {
		it('should assert error when the restaurant is invalid', function() {
			mongo.lookupComments(function(err, docs) {
				assert.notEqual(err, false);
			}, {$slice:1});
		});
	});
});

// Try posting comment
describe('Collection', function() {
	describe('#postComment', function() {
		it('should return false when the restaurant exists with a comment', function() {
		  mongo.postComment(function(err) {
				assert.equal(err, false);
			}, 'test', 'name', 'text', 5.0);
		});
	});
});

// Post comment to invalid restaurant
describe('Collection', function() {
	describe('#postComment', function() {
		it('should assert error when the restaurant is invalid', function() {
		  mongo.postComment(function(err) {
				assert.notEqual(err, false);
			}, {$slice : 1}, 'name', 'text', 5.0);
		});
	});
});

// Post comment to invalid user
describe('Collection', function() {
	describe('#postComment', function() {
		it('should assert error when the restaurant is invalid', function() {
		  mongo.postComment(function(err) {
				assert.notEqual(err, false);
			}, 'test', {$: 1}, 'text', 5.0);
		});
	});
});

///////// Favorites ////////////

// Add favorite for test user
describe('Collection', function() {
	describe('#addFavorite', function() {
		it('should add favorite to specified user account', function() {
		  mongo.addFavorite(function(err) {
				assert.equal(err, false);
			}, 'test@te.st', 'id', 'name');
		});
	});
});

// Addition of invalid favorite
describe('Collection', function() {
	describe('#addFavorite', function() {
		it('should raise error due to invalid parameter', function() {
		  mongo.addFavorite(function(err) {
				assert.notEqual(err, false);
			}, 'test@te.st', {$slice:1}, 'name');
		});
	});
});

// Remove favorite for test user
describe('Collection', function() {
	describe('#removeFavorite', function() {
		it('should remove favorite from specified user account', function() {
		  mongo.removeFavorite(function(err) {
				assert.equal(err, false);
			}, 'test@te.st', 'id');
		});
	});
});

// Removal of invalid favorite
describe('Collection', function() {
	describe('#removeFavorite', function() {
		it('should raise error due to invalid parameter', function() {
		  mongo.removeFavorite(function(err) {
				assert.notEqual(err, false);
			}, 'test@te.st', {$slice:1});
		});
	});
});

// Get all favorites
describe('Collection', function() {
	describe('#getAllFavorites', function() {
		it('should return favorites for our test user', function() {
		  mongo.getAllFavorites(function(err, docs) {
				assert.notEqual(docs, null);
			}, 'test@te.st');
		});
	});
});

// Get all favorites for nonexistent user
describe('Collection', function() {
	describe('#getAllFavorites', function() {
		it('should return no favorites for uncatalogued user', function() {
		  mongo.getAllFavorites(function(err, docs) {
				assert.equal(docs.length, 0);
			}, 'fake@em.ail');
		});
	});
});

// Get all favorites with invalid input
describe('Collection', function() {
	describe('#getAllFavorites', function() {
		it('should return raise error for invalid email format', function() {
		  mongo.getAllFavorites(function(err, docs) {
				assert.notEqual(err, null);
			}, {$slice : 1});
		});
	});
});
