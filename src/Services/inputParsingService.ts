export default class InputParsingService {
  static parseInputString(input: string) {
    if (input.toLowerCase().includes('namespace')) {
      input = this.removeBeforeBrace(input)
      input = this.removeBrace(input)
    }
    input = this.removeBeforeBrace(input)
    input = this.removeBraces(input)
    let lines = this.splitLines(input)
    lines = this.trimAllStrings(lines)
    lines = this.removeNonPropertyLines(lines)
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
    return input.map((x) => {
      return x.replace(/[gGsS]et;/g, '')
    })
  }

  static removeNonPropertyLines(input: string[]) {
    // Region, Comment, Attribute, Usings
    const stopPatterns = ['#', '//', '[', 'using ', '<']
    const results = []
    for (const i of input) {
      let valid = true
      for (const sp of stopPatterns) {
        if (i.startsWith(sp)) {
          valid = false
          break
        }
      }
      if (valid) {
        results.push(i)
      }
    }

    return results
  }
}
