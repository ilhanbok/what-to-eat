var mongo = require('./mongo');

// Which port to run mongoDB on localhost
const PORT = 5000;

// Start server
mongo.app.listen(PORT);
console.log('Server running on port %s', PORT);

mongo.app.get('/rest_info', function(req, res) {
  mongo.lookupRestaurant(function(err, info) {
    if (err) {
      console.error(err);
    } else if (info) {
      res.send(info);
    }
  }, req.body.business_id); 
});

mongo.app.get('/', function(req, res) {
  // Start database
  mongo.initdb(function(err) {
    if (err) {
      console.error(err);
    }
  });
});
