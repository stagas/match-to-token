/**
 * Token interface
 */
export interface Token {
  /**
   * The group it matched.
   */
  group: string
  /**
   * The value of the match.
   */
  value: string
  /**
   * The index position of the match.
   */
  index: number
}

/**
 * The return value type.
 */
export type TokenReturn = Token | void

const NonNull = (e: [string, string?]) => e[1] != null

/**
 * Convert a match object from `string.match()` or `string.matchAll()`
 * with a named group RegExp such as `/(?<group>[a-z])/` to a more
 * useful {@link Token} object.
 *
 * @param match A match object
 * @returns
 */
export const matchToToken = (match: RegExpMatchArray): TokenReturn => {
  if (match?.index == null) return

  if (!match.groups)
    throw new TypeError(
      'RegExp match is missing named groups such as: /(?<group>[a-z])/'
    )

  const entry = Object.entries(match.groups).find(NonNull)

  if (entry)
    return {
      group: entry[0],
      value: entry[1],
      index: match.index
    }
}

export default matchToToken
