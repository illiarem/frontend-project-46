import yaml from 'js-yaml'

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
}

export const parse = (data, format) => {
  if (parsers[format]) {
    return parsers[format](data)
  }

  throw new Error(`Unknown format: ${format}`)
}
