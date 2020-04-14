/**
 * @file This will clean the domains file by triming and lowercasing domains
 *       and sorting them alphabetically. It also removes duplicates
 */

const fs = require('fs')

const getDomains = () => {
  return JSON.parse(
    fs.readFileSync('./domains.json', 'utf8')
  )
}

const cleanDomains = domains => {
  const cleaned = {}

  Object.keys(domains).sort().forEach(domain => {
    cleaned[domain.trim().toLowerCase()] = domains[domain]
  })

  fs.writeFile('./domains.json', JSON.stringify(cleaned, null, 2), err => {
    if (err) throw err
    console.log('Domain file has been updated')
  })
}

require.main === module && cleanDomains(getDomains())

module.exports = { getDomains, cleanDomains }
