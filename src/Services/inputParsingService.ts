export default class InputParsingService {
  static parseInputString(input: string) {
    input = this.removeBeforeBrace(input)
    input = this.removeBrace(input)
    input = this.removeBeforeBrace(input)
    input = this.removeBraces(input)
    const lines = this.splitLines(input)
    this.trimAllStrings(lines)
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
}
