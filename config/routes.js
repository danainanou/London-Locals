const router        = require('express').Router();

const statics       = require('../controllers/statics');
const sessions      = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const bands         = require('../controllers/bands');
const comments      = require('../controllers/comments');

function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      res.redirect('/login');
    });
  }
  return next();
}

router.route('/')
  .get(statics.home);

router.route('/bands')
  .get(bands.index)
  .post(secureRoute, bands.create);

router.route('/bands/new')
  .get(secureRoute, bands.new);

router.route('/bands/:id')
  .get(bands.show)
  .put(secureRoute, bands.update)
  .delete(secureRoute, bands.delete);

router.route('/bands/:id/edit')
  .get(secureRoute, bands.edit);

router.route('/bands/:id/comments')
  .post(comments.create);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

module.exports = router;
