const MongoHelper = require('./mongo-helper')
const { MongoMemoryServer } = require('mongodb-memory-server')

describe('Mongo Helper', () => {
  test('Should return db when getDb() is invoked', async () => {
    const mongoServer = await MongoMemoryServer.create()
    const sut = MongoHelper
    await sut.connect(mongoServer.getUri())
    expect(sut.db).toBeTruthy()
    const db = await sut.getDb()
    expect(db).toBeTruthy()
  })
})
