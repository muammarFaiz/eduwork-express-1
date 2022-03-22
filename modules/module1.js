const express = require('express');
const router = express.Router();
const router2 = express.Router();
const apptwo = express();

// params must include but query string is not
apptwo.get('/:woman/:condition', (req, res) => {
  console.log(req.query);
  res.send(req.params.woman + ' is ' + req.params.condition);
});

// a middleware function with no mount path. This code is executed for every request to the router
router2.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', (req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
  }, (req, res, next) => {
    console.log('Request Type:', req.method);
    next();
  });

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route');
  // otherwise pass control to the next middleware function in this stack
  else next();
}, (req, res, next) => {
  // render a regular page
  res.send('we married and have an adventurous life');
});

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', (req, res, next) => {
  res.send('special: mean your user zero');
});

const a = () => console.log('this is module 1');
module.exports = {a, router, router2, apptwo};
