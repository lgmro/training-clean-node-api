const bcrypt = require('bcrypt')
const MissingParamError = require('../errors/missing-param-error')

module.exports = class Encrypter {
  async compare (value, hash) {
    if (!value || !hash) {
      throw (!value) ? new MissingParamError('value') : new MissingParamError('hash')
    }
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
