import { formatData } from '../src/formatters/index.js'

test('should throw an error for an unknown output format', () => {
  expect(() => formatData({}, 'woof')).toThrow()
})
