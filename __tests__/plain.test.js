import { formatPlain } from '../src/formatters/plain.js'

test('should throw an error for an unknown tupe of node', () => {
  const data = [
    {
      key: 'group2',
      type: 'deleted',
      value: { abc: 12345 },
    },
    {
      key: 'group3',
      type: 'smth',
      value: { fee: 100500 },
    },
  ]
  expect(() => formatPlain(data)).toThrow()
})
