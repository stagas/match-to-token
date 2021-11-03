import { matchToToken, Token } from './'

it('converts match to token', () => {
  const token = matchToToken('foo'.match(/(?<bar>[o])/))
  expect(token).toBeTruthy()
  expect(token).toEqual({
    group: 'bar',
    value: 'o',
    index: 1
  })
})

it('returns void when nothing matched', () => {
  const token = matchToToken('foo'.match(/(?<bar>[x])/))
  expect(token).toBeFalsy()
})

it('accepts match from string.matchAll()', () => {
  const it = 'foo'.matchAll(/(?<bar>[o])/g)
  const token = matchToToken(it.next().value)
  expect(token).toBeTruthy()
  expect(token).toEqual({
    group: 'bar',
    value: 'o',
    index: 1
  })
})

it('should throw when no named groups are present', () => {
  const it = 'foo'.matchAll(/([o])/g)
  expect(() => matchToToken(it.next().value)).toThrowError(
    'missing named groups'
  )
})
