'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // YOUR-AUTH0-DOMAIN name e.g https://prosper.auth0.com
        jwksUri: "https://cavallaro.auth0.com/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    aud: `https://paintify.com/`,
    issuer: 'https://cavallaro.auth0.com/',
    algorithms: ['RS256']
});

app.get('/api/user', authCheck, (req,res) => {
  let paintings = db.collection("users").findOne({"email": req.query.email}, function(err, results){
      res.json(results)
  });
});

app.get('/api/painting', authCheck, (req,res) => {
  let paintings = db.collection("paintings").findOne({"painting_id": req.query.painting_id}, function(err, results) {
    res.json(results)
  });
});

app.get('/api/user/paintings', authCheck, (req,res) => {
  let paintings = db.collection("paintings").find({"user_doc_id":req.query.id}).toArray(function(err, results){
    res.json(results)
  });
});

MongoClient.connect('mongodb://admin:admin@ds155577.mlab.com:55577/paintify', (err,client) => {
  if(err) return console.log(err);
  db = client.db('paintify');
  app.listen(3333, () => {
    console.log('Listening on localhost:3333');
  });

});