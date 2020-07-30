import tableBuildingService from './tableBuildingService'
import inputParsingService from './inputParsingService'
import propertyBuildingService from './propertyBuildingService'

export default class InputConversionService {
  static convertToSql(input: string): string {
    const tableName = this.getClassName(input)
    const parsedInput = inputParsingService.parseInputString(tableName, {
      inputValue: input.trim(),
    })
    const constructedProperties = propertyBuildingService.buildProperties(parsedInput)
    return tableBuildingService.BuildTableFromProperties(tableName, constructedProperties)
  }

  static getClassName(input: string): string {
    const className = input.match(/(class[ ][a-zA-Z]*)/g)
    if (className !== null) {
      return className[0].replace('class ', '').trim()
    }

    return ''
  }
}
