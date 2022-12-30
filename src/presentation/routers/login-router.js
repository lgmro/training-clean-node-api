const HttResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  route (httRequest) {
    if (!httRequest || !httRequest.body) {
      return HttResponse.serverError()
    }

    const { email, password } = httRequest.body
    if (!email || !password) {
      return HttResponse.badRequest((!email) ? 'email' : 'password')
    }
  }
}
