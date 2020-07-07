import IProperty from '../Contracts/IProperty'

export default class TableBuildingService {
  static BuildTableFromProperties(name: string, properties: IProperty[]) {
    let definition = this.AddCreateTablePrefix(name)
    definition = this.AddEndParenthesis(definition)
    return definition
  }

  static AddCreateTablePrefix(name: string) {
    return 'create table ' + name + ' \n ('
  }

  static AddEndParenthesis(table: string) {
    return table + ' \n )'
  }
}
