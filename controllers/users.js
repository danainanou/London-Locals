const User = require('../models/user');

function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .populate('comments.user favourites')
    .exec()
    .then(user => {
      if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
      }
      res.render('users/show', { user });
    })
    .catch(next);
}

function usersEdit(req, res, next) {
  User
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
      }

      res.render('users/edit', { user });
    })
    .catch(next);
}

function usersUpdate(req, res, next) {
  User
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
      }

      for(const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then((user) => res.redirect(`/users/${user.id}`))
    .catch(next);
}

function usersDelete(req, res, next) {
  User
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
      }

      return user.remove();
    })
    .then(() => res.redirect('/'))
    .catch(next);
}

function usersAddFavourite(req, res) {
  User
    .findById(res.locals.user._id)
    .exec()
    .then(user => {
      if (user.favourites.indexOf(req.params.id) === -1) {
        user.favourites.push(req.params.id);
        user.save();
        console.log(user);
        res.sendStatus(200);
      } else {
        res.sendStatus(500, { message: 'This band is already in your favourites list!'});
      }
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
}


module.exports = {
  show: usersShow,
  edit: usersEdit,
  update: usersUpdate,
  delete: usersDelete,
  addFavourite: usersAddFavourite
};
