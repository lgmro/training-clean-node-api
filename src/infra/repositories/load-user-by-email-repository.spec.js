const MongoHelper = require('../helpers/mongo-helper')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')
const { MongoMemoryServer } = require('mongodb-memory-server')
const { MissingParamError } = require('../../utils/errors')

let db

const makeSut = () => {
  return new LoadUserByEmailRepository()
}

describe('LoadUserByEmai Repository', () => {
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

  test('Should return null if no use is found', async () => {
    const sut = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const sut = makeSut()
    const fakeUser = await db.collection('users').insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    const user = await sut.load('valid_email@mail.com')
    expect(user.id).toBe(fakeUser._id)
    expect(user.password).toBe('hashed_password')
  })

  test('Should throw if no email is provided', async () => {
    const sut = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
})
