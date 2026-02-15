import { parse } from '../src/parsers.js'

test('should throw an error for an unknown file extension', () => {
  expect(() => parse({}, '.meow')).toThrow()
})
