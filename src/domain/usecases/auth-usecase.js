const { MissingParamError } = require('../../utils/errors')

module.exports = class AuthUseCase {
  constructor ({ loadUserByEmailRepository, updateAcessTokenRepository, encrypter, tokenGenerator } = {}) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.updateAcessTokenRepository = updateAcessTokenRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
  }

  async auth (email, password) {
    if (!email || !password) {
      throw (!email) ? new MissingParamError('email') : new MissingParamError('password')
    }

    const user = await this.loadUserByEmailRepository.load(email)
    const isValid = user && await this.encrypter.compare(password, user.password)
    if (isValid) {
      const acessToken = await this.tokenGenerator.generate(user.id)
      await this.updateAcessTokenRepository.update(user.id, acessToken)
      return acessToken
    }

    return null
  }
}
