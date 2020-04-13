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
      mongo.lookupComments(function(err, comments) {
        if (err) {
          console.error(err);
        } else {
          if (null == comments) {
            res.send({ info: info, comments: [], average: null });
          } else {
            res.send({ info: info, comments: comments[0], average: comments[1] });
          }
        }
      }, req.body.business_id);
    }
  }, req.body.business_id); 
});

mongo.app.post('/make_comment', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  mongo.postComment(function(err) {
    if (err) {
      console.error(err);
    }
    res.send({});
  }, req.body.business_id, req.body.username, req.body.text, req.body.rating);
});

mongo.app.get('/getAll_info', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  mongo.getAllRestaurants(function(err,info) {
    if (err) {
      console.error(err);
    } else if (info){
      res.send(info);
    }
  });
});

mongo.initdb(function(err) {
  if (err) {
    console.error(err);
  }
});

mongo.app.get('/', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  mongo.lookupRestaurant(function(err, info) {
    if (err) {
      console.error(err);
    } else if (info) {
      res.send(info);
    }
  }, 'KAhavksKQwKbMzZHiNOyOQ');
});
