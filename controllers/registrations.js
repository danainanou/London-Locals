const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new');
}

function createRoute(req, res) {
  User
    .create(req.body)
    .then((user) => {
      req.flash('info', `Thanks for registering, ${user.username}! Please login!`);
      res.redirect('/login');
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        req.flash('danger', 'Passwords do not match');
        res.redirect('/register');
      }
      res.status(500).end();
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
