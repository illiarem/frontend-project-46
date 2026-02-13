import { formatStylish } from './stylish.js'

export const formatData = (data, format) => {
  if (format === 'stylish') {
    return formatStylish(data)
  }
}
