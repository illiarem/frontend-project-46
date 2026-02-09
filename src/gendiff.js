import { Command } from 'commander'
import { parseDate } from './dataParsing.js'
import { compareJSONs } from './comparisonJSONs.js'

export default () => {
  const program = new Command()
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => {
      const [obj1, obj2] = parseDate(filepath1, filepath2)
      console.log(compareJSONs(obj1, obj2))
    })
  return program
}
