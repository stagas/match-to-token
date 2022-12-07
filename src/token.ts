import type { RegExpMatchArrayLike } from './'

export interface TokenJson {
  value: string
  group: string
  source: {
    match: string[]
    index: number
    input: string
  }
}

/**
 * Token interface
 */
export class Token extends String {
  static create(value: string, group: string, source: RegExpMatchArrayLike) {
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

  constructor(value: TokenJson)
  constructor(value: string, group: string, source: RegExpMatchArrayLike)
  constructor(value: string | TokenJson, group?: string, source?: RegExpMatchArrayLike) {
    super(typeof value === 'object' ? value.value : value)
    if (typeof value === 'object') {
      group = value.group
      source = Object.assign(value.source.match, { index: value.source.index, input: value.source.input })
    }
    this.group = group!
    Object.defineProperty(this, 'source', { enumerable: false, value: source })
  }

  toJSON() {
    return {
      value: this.value,
      group: this.group,
      source: {
        match: (this.source as unknown as string[]).slice(),
        index: this.source.index,
        input: this.source.input,
      },
    } as TokenJson
  }

  is(group: string, value?: string) {
    return group == this.group && (value == null || value == this.value)
  }

  as(value: string, group = this.group) {
    return Token.create(value, group, this.source)
  }
}
