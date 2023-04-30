'use strict'

const { expect } = require('chai')
const levenstein = require('./utils')

describe('Utils', () => {
  describe('Levenstein', () => {
    it('should calculate the distance between two identical strings', () => {
      expect(levenstein('aaa', 'aaa')).eq(0)
    })
    it('should calculate the distance between two different strings', () => {
      expect(levenstein('abc', 'def')).eq(3)
    })
    it('should calculate the distance between two similar strings', () => {
      expect(levenstein('gmail.com', 'gnail.com')).eq(1)
    })
    it('should calculate the distance between gmail.com & gnaul.com', () => {
      expect(levenstein('gmail.com', 'gnaul.com')).eq(2)
    })
    it('should calculate the distance between mail.com & gnaul.com', () => {
      expect(levenstein('mail.com', 'gnaul.com')).eq(3)
    })
  })
})
