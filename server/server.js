var mongo = require('./mongo');
// Parse HTTP POST request body
var bodyParser = require('body-parser'),
    cors = require('cors');

// Which port to run mongoDB on localhost
const PORT = 5000;

// Start server
mongo.app.use(cors());
mongo.app.use(bodyParser.json());
mongo.app.listen(PORT);
console.log('Server running on port %s', PORT);

mongo.app.post('/rest_info', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  mongo.lookupRestaurant(function(err, info) {
    if (err) {
      console.error(err);
    } else if (info) {
      res.send(info);
    }
  }, req.body.business_id);

  mongo.searchRestaurnt(function(err, info) {
    if (err) {
      console.error(err);
    } else if (info) {
      res.send(info);
    }
  }, req.body.business_id);
});

mongo.initdb(function(err) {
  if (err) {
    console.error(err);
  }
});

mongo.app.get('/', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  /*mongo.lookupRestaurant(function(err, info) {
    if (err) {
      console.error(err);
    } else if (info) {
      res.send(info);
    }
  }, 'KAhavksKQwKbMzZHiNOyOQ');*/
  mongo.searchRestaurant(function(err, info) {
    if (err) {
      console.error(err);
    } else if (info) {
      res.send(info);
    }
  }, 'chicken');
});
