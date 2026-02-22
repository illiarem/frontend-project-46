import _ from 'lodash'

const isObject = data => Object.prototype.toString.call(data) === '[object Object]'

export const compare = (obj1, obj2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)))
  const result = sortedKeys.map((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] }
    }
    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: obj2[key] }
    }

    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return { key, type: 'nested', children: compare(obj1[key], obj2[key]) }
    }

    if (_.isEqual(obj1[key], obj2[key])) {
      return { key, type: 'unchanged', value: obj1[key] }
    }

    return { key, type: 'changed', oldValue: obj1[key], newValue: obj2[key] }
  })
  return result
}
