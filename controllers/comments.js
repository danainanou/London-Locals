const Band = require('../models/band');
const User = require('../models/user');

function bandCommentsCreate(req, res, next) {
  Band
    .findById(req.params.id)
    .exec()
    .then(band => {
      if (!band) {
        const err = new Error('Band not found');
        err.status = 404;
        throw err;
      }

      const comment = {
        user: res.locals.user._id,
        body: req.body.body
      };

      band.comments.push(comment);

      return band.save();
    })
    .then((band) => {
      console.log(band);
      res.redirect(`/bands/${req.params.id}`);
    })
    .catch(next);
}

function bandCommentsDelete(req, res, next) {
  Band
    .findByIdAndUpdate({ _id: req.params.bandId }, { $pull: { 'comments': { _id: req.params.commentId }} }, { new: true })
    .exec()
    .then(band => {
      console.log(band);
      res.redirect(`/bands/${band._id}`);
    })
    .catch(next);
}

function userCommentsCreate(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
      }

      const comment = {
        user: res.locals.user._id,
        body: req.body.body
      };

      user.comments.push(comment);

      return user.save();
    })
    .then((user) => {
      console.log(user);
      res.redirect(`/users/${req.params.id}`);
    })
    .catch(next);
}

module.exports = {
  bandcreate: bandCommentsCreate,
  bandsdelete: bandCommentsDelete,
  usercreate: userCommentsCreate,

};
