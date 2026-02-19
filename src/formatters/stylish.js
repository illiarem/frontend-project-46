const isObject = data => Object.prototype.toString.call(data) === '[object Object]'

const stringify = (value, depth) => {
  if (!isObject(value)) return `${value}`

  const spacesCount = 4
  const keyIndent = ' '.repeat(depth * spacesCount)
  const bracketIndent = ' '.repeat((depth - 1) * spacesCount)

  const result = Object.entries(value).map(([key, value]) => {
    return `${keyIndent}${key}: ${stringify(value, depth + 1)}`
  })
  return ['{', ...result, `${bracketIndent}}`].join('\n')
}

export const formatStylish = (data) => {
  const iter = (data, depth) => {
    const spacesCount = 4
    const signIndent = ' '.repeat(depth * spacesCount - 2)
    const bracketIndent = ' '.repeat((depth - 1) * spacesCount)

    const result = data.map((node) => {
      const { type, key, value, oldValue, newValue, children } = node

      switch (type) {
        case 'added':
          return `${signIndent}+ ${key}: ${stringify(value, depth + 1)}`
        case 'deleted':
          return `${signIndent}- ${key}: ${stringify(value, depth + 1)}`
        case 'unchanged':
          return `${signIndent}  ${key}: ${value}`
        case 'changed':
          return [`${signIndent}- ${key}: ${stringify(oldValue, depth + 1)}`,
            `${signIndent}+ ${key}: ${stringify(newValue, depth + 1)}`].join('\n')
        case 'nested':
          return `${signIndent}  ${key}: ${iter(children, depth + 1)}`
        default:
          throw new Error(`Unknown type: ${type}`)
      }
    })
    return ['{', ...result, `${bracketIndent}}`].join('\n')
  }
  return iter(data, 1)
}
