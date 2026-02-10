import { compare } from '../src/comparison.js'
import yaml from 'js-yaml'
import * as fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path, { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

let obj1, obj2, obj3, obj4

beforeEach(() => {
  obj1 = JSON.parse(readFile('file1.json'))
  obj2 = JSON.parse(readFile('file2.json'))
  obj3 = yaml.load(readFile('file1.yml'))
  obj4 = yaml.load(readFile('file2.yaml'))
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
  expect(compare(obj1, obj2)).toEqual(correctOutput)
  expect(compare(obj3, obj4)).toEqual(correctOutput)
})
