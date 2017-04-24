const Band = require('../models/band');

function commentsCreate(req, res, next) {
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

module.exports = {
  create: commentsCreate
};
