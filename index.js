const domains = require('./domains.json')

// Source of the email regexp :
// https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression/201378#201378
// eslint-disable-next-line
const emailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i

const defaultOptions = {
  whitelist: [],
  blacklist: [],
  allowFreemail: false,
  allowDisposable: false
}

class EmailValidation {
  constructor (options = {}) {
    this.setOptions(options)
  }

  check (email) {
    const result = { email, domain: null, valid: false, errors: [] }

    if (!email || !emailReg.test(email) || !email.split('@')) {
      result.errors.push('invalid')
      return result
    }

    result.email = email.trim().toLowerCase()
    result.domain = result.email.split('@').pop()

    const type = this.domains[result.domain]
    if (type) {
      type === 'disposable' && !this.options.allowDisposable && result.errors.push(type)
      type === 'freemail' && !this.options.allowFreemail && result.errors.push(type)
      type === 'blacklist' && result.errors.push(type)
    }

    if (!result.errors.length) result.valid = true
    return result
  }

  whitelist (domain) {
    domain = domain.includes('@') ? domain.split('@').pop() : domain
    this.domains[domain.trim().toLowerCase()] = 'whitelist'
  }

  blacklist (domain) {
    domain = domain.includes('@') ? domain.split('@').pop() : domain
    this.domains[domain.trim().toLowerCase()] = 'blacklist'
  }

  setOptions (options) {
    this.options = Object.assign({}, defaultOptions, options)
    this.domains = Object.assign({}, domains,
      this.options.whitelist.reduce((o, d) => { o[d] = 'whitelist'; return o }, {}),
      this.options.blacklist.reduce((o, d) => { o[d] = 'blacklist'; return o }, {})
    )
  }
}

module.exports = EmailValidation
