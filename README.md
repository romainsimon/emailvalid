<h1 align="center">Email Validation</h1>

Email Validation is a library that validates email addresses and checks againts more than 10K domains used for disposable emails<br />
If you want to block disposable email addresses at signup, or if you are a B2B company and want only professional email adresses to signup, this is the solution for you :)
<br />

<div align="center">
  <!-- Build Status -->
  <img src="https://img.shields.io/travis/romainsimon/emailvalid.svg?style=flat-square"
    alt="Build Status" />
  <!-- Test Coverage -->
  <img src="https://img.shields.io/coveralls/github/romainsimon/emailvalid/master.svg?style=flat-square"
    alt="Test Coverage" />
  <!-- Standard -->
  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square"
      alt="Standard" />
  </a>
</div>


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Result](#result)
- [License](#license)

## Installation

Install using [`npm`](https://www.npmjs.com/package/emailvalid):

```bash
npm install emailvalid
```

or Yarn [`yarn`](https://yarnpkg.com/en/package/emailvalid):

```bash
yarn add emailvalid
```

## Usage

Email Validation is initialized with a list of default domains

### Simple usage example

```javascript
const EmailValidation = require('emailvalid')
const ev = new EmailValidation()

// This email will be invalid because it is a free email
const result = ev.check('random@gmail.com')
console.log(`${result.email} validity: ${result.valid}`)

// This email will be invalid because it is a disposable email
const result2 = ev.check('iamadisposableemail@yopmail.com')
console.log(`${result2.email} validity: ${result2.valid}`)

```

This will return an validation object

### Configuration

Email Validation can be configured with more advanced options :

- `whitelist` (Array) Add some email domains you want to whitelist (default is [])
- `blacklist` (Array) Add some email domains you want to blacklist (default is [])
- `allowFreemail` (Boolean) Allow free emails such as @gmail.com, ... (default is false)
- `allowDisposable` (Boolean) Allow disposable emails such as @trashmail.com, ... (default is false)


This a allows a more advanced usage.

Advanced configuration example

```javascript
const EmailValidation = require('emailvalid')
const ev = new EmailValidation({ allowFreemail: true, blacklist: ['baddomain.com'] })

// This one should have result.valid = true because we allowed free mails such as gmail.com
ev.check('random@gmail.com')

// But this one is blacklisted now 
ev.check('paul@baddomain.com')

```

Or if you want to disallow all free mails, except gmail.com :

```javascript
const ev = new EmailValidation({ whitelist: ['gmail.com'] })

```

You can check some examples in `example.js`

# Result

Email Validation will result an object with different infos:

- `email` (String) Email in a standardized format (trimed and lowercased)
- `domain` (String) Domain from the email
- `valid` (Boolean) Is the email address valid?
- `errors` (Array) List of errors if any

Errors contains strings and can be one of :
- `invalid` Email is not present of format is invalid
- `disposable` Email is disposable (and not whitelisted or allowed in parameters)
- `freemail` Email is a free mail (and not whitelisted or allowed in parameters)
- `blacklisted` Email is blacklisted in parameters

Example :

```javascript
const EmailValidation = require('emailvalid')
const ev = new EmailValidation()

const result = ev.check('RANDOM@gmail.com')
console.log(result)

// This will return :
// {
//   email: 'random@gmail.com',
//   domain: 'gmail.com'
//   valid: false,
//   errors: ['disposable']
// {

```

### Licence

MIT License

The list used for free mail an disposable email domains has been compiled from different sources completed manually.

Feel free to use this, and make Pull Requests to add more domains so this is maintained.


### Contributions

If you need a simple way to add domains to the list, just run `yarn add-domain [DOMAIN] [CATEGORY]` (for example `yarn add-domain gmail.com freemail`) and make a Pull Request :)
