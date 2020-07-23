import propertyBuildingService from '../../Services/propertyBuildingService'

describe('PropertyBuildingService Tests', () => {
  test('builds properties from strings', () => {
    const input = [{ inputValue: 'int a' }, { inputValue: 'string b' }]
    const expected = [
      { propertyName: 'a', propertyType: 'int' },
      { propertyName: 'b', propertyType: 'string' },
    ]
    const actual = propertyBuildingService.buildProperties(input)
    expect(expected).toEqual(actual)
  })

  test('builds properties from strings remove empty lines', () => {
    const input = [{ inputValue: 'int a' }, { inputValue: 'string b' }, { inputValue: '\n' }]
    const expected = [
      { propertyName: 'a', propertyType: 'int' },
      { propertyName: 'b', propertyType: 'string' },
    ]
    const actual = propertyBuildingService.buildProperties(input)
    expect(expected).toEqual(actual)
  })

  test('builds properties from strings remove empty lines with whitespace', () => {
    const input = [
      { inputValue: 'int a' },
      { inputValue: 'string b' },
      { inputValue: ' \n ' },
      { inputValue: 'bool c' },
    ]
    const expected = [
      { propertyName: 'a', propertyType: 'int' },
      { propertyName: 'b', propertyType: 'string' },
      { propertyName: 'c', propertyType: 'bool' },
    ]
    const actual = propertyBuildingService.buildProperties(input)
    expect(expected).toEqual(actual)
  })

  test('splits string into parts', () => {
    const input = 'public int thing'
    const expected = ['public', 'int', 'thing']
    const actual = propertyBuildingService.splitIntoPropertyFields(input)
    expect(expected).toEqual(actual)
  })

  test('creates property from parts', () => {
    const input = ['int', 'thing']
    const expected = { propertyName: 'thing', propertyType: 'int' }
    const actual = propertyBuildingService.constructPropertyFromParts(input)
    expect(expected).toEqual(actual)
  })
})
