import { matchToToken } from '../src'

const match = 'foo'.match(/(?<bar>[o])/)!
const token = matchToToken(match)
console.log(token)
// => { group: 'bar', value: 'o', index: 1 }

const matches = 'foo'.matchAll(/(?<bar>[o])/g)
for (const match of matches) {
  const token = matchToToken(match)
  console.log(token)
  // => { group: 'bar', value: 'o', index: 1 }
  // => { group: 'bar', value: 'o', index: 2 }
}
