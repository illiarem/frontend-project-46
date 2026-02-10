import { Command } from 'commander'
import { parse } from './parsers.js'
import { compare } from './comparison.js'
import * as fs from 'node:fs'
import { cwd } from 'node:process'
import path from 'node:path'

export const createProgram = () => {
  const program = new Command()
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => {
      const data1 = fs.readFileSync(path.resolve(cwd(), filepath1), 'utf8')
      const data2 = fs.readFileSync(path.resolve(cwd(), filepath2), 'utf8')

      const format1 = path.extname(filepath1)
      const format2 = path.extname(filepath2)

      const obj1 = parse(data1, format1)
      const obj2 = parse(data2, format2)

      console.log(compare(obj1, obj2))
    })
  return program
}
