const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')

describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = new LoginRouter()
    const httRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httResponse = sut.route(httRequest)
    expect(httResponse.statusCode).toBe(400)
    expect(httResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const sut = new LoginRouter()
    const httRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httResponse = sut.route(httRequest)
    expect(httResponse.statusCode).toBe(400)
    expect(httResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 500 if no httRequest is provided', () => {
    const sut = new LoginRouter()
    const httResponse = sut.route()
    expect(httResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no httRequest has no body', () => {
    const sut = new LoginRouter()
    const httRequest = {}
    const httResponse = sut.route(httRequest)
    expect(httResponse.statusCode).toBe(500)
  })
})
