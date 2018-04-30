'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./model/users');
var Painting = require('./model/paintings');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');

var app = express();
var router = express.Router();

var port = 3333;


const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // YOUR-AUTH0-DOMAIN name e.g prosper.auth0.com
        jwksUri: "https://cavallaro.auth0.com/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: '{YOUR-API-AUDIENCE-ATTRIBUTE}',
    issuer: '{YOUR-AUTH0-DOMAIN}',
    algorithms: ['RS256']
});

mongoose.connect('mongodb://admin:admin@ds155577.mlab.com:55577/paintify');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//now we can set the route path & initialize the API
router.get('/', function (req, res) {
  res.json({ message: 'API Initialized!' });
});

router.route('/user').get(function (req, res) {
    User.find(function (err, users) {
      if (err) res.send(err);

      res.json(users)
    });
  })
  .post(function (req, res) {
    var user = new User();
    user.email = req.body.email;
    user.name = req.body.name;
    user.paintings = req.body.paintings
    user.save(function (err) {
      if (err)
        res.send(err);
      res.json({ message: 'User successfully added!' });
    });
  });

  router.route('/users/id/:user_id').get(function (req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) {
        return res.send(err);
      }
      res.json(user)
    });
  });

  router.route('/users/email/:email').get(function (req, res) {
    User.findOne({"email":req.params.email}, function(err, user) {
      if (err) res.send(err);
      res.json(user)
    });
  });

 router.route('/paintings/:painting_id')
  .put(function(req, res) {
    Painting.findById(req.params.painting_id, function(err, painting) {
      if (err) res.send(err);

      (req.body.owner_id) ? painting.owner_id = req.body.owner_id : null;
      (req.body.painting_name) ? painting.painting_name = req.body.painting_name : null;
      (req.body.date_created) ? painting.date_created = req.body.date_created : null;
      (req.body.last_edited_by) ? painting.last_edited_by = req.body.last_edited_by : null;
      (req.body.paint_data) ? painting.paint_data = req.body.paint_data : null;

      painting.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'Painting has been saved!' });
      });
    });
  })
  //delete method for removing a comment from our database
  .delete(function(req, res) {
    //selects the comment by its ID, then removes it.
    Painting.remove({ _id: req.params.comment_id }, function(err, comment) {
      if (err) res.send(err);

      res.json({ message: 'Painting has been deleted' })
    })
  });

//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function () {
  console.log(`api running on port ${port}`);
});
