const { MongoClient } = require('mongodb')

module.exports = {
  async connect (uri, dbName) {
    this.uri = uri
    this.dbName = dbName
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    this.db = this.client.db(dbName)
  },

  async disconnect () {
    await this.client.close(true)
    this.client = null
    this.db = null
  },

  async getDb () {
    return this.db
  }
}
