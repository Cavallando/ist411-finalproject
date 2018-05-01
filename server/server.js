'use strict'

var express = require('express');
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
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
    audience: 'https://paintify.com',
    iss: 'cavallaro.auth0.com',
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

router.route('/user').get(authCheck, function (req, res) {
    User.find(function (err, users) {
      if (err) res.send(err);

      res.json(users)
    });
  })
  .post(authCheck, function (req, res) {
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

  //function getUserById(user)
  router.route('/users/id/:user_id').get(authCheck,function (req, res) {
    User.findOne({"_id":req.params.user_id}, function(err, user) {
      if (err) {
        return res.send(err);
      }
      res.json(user)
    });
  });

  //function getUserByEmail(user)
  router.route('/users/email/:email').get(authCheck, function (req, res) {
    User.findOne({"email":req.params.email}, function(err, user) {
      if (err) res.send(err);
      res.json(user)
    });
  });

  //function getUserPaintingsById(id) 
  router.route('/users/paintings/:user_id').get(authCheck, function (req, res) {
    Painting.find({"owner_id":req.params.user_id}, function(err, painting) {
      if (err) res.send(err);
      res.json(painting);
    });
  });

  //function updateUserPaintings(userId, paintingList)
  router.route('/users/paintings/update/:user_id')
    .post(authCheck, function(req, res){
      User.findOneAndUpdate({"_id": req.params.user_id}, { $set: { "paintings" : req.body} }, {upsert:true}, function(err, doc){
        if (err) return res.send(err);
        return res.send("User Painting List successfully updated");
      });
    });


  //function updatePaintingById(paintId, painting, userId)
  router.route('/paintings/update/:painting_id/:user_id')
    .post(authCheck, function(req, res){
      var painting = new Painting();
      painting._id = req.params.painting_id;
      painting.last_edited_by = req.params.user_id;
      painting.paint_data = req.body;
      Painting.findOneAndUpdate({"_id": req.params.painting_id}, painting, {upsert:true}, function(err, doc){
        if (err) return res.send(err);
        return res.json(painting);
      });
    });

  //function getPaintingsById(paintId)
  router.route('/paintings/:painting_id').get(authCheck, function (req, res) {
    Painting.findOne({"_id":req.params.painting_id}, function(err, painting) {
      if (err) res.send(err);
      res.json(painting)
    });
  });

  //function insertNewPainting(userId, painting)
 router.route('/paintings/newpainting/:owner_id')
  .post(authCheck, function(req, res) {
    var painting = new Painting();
    painting._id = new ObjectID();
    painting.owner_id = req.params.owner_id;
    painting.date_created = Date.now();
    painting.painting_name=req.body.painting_name;
    painting.last_edited_by = req.params.owner_id;
    painting.paint_data = req.body.paint_data;
    painting.save(function(err,data) {
      if (err) return res.send(err);
      return res.json(painting._id);
    });
  });

//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function () {
  console.log(`api running on port ${port}`);
});
