import tableBuildingService from '../../Services/tableBuildingService';

describe( 'TableBuildingService Tests', () => {

test('returns create table script', () => {
  const input = [{propertyName: "thing", propertyType: "int"}, {propertyName: "thingB", propertyType: "string"}]
  const expected = "create table test\n(\nthing int,\nthingB nvarchar\n)"
  const actual = tableBuildingService.BuildTableFromProperties("test", input);
  expect(expected).toEqual(actual);
});

test('returns initial create prefix', () => {
    const expected = "create table test\n("
    const actual = tableBuildingService.AddCreateTablePrefix("test");
    expect(expected).toEqual(actual);
  });

  test('returns script plus end parenthesis', () => {
    const input = "create table test\n("
    const expected = "create table test\n(\n)"
    const actual = tableBuildingService.AddEndParenthesis(input);
    expect(expected).toEqual(actual);
  });

  test('returns column definition', () => {
    const input = {propertyName: "thing", propertyType: "int"}
    const expected = "thing int"
    const actual = tableBuildingService.AddPropertiesAsColumns(input);
    expect(expected).toEqual(actual);
  });

  test('returns type for dotnet type', () => {
    const input = "string"
    const expected = "nvarchar"
    const actual = tableBuildingService.GetSqlTypeForProperty(input);
    expect(expected).toEqual(actual);
  });

});