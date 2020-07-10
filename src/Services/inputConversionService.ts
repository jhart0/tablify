import tableBuildingService from './tableBuildingService'
import inputParsingService from './inputParsingService'
import propertyBuildingService from './propertyBuildingService'

export default class InputConversionService {
  static convertToSql(input: string) {
    const parsedInput = inputParsingService.parseInputString(input)
    const constructedProperties = propertyBuildingService.buildProperties(parsedInput)
    return tableBuildingService.BuildTableFromProperties('', constructedProperties)
  }
}
