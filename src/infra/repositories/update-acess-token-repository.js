const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')

module.exports = class UpdateAcessTokenRepository {
  async update (userId, acessToken) {
    if (!userId) {
      throw new MissingParamError('userId')
    }
    if (!acessToken) {
      throw new MissingParamError('acessToken')
    }
    const db = await MongoHelper.getDb()
    await db.collection('users').updateOne({
      _id: userId
    }, {
      $set: { acessToken }
    })
  }
}
