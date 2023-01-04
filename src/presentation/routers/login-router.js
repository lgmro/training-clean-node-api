const HttResponse = require('../helpers/http-response')
const InvalidParamError = require('../helpers/invalid-param-error')
const MissingParamError = require('../helpers/missing-param-error')

module.exports = class LoginRouter {
  constructor (authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route (httRequest) {
    try {
      const { email, password } = httRequest.body
      if (!email || !password) {
        return HttResponse.badRequest((!email) ? new MissingParamError('email') : new MissingParamError('password'))
      }

      if (!this.emailValidator.isValid(email)) {
        return HttResponse.badRequest(new InvalidParamError('email'))
      }

      const acessToken = await this.authUseCase.auth(email, password)
      if (!acessToken) {
        return HttResponse.unauthorizedError()
      }
      return HttResponse.ok({ acessToken })
    } catch (error) {
      return HttResponse.serverError()
    }
  }
}
