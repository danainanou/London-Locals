const express         = require('express');
const morgan          = require('morgan');
const expressLayouts  = require('express-ejs-layouts');
const bodyParser      = require('body-parser');
const session         = require('express-session');
const flash           = require('express-flash');
const emojione        = require('emojione');
const mongoose        = require('mongoose');
mongoose.Promise      = require('bluebird');
const methodOverride  = require('method-override');
const env             = require('./config/env');
const router          = require('./config/routes');
const app             = express();
const routes          = require('./config/routes');
const User            = require('./models/user');

const { port, db, secret } = require('./config/env');

mongoose.connect(db);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(morgan('dev'));
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.userId) return next();

  User
    .findById(req.session.userId)
    .then((user) => {
      if(!user) {
        return req.session.regenerate(() => {
          req.flash('danger', 'You must be logged in!');
          res.redirect('/login');
        });
      }

      req.session.userId = user.id;

      res.locals.user = user;
      res.locals.isLoggedIn = true;

      next();
    });
});

app.use(routes);

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Something went wrong!';

  res.status(err.status);
  if (app.get('env') === 'production') {
    delete err.stack;
  }

  res.locals.err = err;

  return res.render('statics/error.ejs');
});

app.use(router);

app.listen(port, () => console.log(`Server up and running on port: ${env.port}.`));


// a note from nat
