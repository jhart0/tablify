import IProperty from '../Contracts/IProperty'
import IInput from '../Contracts/IInput'

export default class PropertyBuildingService {
  static buildProperties(inputStrings: IInput[]): IProperty[] {
    const properties: IProperty[] = []
    for (const i of inputStrings) {
      i.inputValue = i.inputValue.trim()
      let parts = this.splitIntoPropertyFields(i.inputValue)
      if (parts.length > 2) {
        parts = parts.slice(0, 2)
      }
      if (parts.length === 2) {
        properties.push(this.constructPropertyFromParts(parts))
      }
    }

    return properties
  }

  static splitIntoPropertyFields(input: string): string[] {
    return input.split(' ')
  }

  static constructPropertyFromParts(input: string[]): IProperty {
    const property: IProperty = {
      propertyName: input[1].trim(),
      propertyType: input[0].trim(),
    }

    return property
  }
}
