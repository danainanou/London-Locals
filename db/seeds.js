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
            image: 'http://www.skarthia.co.uk/Images/Banner.png',
            members: 'Avichai Myers, Sapir Rajuan, Adam Gigi, Wayne Thompson',
            genre: 'Melodic Death Metal / Groove Metal',
            website: 'http://www.skarthia.co.uk/'
          },
          {
            name: 'Leo and the Bear',
            image: 'https://i.ytimg.com/vi/vavtPxjRo30/maxresdefault.jpg',
            members: 'Dave Mitten, Andy Greening, Dave Whitehouse, Ben Race, AB Benson',
            genre: 'Progressive / Groove Metal',
            website: 'https://www.facebook.com/leoandthebear/'
          },
          {
            name: 'Cairo Son',
            image: 'https://s3.amazonaws.com/bit-photos/large/5446358.jpeg',
            members: 'Magdy, Rico, Ed',
            genre: 'Post-Grunge Stoner Rock',
            website: 'http://www.cairoson.com/'
          },
          {
            name: 'Elephant Tree',
            image: 'http://www.metal-archives.com/images/3/5/4/0/3540386663_photo.jpg?4323',
            members: 'Jack Townley, Peter Holland, Riley MacIntyre, Sam Hart',
            genre: 'Rock/Blues/Doom/Stoner with a garnish of parsley',
            website: 'https://www.facebook.com/elephanttreeband/'
          }
        ]);
    })
    .then((bands) => {
      console.log(`${bands.length} bands created!`);
      return User.findOne({ username: 'dnanou' }).exec();
    })
    .then(user => {
      return Band.findOneAndUpdate({
        name: 'Skarthia'
      }, {
        $push: {
          'comments': {
            body: 'They are so cool!',
            user: user._id
          }
        }
      }, {
        new: true
      })
      .exec();
    })
    .then(band => {
      console.log(band.comments);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      mongoose.connection.close();
    });
