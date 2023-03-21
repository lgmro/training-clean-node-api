module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/clean-code',
  ATLAS_URI: 'mongodb://admin:123@127.0.0.1:27017',
  tokenSecret: process.env.TOKEN_SECRET || 'secret',
  port: process.env.PORT || 5858
}
