import type { RegExpMatchArrayLike } from './'

/**
 * Token interface
 */
export class Token extends String {
  static create(value: string, group: string, source: RegExpMatchArrayLike): Token {
    return new Token(value, group, source)
  }
  /**
   * The group it matched.
   */
  group: string
  /**
   * The value of the match.
   */
  get value() {
    return '' + this
  }
  /**
   * The index position of the match.
   */
  get index() {
    return this.source.index
  }
  /**
   * The input string.
   */
  source!: RegExpMatchArrayLike

  constructor(value: string, group: string, source: RegExpMatchArrayLike) {
    super(value)
    this.group = group
    Object.defineProperty(this, 'source', { enumerable: false, value: source })
  }

  is(group: string, value?: string) {
    return group == this.group && (value == null || value == this.value)
  }

  as(value: string, group = this.group) {
    return Token.create(value, group, this.source)
  }
}
