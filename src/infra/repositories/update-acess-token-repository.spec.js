const { MongoMemoryServer } = require('mongodb-memory-server')
const { MissingParamError } = require('../../utils/errors')
const UpdateAcessTokenRepository = require('./update-acess-token-repository')
const MongoHelper = require('../helpers/mongo-helper')

let userModel, mongoServer

const makeSut = () => {
  return new UpdateAcessTokenRepository()
}

describe('UpdateAcessToken Repository', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await MongoHelper.connect(mongoServer.getUri())
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })

  afterAll(async () => {
    mongoServer.stop()
    await MongoHelper.disconnect()
  })

  test('Should update the user with the given acessToken', async () => {
    const sut = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    await sut.update(fakeUser.insertedId, 'valid_token')
    const updateFakeUser = await userModel.findOne({ _id: fakeUser.insertedId })
    expect(updateFakeUser.acessToken).toBe('valid_token')
  })

  test('Should throw if no params are provided', async () => {
    const sut = makeSut()

    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.update('user_id')).rejects.toThrow(new MissingParamError('acessToken'))
  })
})
