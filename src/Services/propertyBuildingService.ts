import IProperty from '../Contracts/IProperty'

export default class PropertyBuildingService {
  static buildProperties(inputStrings: string[]) {
    const properties: IProperty[] = []
    for (let i of inputStrings) {
      i = i.trim()
      let parts = this.splitIntoPropertyFields(i)
      if (parts.length > 3) {
        parts = parts.slice(0, 3)
      }
      if (parts.length === 3) {
        parts = this.removeAccessModifier(parts)
      }
      if (parts.length === 2) {
        properties.push(this.constructPropertyFromParts(parts))
      }
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
      propertyName: input[1].trim(),
      propertyType: input[0].trim(),
    }

    return property
  }
}
