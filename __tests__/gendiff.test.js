import { compareJSONs } from '../src/comparisonJSONs.js'
import * as fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path, { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

let obj1, obj2

beforeEach(() => {
  obj1 = JSON.parse(readFile('file1.json'))
  obj2 = JSON.parse(readFile('file2.json'))
})

test('correct comparison', () => {
  const correctOutput = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
  expect(compareJSONs(obj1, obj2)).toEqual(correctOutput)
})
