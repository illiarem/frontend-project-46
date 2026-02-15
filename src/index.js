import { parse } from './parsers.js'
import { compare } from './comparison.js'
import { formatData } from './formatters/index.js'

import * as fs from 'node:fs'
import { cwd } from 'node:process'
import path from 'node:path'

export default (filepath1, filepath2, format = 'stylish') => {
  const data1 = fs.readFileSync(path.resolve(cwd(), filepath1), 'utf8')
  const data2 = fs.readFileSync(path.resolve(cwd(), filepath2), 'utf8')

  const format1 = path.extname(filepath1)
  const format2 = path.extname(filepath2)

  const obj1 = parse(data1, format1)
  const obj2 = parse(data2, format2)
  const diff = compare(obj1, obj2)

  return formatData(diff, format)
}
