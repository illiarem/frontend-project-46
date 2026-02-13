import { genDiff } from '../src/index.js'
import * as fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path, { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

let file1JsonPath, file2JsonPath
let file1YmlPath, file2YmlPath
let expected

beforeEach(() => {
  file1JsonPath = getFixturePath('file1.json')
  file2JsonPath = getFixturePath('file2.json')
  file1YmlPath = getFixturePath('file1.yml')
  file2YmlPath = getFixturePath('file2.yaml')
  expected = readFile('expected_stylish.txt')
})

describe('stylish format', () => {
  test('should work with JSON files', () => {
    expect(genDiff(file1JsonPath, file2JsonPath, 'stylish')).toEqual(expected)
  })

  test('should work with YAML files', () => {
    expect(genDiff(file1YmlPath, file2YmlPath, 'stylish')).toEqual(expected)
  })

  test('should work with mixed formats (json and yaml)', () => {
    expect(genDiff(file1JsonPath, file2YmlPath, 'stylish')).toEqual(expected)
  })
})
