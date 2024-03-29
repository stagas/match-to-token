// @env browser
import { matchToToken, RegExpToken, Token } from '../src'

it('converts match to token', () => {
  const token = 'foo'.match(new RegExpToken(/(?<bar>[o])/)) as unknown as Token & string
  expect(token).toBeTruthy()
  expect('' + token).toEqual('o')
  expect(token == 'o').toEqual(true)
  expect('o' == token).toEqual(true)
  expect(token.is('bar')).toEqual(true)
  expect(token.is('bar', 'yo')).toEqual(false)
  expect(token.is('bar', 'o')).toEqual(true)
  expect(token).toMatchObject({
    group: 'bar',
    value: 'o',
    index: 1,
    source: {
      input: 'foo',
    },
  })
  expect(token.as('x')).toMatchObject({
    group: 'bar',
    value: 'x',
    index: 1,
    source: {
      input: 'foo',
    },
  })
})

it('returns void when nothing matched', () => {
  const token = matchToToken('foo'.match(/(?<bar>[x])/)!)
  expect(token).toBeFalsy()
})

it('accepts match from string.matchAll()', () => {
  const it = 'foo'.matchAll(new RegExpToken(/(?<bar>[o])/g))
  const token = it.next().value as unknown as Token & string
  expect(token).toBeTruthy()
  expect('' + token).toEqual('o')
  expect(token == 'o').toEqual(true)
  expect('o' == token).toEqual(true)
  expect(token.is('bar')).toEqual(true)
  expect(token.is('bar', 'yo')).toEqual(false)
  expect(token.is('bar', 'o')).toEqual(true)
  expect(token).toMatchObject({
    group: 'bar',
    value: 'o',
    index: 1,
    source: {
      input: 'foo',
    },
  })
  expect(token.as('x')).toMatchObject({
    group: 'bar',
    value: 'x',
    index: 1,
    source: {
      input: 'foo',
    },
  })
})

it('should throw when no named groups are present', () => {
  const it = 'foo'.matchAll(/([o])/g)
  expect(() => matchToToken(it.next().value)).toThrowError('missing named groups')
})

it('converts to json and back', () => {
  const token = 'foo'.match(new RegExpToken(/(?<bar>[o])/)) as unknown as Token & string
  expect(token).toBeTruthy()
  expect('' + token).toEqual('o')
  expect(token == 'o').toEqual(true)
  expect('o' == token).toEqual(true)
  expect(token.is('bar')).toEqual(true)
  expect(token.is('bar', 'yo')).toEqual(false)
  expect(token.is('bar', 'o')).toEqual(true)
  expect(token).toMatchObject({
    group: 'bar',
    value: 'o',
    index: 1,
    source: {
      input: 'foo',
    },
  })
  const json = token.toJSON()
  expect(json).toMatchObject({
    value: 'o',
    group: 'bar',
    source: { match: ['o', 'o'], index: 1, input: 'foo' },
  })
  const res = new Token(json)
  expect(res).toMatchObject({
    group: 'bar',
    value: 'o',
    index: 1,
    source: {
      input: 'foo',
    },
  })
})
