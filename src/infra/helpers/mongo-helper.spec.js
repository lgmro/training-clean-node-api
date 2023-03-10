const sut = require('./mongo-helper')
const { MongoMemoryServer } = require('mongodb-memory-server')

describe('Mongo Helper', () => {
  let mongoServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await sut.connect(mongoServer.getUri())
  })

  afterAll(async () => {
    mongoServer.stop()
    await sut.disconnect()
  })

  test('Should return db when getCollection() is invoked', async () => {
    const mongoServer = await MongoMemoryServer.create()
    expect(sut.db).toBeTruthy()
    const db = await sut.getCollection('users')
    expect(db).toBeTruthy()
    mongoServer.stop()
  })
})
