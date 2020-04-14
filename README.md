<h1 align="center">Email Validation</h1>

Email Validation is a library that validates email addresses and checks againts more than 10K domains used for disposable emails<br />
If you want to **block disposable email addresses at signup**, or if you are a B2B company and want **only professional email adresses**, this is the solution for you :)<br />
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

<br />

This library does multiple verifications:
- Email format validation
- Free email address (@gmail.com, @hotmail.com, @protonmail.com, ...)
- Disposable email address (@maildrop.cc, @fakemail.net, @trashmail.com, ...)

Email Validation has **0 dependency, 100% coverage, and is [fully configurable](#configuration)**.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Result](#result)
- [Contributions](#contributions)
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

The output will be an object with some information on the validity ([see result section](#result))


### Configuration

Email Validation can be configured with more advanced options as an object:

- `whitelist` _(Array)_ Add some email domains you want to whitelist (default is [])
- `blacklist` _(Array)_ Add some email domains you want to blacklist (default is [])
- `allowFreemail` _(Boolean)_ Allow free emails such as @gmail.com, ... (default is false)
- `allowDisposable` _(Boolean)_ Allow disposable emails such as @trashmail.com, ... (default is false)

You can for example choose to allow freemails, and add a domain baddomain.com in addition to the preconfigured list

#### Advanced configuration example

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

You can check some examples in [`example.js`](https://github.com/romainsimon/emailvalid/blob/master/example.js)

#### Updating options on the fly

In case you need to update options after initialization, you can do it on the fly with different methods:

- `whitelist` _(Function)_ Add a new domain to the whitelist
- `blacklist` _(Function)_ Add a new domain to the blacklist
- `setOptions` _(Function)_ Changes the options


```javascript
const EmailValidation = require('emailvalid')
const ev = new EmailValidation()

// This adds a new domain as invalid
ev.blacklist('baddomain.com')

// This marks a domain as valid
ev.whitelist('gooddomain.com')

// This changes options to allow freemails
ev.setOptions({ allowFreemail: true })

```


## Result

Email Validation will output an object with the following information:

- `email` _(String)_ Email in a standardized format (trimed and lowercased)
- `domain` _(String)_ Domain from the email
- `valid` _(Boolean)_ Is the email address valid?
- `errors` _(Array)_ List of errors if any

Errors contains strings and can be one of :
- `invalid` Email is not present of format is invalid
- `disposable` Email is disposable (and not whitelisted or allowed in parameters)
- `freemail` Email is a free mail (and not whitelisted or allowed in parameters)
- `blacklisted` Email is blacklisted in parameters

#### Example :

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
//   errors: ['freemail']
// {

```

## Contributions

If you need a simple way to add domains to the list, just run `yarn add-domain [DOMAIN] [CATEGORY]`

For example `yarn add-domain freemail gmail.com`

Then feel free to create Pull Requests :)


## Licence

[MIT License](https://github.com/romainsimon/emailvalid/blob/master/LICENSE)
