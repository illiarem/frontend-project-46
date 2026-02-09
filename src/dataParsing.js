import * as fs from 'node:fs'
import { cwd } from 'node:process'
import path from 'node:path'

export const parseDate = (...filepaths) => {
  const objects = filepaths.map((filepath) => {
    const absPath = path.resolve(cwd(), filepath)
    const data = fs.readFileSync(absPath, 'utf8')
    const obj = JSON.parse(data)
    return obj
  })

  return objects
}
