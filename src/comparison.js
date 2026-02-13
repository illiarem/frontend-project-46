import _ from 'lodash'

export const compare = (obj1, obj2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)))
  const result = sortedKeys.map((key) => {
    const node = {}
    node.key = key
    if (!Object.hasOwn(obj2, key)) {
      node.type = 'deleted'
      node.value = obj1[key]
    }
    else if (!Object.hasOwn(obj1, key)) {
      node.type = 'added'
      node.value = obj2[key]
    }
    else if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      node.type = 'object inside'
      node.children = compare(obj1[key], obj2[key])
    }
    else if (obj1[key] === obj2[key]) {
      node.type = 'unchanged'
      node.value = obj1[key]
    }
    else {
      node.type = 'changed'
      node.oldValue = obj1[key]
      node.newValue = obj2[key]
    }
    return node
  })
  return result
}
