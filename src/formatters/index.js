import { formatStylish } from './stylish.js'
import { formatPlain } from './plain.js'

export const formatData = (data, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(data)
    case 'plain':
      return formatPlain(data)
  }
}
