/**
 * @file This will add a domain to the list
 */

const { getDomains, cleanDomains } = require('./clean')
const validCategories = [ 'disposable', 'freemail' ]

const addDomain = () => {
  if (process.argv.length < 4)
    throw new Error('This script should be ran: yarn run add-domain gmail.com freemail')
  if (!validCategories.includes(process.argv[3]))
    throw new Error(`Valid categories are: ${validCategories.join(', ')}`)

  const domain = process.argv[2].trim().toLowerCase()
  const category = process.argv[3]
  const domains = getDomains()

  if (domains[domain])
    throw new Error(`Domain ${domain} is already in domains list`)

  domains[domain] = category
  cleanDomains(domains)
  console.log(`Domain ${domain} has been added as ${category}`)
}

require.main === module && addDomain()