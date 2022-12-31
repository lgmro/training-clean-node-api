const HttResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httRequest) {
    try {
      const { email, password } = httRequest.body
      if (!email || !password) {
        return HttResponse.badRequest((!email) ? 'email' : 'password')
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
