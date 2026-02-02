#!/usr/bin/env node

import { program } from 'commander'
import parseDate from './dataParsing.js'
import _ from 'lodash'

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const [obj1, obj2] = parseDate(filepath1, filepath2)

    const sortedKeys = _.sortBy([...new Set([...Object.keys(obj1), ...Object.keys(obj2)])])
    const result = sortedKeys.map((key) => {
      if (!Object.hasOwn(obj2, key)) {
        return `  - ${key}: ${obj1[key]}`
      }
      else if (!Object.hasOwn(obj1, key)) {
        return `  + ${key}: ${obj2[key]}`
      }
      else if (obj1[key] !== obj2[key]) {
        return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`
      }
      else {
        return `    ${key}: ${obj1[key]}`
      }
    })

    console.log(`{\n${result.join('\n')}\n}`)
  })

program.parse()
