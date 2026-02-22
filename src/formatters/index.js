import { formatStylish } from './stylish.js'
import { formatPlain } from './plain.js'
import { formatJSON } from './json.js'

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJSON,
}

export const formatData = (data, format) => {
  if (formatters[format]) {
    return formatters[format](data)
  }

  throw new Error(`Unknown format: ${format}`)
}
