// rv2HVmhc784c2Bw5


  const mongoose = require('mongoose');
  mongoose.Promise = require('bluebird');

  const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/londonlocals';
  mongoose.connect(dbURI);

  const User    = require('../models/user');
  const Band    = require('../models/band');

  User.collection.drop();
  Band.collection.drop();

  User
    .create([{
      username: 'dnanou',
      email: 'dn@dn.com',
      password: 'dn',
      passwordConfirmation: 'dn'
    },{
      username: 'nope',
      email: 'nope@nope.com',
      password: 'nope',
      passwordConfirmation: 'nope'
    }])
    .then((users) => {
      console.log(`${users.length} users created!`);

      return Band
        .create([
          {
            name: 'Skarthia',
            image: '/src/images/skarthia.jpg',
            members: 'Avichai Myers, Sapir Rajuan, Adam Gigi, Wayne Thompson',
            genre: 'Melodic Death Metal / Groove Metal',
            website: 'http://www.skarthia.co.uk/'
          },
          {
            name: 'Leo and the Bear',
            image: '../src/images/leoandthebear.jpg',
            members: 'Dave Mitten, Andy Greening, Dave Whitehouse, Ben Race, AB Benson',
            genre: 'Progressive / Groove Metal',
            website: 'https://www.facebook.com/leoandthebear/'
          },
          {
            name: 'Cairo Son',
            image: '../src/images/cairoson.jpg',
            members: 'Magdy, Rico, Ed',
            genre: 'Post-Grunge Stoner Rock',
            website: 'http://www.cairoson.com/'
          },
          {
            name: 'Elephant Tree',
            image: '../src/images/elephanttree.jpg',
            members: 'Jack Townley, Peter Holland, Riley MacIntyre, Sam Hart',
            genre: 'Rock/Blues/Doom/Stoner with a garnish of parsley',
            website: 'http://www.cairoson.com/'
          }
        ]);
    })
    .then((bands) => {
      console.log(`${bands.length} bands created!`);

      return User.findOne({
        username: 'dnanou'
      })
      .exec()
      .then(user => {
        return Band.findOneAndUpdate({
          name: 'Skarthia'
        }, {
          comments: {
            $push: {
              body: 'They are so cool!',
              user: user._id
            }
          }
        }, {
          new: true
        })
        .exec();
      })
      .catch(err => {
        throw new Error(err);
      });
    })
    .then(comment => {
      console.log(comment);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      mongoose.connection.close();
    });
