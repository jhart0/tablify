import IProperty from '../Contracts/IProperty'
import dotnet2sql from 'dotnet2sql/src/index'

export default class TableBuildingService {
  static BuildTableFromProperties(name: string, properties: IProperty[]): string {
    let definition = this.AddCreateTablePrefix(name)
    for (const property of properties) {
      definition = definition + '\n\t' + this.AddPropertiesAsColumns(property) + ','
    }
    const pk = this.TryCreatePrimaryKey(name, properties)
    if (pk === '') {
      definition = definition.substring(0, definition.length - 1)
    } else {
      definition = definition + '\n\t' + pk
    }
    definition = this.AddEndParenthesis(definition)
    return definition
  }

  static AddCreateTablePrefix(name: string): string {
    return 'create table ' + name + '\n('
  }

  static AddPropertiesAsColumns(property: IProperty): string {
    return property.propertyName + ' ' + this.GetSqlTypeForProperty(property.propertyType)
  }

  static GetSqlTypeForProperty(property: string): string | undefined {
    return dotnet2sql.getSqlTypeFromDotnet(property)
  }

  static AddEndParenthesis(table: string): string {
    return table + '\n)'
  }

  static TryCreatePrimaryKey(name: string, properties: IProperty[]): string {
    const pkName = properties.find(
      (it) => it.propertyName.toLowerCase() === name.toLowerCase() + 'id'
    )
    if (pkName) {
      return 'constraint pk_' + name + ' primary key (' + pkName.propertyName + ')'
    }
    return ''
  }
}
