import _ from 'lodash'

export const compareJSONs = (obj1, obj2) => {
  const sortedKeys = _.sortBy([...new Set([...Object.keys(obj1), ...Object.keys(obj2)])])
  const result = sortedKeys.map((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return `  - ${key}: ${obj1[key]}`
    }
    else if (!Object.hasOwn(obj1, key)) {
      return `  + ${key}: ${obj2[key]}`
    }
    else if (obj1[key] === obj2[key]) {
      return `    ${key}: ${obj1[key]}`
    }
    else {
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`
    }
  })
  return `{\n${result.join('\n')}\n}`
}
