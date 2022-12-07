import { Token } from './token'
import { NonNull } from './util'

export interface RegExpMatchArrayLike {
  index: number
  input: string
}

export { Token }
export type { TokenJson } from './token'

/**
 * Convert a match object from `string.match()` or `string.matchAll()`
 * with a named group RegExp such as `/(?<group>[a-z])/` to a more
 * useful {@link Token} object.
 *
 * @param match The match object
 */
export const matchToToken = (match: RegExpMatchArray | null): Token | null => {
  if (!match) return null
  if (match.index == null) return null
  if (!match.groups)
    throw new TypeError('RegExp match is missing named groups such as: /(?<group>[a-z])/')
  const entry = Object.entries(match.groups).find(NonNull)
  if (entry) return Token.create(entry[1], entry[0], match as RegExpMatchArrayLike)
  return null
}

export default matchToToken

export class RegExpToken extends RegExp {
  [Symbol.match!](input: string) {
    const match = RegExp.prototype[Symbol.match].call(this, input)
    return matchToToken(match)
  }
  *[Symbol.matchAll!](input: string) {
    const matches = RegExp.prototype[Symbol.matchAll].call(this, input)
    for (const match of matches) yield matchToToken(match)
  }
}
