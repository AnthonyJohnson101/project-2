const express = require('express');

const PORT = 3001;
const reviews = require('./cam-server.js');

const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Makes handlebars the view engine
app.engine('handlbars', exphbs());
app.set('view engine', 'handlebars');

// is this required if the there is already a port listening at the bottom of the code?
app.listen(PORT, () => {
    console.log('Server listening on port ${PORT}');
});

// GET request for ALL reviews
app.get('/api/reviews', (req, res) => {
  // Log our request to the terminal
  console.info(`${req.method} request received to get reviews`);

  // Sending all reviews to the client
  return res.json(reviews);
});

// POST request to add a review
app.post('/api/reviews', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);

  // Prepare a response object to send back to the client
  let response;

  // Check if there is anything in the response body
  if (req.body && req.body.product) {
    response = {
      status: 'success',
      data: req.body,
    };
    res.json(`Review for ${response.data.product} has been added!`);
  } else {
    res.json('Request body must at least contain a product name');
  }

  // Log the response body to the console
  console.log(req.body);
});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);

// test