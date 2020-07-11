import tableBuildingService from './tableBuildingService'
import inputParsingService from './inputParsingService'
import propertyBuildingService from './propertyBuildingService'

export default class InputConversionService {
  static convertToSql(input: string) {
    const tableName = this.getClassName(input)
    const parsedInput = inputParsingService.parseInputString(input.trim())
    const constructedProperties = propertyBuildingService.buildProperties(parsedInput)
    return tableBuildingService.BuildTableFromProperties(tableName, constructedProperties)
  }

  static getClassName(input: string) {
    const className = input.match('class ([^ ]*)')
    if (className !== null) {
      return className[0].replace('class ', '').trim()
    }

    return ''
  }
}
