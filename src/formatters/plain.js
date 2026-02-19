const isObject = data => Object.prototype.toString.call(data) === '[object Object]'

const stringify = (value) => {
  if (isObject(value)) {
    return '[complex value]'
  }
  else {
    return typeof value === 'string' ? `'${value}'` : `${value}`
  }
}

export const formatPlain = (data) => {
  const iter = (data, keyPath) => {
    const result = data.map((node) => {
      const { type, key, value, oldValue, newValue, children } = node
      const property = keyPath === '' ? key : `${keyPath}.${key}`
      switch (type) {
        case 'added':
          return `Property '${property}' was added with value: ${stringify(value)}`
        case 'deleted':
          return `Property '${property}' was removed`
        case 'unchanged':
          return 'unchanged'
        case 'changed':
          return `Property '${property}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`
        case 'nested':
          return iter(children, `${property}`)
        default:
          throw new Error(`Unknown type: ${type}`)
      }
    }).filter(line => line !== 'unchanged')

    return result.join('\n')
  }
  return iter(data, '')
}
