import { Input } from "@material-ui/core"

export default class InputParsingService {
  static parseInputString(input: string) {
    return this.removeBraces(input)
  }

  static removeBraces(input: string) {
    return input.replace(/{/g, '').replace(/}/g, '')
  }
}
