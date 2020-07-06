import propertyBuildingService from '../../Services/propertyBuildingService';

describe( 'PropertyBuildingService Tests', () => {
    test('builds properties from strings', () => {
    const input = ["public int a", "string b"]
    const expected = [{propertyName: "a", propertyType: "int"},{propertyName: "b", propertyType: "string"}]
    const actual = propertyBuildingService.buildProperties(input);
    expect(expected).toEqual(actual);
    });

    test('splits string into parts', () => {
    const input = "public int thing"
    const expected = ["public", "int", "thing"]
    const actual = propertyBuildingService.splitIntoPropertyFields(input);
    expect(expected).toEqual(actual);
    });

    test('removes extra partites from parts', () => {
    const input = ["a", "b", "c"]
    const expected = ["b", "c"]
    const actual = propertyBuildingService.removeAccessModifier(input);
    expect(expected).toEqual(actual);
    });

    test('creates property from parts', () => {
    const input = ["int", "thing"]
    const expected = {propertyName: "thing", propertyType: "int"}
    const actual = propertyBuildingService.constructPropertyFromParts(input);
    expect(expected).toEqual(actual);
    });
});