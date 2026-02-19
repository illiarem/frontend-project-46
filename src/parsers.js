import yaml from 'js-yaml'

const formatters = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
}

export const parse = (data, format) => {
  if (formatters[format]) {
    return formatters[format](data)
  }

  throw new Error(`Unknown format: ${format}`)
}
