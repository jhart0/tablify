import IInput from '../Contracts/IInput'

export default class InputParsingService {
  static parseInputString(input: IInput) {
    if (input.inputValue.toLowerCase().includes('namespace')) {
      input = this.removeBeforeBrace(input)
      input = this.removeBrace(input)
    }
    input = this.removeBeforeBrace(input)
    input = this.removeBraces(input)
    let lines = this.splitLines(input)
    lines = this.trimAllStrings(lines)
    lines = this.removeKeywords(lines)
    lines = this.removeNonPropertyLines(lines)
    lines = this.removeAutoProperties(lines)
    lines = this.trimAllStrings(lines)
    return lines
  }

  static removeBraces(input: IInput): IInput {
    return { inputValue: input.inputValue.replace(/{/g, '').replace(/}/g, '') }
  }

  static removeBeforeBrace(input: IInput): IInput {
    return { inputValue: input.inputValue.substring(input.inputValue.indexOf('{')) }
  }

  static removeBrace(input: IInput): IInput {
    return { inputValue: input.inputValue.replace('{', '') }
  }

  static splitLines(input: IInput): IInput[] {
    return input.inputValue.split('\n').map((it) => {
      return {
        inputValue: it,
      }
    })
  }

  static trimAllStrings(input: IInput[]): IInput[] {
    return input.map((it) => {
      return { inputValue: it.inputValue.trim() }
    })
  }

  static removeAutoProperties(input: IInput[]): IInput[] {
    return input.map((it) => {
      return { inputValue: it.inputValue.replace(/[gGsS]et;/g, '') }
    })
  }

  static removeKeywords(input: IInput[]): IInput[] {
    const keywords = [
      'private',
      'public',
      'protected',
      'internal',
      'protected-internal',
      'private-protected',
      'abstract',
      'async',
      'const',
      'event',
      'extern',
      'in',
      'new',
      'out',
      'override',
      'readonly',
      'sealed',
      'static',
      'unsafe',
      'virtual',
      'volatile',
    ]
    return input.map((raw) => {
      let clean = raw.inputValue
      for (const keyword of keywords) {
        clean = clean.replace(keyword + ' ', ' ')
      }
      return { inputValue: clean }
    })
  }

  static removeNonPropertyLines(input: IInput[]): IInput[] {
    const stopPatterns = ['#', '//', '[', 'using ', '<']
    const results = []
    for (const i of input) {
      let valid = true
      for (const sp of stopPatterns) {
        if (i.inputValue.startsWith(sp)) {
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
