import genDiff from '../src/index.js'
import * as fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path, { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

let file1JsonPath, file2JsonPath
let file1YmlPath, file2YmlPath
let expected_stylish
let expected_plain
let expected_json

beforeEach(() => {
  file1JsonPath = getFixturePath('file1.json')
  file2JsonPath = getFixturePath('file2.json')
  file1YmlPath = getFixturePath('file1.yml')
  file2YmlPath = getFixturePath('file2.yaml')
  expected_stylish = readFile('expected_stylish.txt')
  expected_plain = readFile('expected_plain.txt')
  expected_json = readFile('expected_json.txt')
})

describe('stylish format', () => {
  test('should work with JSON files', () => {
    expect(genDiff(file1JsonPath, file2JsonPath, 'stylish')).toEqual(expected_stylish)
  })

  test('should work with YAML files', () => {
    expect(genDiff(file1YmlPath, file2YmlPath, 'stylish')).toEqual(expected_stylish)
  })

  test('should work with mixed formats (json and yaml)', () => {
    expect(genDiff(file1JsonPath, file2YmlPath, 'stylish')).toEqual(expected_stylish)
  })
})

describe('plain format', () => {
  test('should work with JSON files', () => {
    expect(genDiff(file1JsonPath, file2JsonPath, 'plain')).toEqual(expected_plain)
  })

  test('should work with YAML files', () => {
    expect(genDiff(file1YmlPath, file2YmlPath, 'plain')).toEqual(expected_plain)
  })

  test('should work with mixed formats (json and yaml)', () => {
    expect(genDiff(file1JsonPath, file2YmlPath, 'plain')).toEqual(expected_plain)
  })
})

describe('json format', () => {
  test('should work with JSON files', () => {
    expect(genDiff(file1JsonPath, file2JsonPath, 'json')).toEqual(expected_json)
  })

  test('should work with YAML files', () => {
    expect(genDiff(file1YmlPath, file2YmlPath, 'plain')).toEqual(expected_plain)
  })

  test('should work with mixed formats (json and yaml)', () => {
    expect(genDiff(file1JsonPath, file2YmlPath, 'plain')).toEqual(expected_plain)
  })
})
