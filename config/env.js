module.exports = {
  db: process.env.MONGODB_URI || 'mongodb://localhost/londonlocals',
  port: process.env.PORT || 3000,
  secret: process.env.SESSION_SECRET || 'Keep it secret, keep it safe.'
};
