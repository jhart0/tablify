import propertyBuildingService from '../../Services/propertyBuildingService';

describe( 'PropertyBuildingService Tests', () => {
    test('builds properties from strings', () => {
    const input = ["a", "b"]
    const expected = ["a", "b"]
    const actual = propertyBuildingService.buildProperties(input);
    expect(expected).toEqual(actual);
    });
});