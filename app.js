const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
// Cookie parser middleware
app.use(cookieParser());
// Static file middleware
app.use('/static', express.static('public'));

// Set the view engine to pug
app.set('view engine', 'pug');

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
  
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3000, () => {
  console.log('Server started on port 3000.....');
});