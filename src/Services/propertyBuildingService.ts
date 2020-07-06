import IProperty from '../Contracts/IProperty'

export default class PropertyBuildingService {
  static buildProperties(inputStrings: string[]) {
    const properties: IProperty[] = []
    for (const i of inputStrings) {
      let parts = this.splitIntoPropertyFields(i)
      if (parts.length === 3) {
        parts = this.removeAccessModifier(parts)
      }
      properties.push(this.constructPropertyFromParts(parts))
    }
    return properties
  }

  static splitIntoPropertyFields(input: string) {
    return input.split(' ')
  }

  static removeAccessModifier(input: string[]) {
    return input.slice(1, 3)
  }

  static constructPropertyFromParts(input: string[]) {
    const property: IProperty = {
      propertyName: input[1],
      propertyType: input[0],
    }

    return property
  }
}
