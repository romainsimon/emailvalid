'use strict'

const EmailValidation = require('./index')

const ev = new EmailValidation()

function displayInfos (result) {
  let s = ''
  if (result.valid) s += `${result.email} looks like a valid email :)`
  else {
    s += `${result.email} is not valid because `
    if (result.errors.includes('invalid')) s += `${result.email} is an invalid email`
    if (result.errors.includes('disposable')) s += `${result.domain} is disposable domain`
    if (result.errors.includes('freemail')) s += `${result.domain} is a free domain`
    if (result.errors.includes('blacklist')) s += `you just blacklisted it`
    if (result.typo) s += `Did you mean ${result.typo}?`
  }
  console.log(s)
}

displayInfos(
  ev.check('lol')
)

displayInfos(
  ev.check('good@email.io')
)

displayInfos(
  ev.check('blabla@toto.fr')
)

displayInfos(
  ev.check('not@an-email')
)

displayInfos(
  ev.check('random@gmail.com')
)

displayInfos(
  ev.check('nothing@fakemailgenerator.com')
)

// If check for possible typos
displayInfos(
  ev.check('john@gmal.com')
)

// You can easily add some blacklisted domains on the fly if needed
ev.blacklist('email.io')

displayInfos(
  ev.check('super@email.io')
)

// Or if you're lazy you can add an email, and it will blacklist the domain for you ;)
ev.blacklist('anything@toto.fr')

displayInfos(
  ev.check('blibli@toto.fr')
)
