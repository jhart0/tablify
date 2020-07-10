import IProperty from '../Contracts/IProperty'
import dotnet2sql from 'dotnet2sql/src/index'

export default class TableBuildingService {
  static BuildTableFromProperties(name: string, properties: IProperty[]) {
    let definition = this.AddCreateTablePrefix(name)
    for (const property of properties) {
      definition = definition + '\n' + this.AddPropertiesAsColumns(property) + ','
    }
    definition = definition.substring(0, definition.length - 1)
    definition = this.AddEndParenthesis(definition)
    return definition
  }

  static AddCreateTablePrefix(name: string) {
    return 'create table ' + name + ' \n ('
  }

  static AddPropertiesAsColumns(property: IProperty) {
    return property.propertyName + ' ' + this.GetSqlTypeForProperty(property.propertyType)
  }

  static GetSqlTypeForProperty(property: string) {
    return dotnet2sql.getSqlTypeFromDotnet(property)
  }

  static AddEndParenthesis(table: string) {
    return table + ' \n )'
  }
}
