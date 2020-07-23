import inputParsingService from '../../Services/inputParsingService'

describe('InputParsingService Tests', () => {
  test('removes no braces', () => {
    const expected = { inputValue: 'some text' }
    const input = { inputValue: 'some text' }
    const actual = inputParsingService.removeBraces(input)
    expect(expected).toEqual(actual)
  })

  test('removes many braces', () => {
    const expected = { inputValue: 'some text' }
    const input = { inputValue: '{some text}' }
    const actual = inputParsingService.removeBraces(input)
    expect(expected).toEqual(actual)
  })

  test('removes one brace', () => {
    const expected = { inputValue: 'some {text}}' }
    const input = { inputValue: '{some {text}}' }
    const actual = inputParsingService.removeBrace(input)
    expect(expected).toEqual(actual)
  })

  test('removes before first brace', () => {
    const input = { inputValue: 'public class blah {some text}' }
    const expected = { inputValue: '{some text}' }
    const actual = inputParsingService.removeBeforeBrace(input)
    expect(expected).toEqual(actual)
  })

  test('removes before first brace when multiple braces', () => {
    const input = { inputValue: 'public class blah {some {text}}' }
    const expected = { inputValue: '{some {text}}' }
    const actual = inputParsingService.removeBeforeBrace(input)
    expect(expected).toEqual(actual)
  })

  test('splits string by new lines', () => {
    const input = { inputValue: 'one \n two \n three' }
    const expected = [{ inputValue: 'one ' }, { inputValue: ' two ' }, { inputValue: ' three' }]
    const actual = inputParsingService.splitLines(input)
    expect(expected).toEqual(actual)
  })

  test('removes blank spaces', () => {
    const input = [{ inputValue: ' one two three ' }, { inputValue: ' one two' }]
    const expected = [{ inputValue: 'one two three' }, { inputValue: 'one two' }]
    const actual = inputParsingService.trimAllStrings(input)
    expect(expected).toEqual(actual)
  })

  test('removes auto get and set properties', () => {
    const input = [{ inputValue: 'prop a {get; set;}' }, { inputValue: 'prop b {get;set;}' }]
    const expected = [{ inputValue: 'prop a { }' }, { inputValue: 'prop b {}' }]
    const actual = inputParsingService.removeAutoProperties(input)
    expect(expected).toEqual(actual)
  })

  test('removes keywords', () => {
    const input = [
      { inputValue: 'unsafe prop a {get; set;}' },
      { inputValue: 'virtual prop a {get; set;}' },
      { inputValue: 'volatileprop a {get; set;} ' },
      { inputValue: 'prop a {get; set;} ' },
      { inputValue: 'prop b {get;set;}' },
    ]
    const expected = [
      { inputValue: ' prop a {get; set;}' },
      { inputValue: ' prop a {get; set;}' },
      { inputValue: 'volatileprop a {get; set;} ' },
      { inputValue: 'prop a {get; set;} ' },
      { inputValue: 'prop b {get;set;}' },
    ]
    const actual = inputParsingService.removeKeywords(input)
    expect(expected).toEqual(actual)
  })

  test('removes comments, attributes and usings from list', () => {
    const input = [
      { inputValue: '#some region' },
      { inputValue: 'prop a {get; set;}' },
      { inputValue: '//some comment' },
      { inputValue: '[anAttribute]' },
      { inputValue: 'prop b {get;set;}' },
      { inputValue: 'using some.package' },
    ]
    const expected = [{ inputValue: 'prop a {get; set;}' }, { inputValue: 'prop b {get;set;}' }]
    const actual = inputParsingService.removeNonPropertyLines(input)
    expect(expected).toEqual(actual)
  })

  test('sanitizes input into array of strings', () => {
    const input = {
      inputValue: 'public class {some text a {get;set;} \nsome text b { get; set; } }',
    }
    const expected = [{ inputValue: 'some text a' }, { inputValue: 'some text b' }]
    const actual = inputParsingService.parseInputString(input)
    expect(expected).toEqual(actual)
  })

  test('sanitizes basic class into array of strings', () => {
    const input = {
      inputValue: 'public class {public int a {get;set;} \nprivate string b { get; set; } }',
    }
    const expected = [{ inputValue: 'int a' }, { inputValue: 'string b' }]
    const actual = inputParsingService.parseInputString(input)
    expect(expected).toEqual(actual)
  })

  test('sanitizes basic class in namespace into array of strings', () => {
    const input = {
      inputValue:
        'public Namespace { public class {public int a {get;set;} \nprivate string b { get; set; } } }',
    }
    const expected = [{ inputValue: 'int a' }, { inputValue: 'string b' }]
    const actual = inputParsingService.parseInputString(input)
    expect(expected).toEqual(actual)
  })

  test('sanitizes basic class with mixed case auto properties in namespace into array of strings', () => {
    const input = {
      inputValue:
        'public Namespace { public class {public int a {Get;Set;} \nprivate string b { get; set; } } }',
    }
    const expected = [{ inputValue: 'int a' }, { inputValue: 'string b' }]
    const actual = inputParsingService.parseInputString(input)
    expect(expected).toEqual(actual)
  })
})
