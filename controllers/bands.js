const Band = require('../models/band');
const Comment = require('../models/comment');
const genres = [
  'Rock',
  'Stoner',
  'Blues',
  'Metal',
  'Groove',
  'Doom',
  'Death',
  'Grind',
  'Progressive',
  'Power',
  'Black',
  'Pagan'
];

function bandsIndex(req, res, next) {
  Band
    .find()
    .then((bands) => res.render('bands/index', { bands }))
    .catch(next);
}

function bandsNew(req, res) {
  res.render('bands/new', { genres });
}

function bandsCreate(req, res, next) {
  Band
    .create(req.body)
    .then(() => res.redirect('/bands'))
    .catch(next);
}

function bandsShow(req, res, next) {
  Band
    .findById(req.params.id)
    .populate('comments.user')
    .exec()
    .then(band => {
      if (!band) {
        const err = new Error('Band not found');
        err.status = 404;
        throw err;
      }
      res.render('bands/show', { band });
    })
    .catch(next);
}

function bandsEdit(req, res, next) {
  Band
    .findById(req.params.id)
    .then((band) => {
      if (!band) {
        const err = new Error('Band not found');
        err.status = 404;
        throw err;
      }

      res.render('bands/edit', { band, genres });
    })
    .catch(next);
}

function bandsUpdate(req, res, next) {
  Band
    .findById(req.params.id)
    .then((band) => {
      if (!band) {
        const err = new Error('Band not found');
        err.status = 404;
        throw err;
      }

      for(const field in req.body) {
        band[field] = req.body[field];
      }

      return band.save();
    })
    .then((band) => res.redirect(`/bands/${band.id}`))
    .catch(next);
}

function bandsDelete(req, res, next) {
  Band
    .findById(req.params.id)
    .then((band) => {
      if (!band) {
        const err = new Error('Band not found');
        err.status = 404;
        throw err;
      }

      return band.remove();
    })
    .then(() => res.redirect('/bands'))
    .catch(next);
}

module.exports = {
  index: bandsIndex,
  new: bandsNew,
  create: bandsCreate,
  show: bandsShow,
  edit: bandsEdit,
  update: bandsUpdate,
  delete: bandsDelete
};
