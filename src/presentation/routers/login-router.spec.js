const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')
const UnauthorizedError = require('../helpers/unauthorized-error')

const makeSut = () => {
  class AuthUseCaseSpy {
    auth (email, password) {
      this.email = email
      this.password = password
    }
  }
  const authUsecaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUsecaseSpy)
  return {
    sut,
    authUsecaseSpy
  }
}

describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
    const httResponse = sut.route()
    expect(httResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no httRequest has no body', () => {
    const { sut } = makeSut()
    const httRequest = {}
    const httResponse = sut.route(httRequest)
    expect(httResponse.statusCode).toBe(500)
  })

  test('Should call AuthUseCase with correct params', () => {
    const { sut, authUsecaseSpy } = makeSut()
    const httRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    sut.route(httRequest)
    expect(authUsecaseSpy.email).toBe(httRequest.body.email)
    expect(authUsecaseSpy.password).toBe(httRequest.body.password)
  })

  test('Should return 401 when invalid credentials are provided', () => {
    const { sut } = makeSut()
    const httRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'invalid_password'
      }
    }
    const httpResponse = sut.route(httRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new UnauthorizedError())
  })
})
