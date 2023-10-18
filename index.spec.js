'use strict'

const { expect } = require('chai')
const EmailValidation = require('./index')

describe('EmailValidation', () => {
  describe('Validation of email format', () => {
    const ev = new EmailValidation()
    it('should detect null as an invalid email', () => {
      const result = ev.check(null)
      expect(result).to.be.an('object')
      expect(result.valid).eq(false)
      expect(result.errors[0]).eq('invalid')
    })
    it('should detect an empty string as an invalid email', () => {
      const result = ev.check('')
      expect(result).to.be.an('object')
      expect(result.valid).eq(false)
      expect(result.errors[0]).eq('invalid')
    })
    it('should detect a random string as an invalid email', () => {
      const result = ev.check('fapojfp')
      expect(result).to.be.an('object')
      expect(result.valid).eq(false)
      expect(result.errors[0]).eq('invalid')
    })
    it('should detect an email with spaces as an invalid email', () => {
      const result = ev.check('roger @ test . com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(false)
      expect(result.errors[0]).eq('invalid')
    })
    it('should detect an valid looking email as valid', () => {
      const result = ev.check('roger@testemail.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(true)
      expect(result.errors).have.lengthOf(0)
    })
    it('should reformat email address and extract domain', () => {
      const result = ev.check('ROGER@testemail.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(true)
      expect(result.email).eq('roger@testemail.com')
      expect(result.domain).eq('testemail.com')
    })
    it('should not suggest possible typos for gmail.com', () => {
      const result = ev.check('roger@gmail.com')
      expect(result.typo).eq(null)
    })
    it('should suggest possible typos for gmal.com', () => {
      const result = ev.check('roger@gmal.com')
      expect(result.typo).eq('roger@gmail.com')
    })
    it('should suggest possible typos for gnaul.com', () => {
      const result = ev.check('roger@gnaul.com')
      expect(result.typo).eq('roger@gmail.com')
    })
  })
  describe('Detection of disposable and free emails', () => {
    const ev = new EmailValidation()
    it('should detect gmail.com as an free email', () => {
      const result = ev.check('random@gmail.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(false)
      expect(result.errors[0]).eq('freemail')
    })
    it('should detect yopmail.com as an disposable email', () => {
      const result = ev.check('random@yopmail.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(false)
      expect(result.errors[0]).eq('disposable')
    })
    it('should not detect romainsimon.net as a disposable or freemail', () => {
      const result = ev.check('random@romainsimon.net')
      expect(result).to.be.an('object')
      expect(result.valid).eq(true)
      expect(result.errors).have.lengthOf(0)
    })
  })
  describe('Configuration to allow disposable emails', () => {
    const ev = new EmailValidation({ allowDisposable: true })
    it('should still detect gmail.com as an free email', () => {
      const result = ev.check('random@gmail.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(false)
      expect(result.errors[0]).eq('freemail')
    })
    it('should not detect yopmail.com as an disposable email', () => {
      const result = ev.check('random@yopmail.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(true)
      expect(result.errors).have.lengthOf(0)
    })
    it('should not detect romainsimon.net as a disposable or freemail', () => {
      const result = ev.check('random@romainsimon.net')
      expect(result).to.be.an('object')
      expect(result.valid).eq(true)
      expect(result.errors).have.lengthOf(0)
    })
  })
  describe('Configuration to allow free emails', () => {
    const ev = new EmailValidation({ allowFreemail: true })
    it('should not detect gmail.com as an free email', () => {
      const result = ev.check('random@gmail.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(true)
      expect(result.errors).have.lengthOf(0)
    })
    it('should still detect yopmail.com as an disposable email', () => {
      const result = ev.check('random@yopmail.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(false)
      expect(result.errors[0]).eq('disposable')
    })
    it('should not detect romainsimon.net as a disposable or freemail', () => {
      const result = ev.check('random@romainsimon.net')
      expect(result).to.be.an('object')
      expect(result.valid).eq(true)
      expect(result.errors).have.lengthOf(0)
    })
  })
  describe('Configuration to whitelist or blacklist domains', () => {
    it('should disallow domains blacklisted', () => {
      const ev = new EmailValidation({ blacklist: ['domain.com'] })
      const result = ev.check('random@domain.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(false)
      expect(result.errors[0]).eq('blacklist')
    })
    it('should allow domains whitelisted', () => {
      const ev = new EmailValidation({ whitelist: ['gmail.com'] })
      const result = ev.check('random@gmail.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(true)
      expect(result.errors).have.lengthOf(0)
    })
  })
  describe('Blacklist or whitelist domains after initialization', () => {
    const ev = new EmailValidation()
    it('should say domain random.com is valid', () => {
      const result = ev.check('random@random.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(true)
    })
    it('should say domain random.com is invalid after it is blacklisted', () => {
      ev.blacklist('random.com')
      const result = ev.check('random@random.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(false)
    })
    it('should say domain random.com is invalid after it is whitelisted again', () => {
      ev.whitelist('random.com')
      const result = ev.check('random@random.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(true)
    })
    it('should say domain random.com is invalid after it is blacklisted from email', () => {
      ev.blacklist('test@random.com')
      const result = ev.check('random@random.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(false)
    })
    it('should say domain random.com is invalid after it is whitelisted again from email', () => {
      ev.whitelist('test@random.com')
      const result = ev.check('random@random.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(true)
    })
  })
  describe('Modify options after initialization', () => {
    const ev = new EmailValidation()
    it('should say domain gmail.com is invalid', () => {
      const result = ev.check('gmail@gmail.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(false)
    })
    it('should say domain gmail.com is valid after free emails are allowed', () => {
      ev.setOptions({ allowFreemail: true })
      const result = ev.check('gmail@gmail.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(true)
    })
  })
  describe('Default validation should be configurable', () => {
    const ev = new EmailValidation()
    it('should say domain random.com is invalid because default validation is not set to accept, normally random.com should have been accepted', () => {
      ev.setOptions({ defaultType: 'invalid' })
      const result = ev.check('random@random.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(false)
      expect(result.errors[0]).eq('invalid')
    })
    it('should say domain random.com is valid because random.com has been whitelisted despite of default validation is not set to accept', () => {
      ev.setOptions({ defaultType: 'invalid', whitelist: ['random.com'] })
      const result = ev.check('random@random.com')
      expect(result).to.be.an('object')
      expect(result.valid).eq(true)
    })
  })
})
