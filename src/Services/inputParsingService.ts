import { strict } from "assert"
import { stringify } from "querystring"

export default class InputParsingService {
  static parseInputString(input: string) {
    if (input.includes('Namespace')) {
      input = this.removeBeforeBrace(input)
      input = this.removeBrace(input)
    }
    input = this.removeBeforeBrace(input)
    input = this.removeBraces(input)
    let lines = this.splitLines(input)
    lines = this.removeAutoProperties(lines)
    lines = this.trimAllStrings(lines)
    return lines
  }

  static removeBraces(input: string) {
    return input.replace(/{/g, '').replace(/}/g, '')
  }

  static removeBeforeBrace(input: string) {
    return input.substring(input.indexOf('{'))
  }

  static removeBrace(input: string) {
    return input.replace('{', '')
  }

  static splitLines(input: string) {
    return input.split('\n')
  }

  static trimAllStrings(input: string[]) {
    return input.map(Function.prototype.call, String.prototype.trim)
  }

  static removeAutoProperties(input: string[]) {
    input = input.map((x) => {
      return x.replace(/get;/g, '')
    })
    return input.map((x) => {
      return x.replace(/set;/g, '')
    })
  }
}
