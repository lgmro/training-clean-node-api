const { MongoMemoryServer } = require('mongodb-memory-server')
const { MissingParamError } = require('../../utils/errors')
const UpdateAcessTokenRepository = require('./update-acess-token-repository')
const MongoHelper = require('../helpers/mongo-helper')

let db

const makeSut = () => {
  return new UpdateAcessTokenRepository()
}

describe('UpdateAcessToken Repository', () => {
  let mongoServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await MongoHelper.connect(mongoServer.getUri())
    db = await MongoHelper.getDb()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    mongoServer.stop()
    await MongoHelper.disconnect()
  })

  test('Should update the user with the given acessToken', async () => {
    const sut = makeSut()
    const fakeUser = await db.collection('users').insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    await sut.update(fakeUser.insertedId, 'valid_token')
    const updateFakeUser = await db.collection('users').findOne({ _id: fakeUser.insertedId })
    expect(updateFakeUser.acessToken).toBe('valid_token')
  })

  test('Should throw if no params are provided', async () => {
    const sut = makeSut()

    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.update('user_id')).rejects.toThrow(new MissingParamError('acessToken'))
  })
})
