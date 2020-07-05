import inputParsingService from '../../Services/inputParsingService';

test('removes no braces', () => {
  const expected = "some text"
  const actual = inputParsingService.removeBraces(expected);
  expect(expected).toEqual(actual);
});

test('removes many braces', () => {
    const expected = "some text"
    const input = "{some text}"
    const actual = inputParsingService.removeBraces(input);
    expect(expected).toEqual(actual);
  });

  test('removes one brace', () => {
    const expected = "some {text}}"
    const input = "{some {text}}"
    const actual = inputParsingService.removeBrace(input);
    expect(expected).toEqual(actual);
  });

test('removes before first brace', () => {
    const input = "public class blah {some text}"
    const expected = "{some text}"
    const actual = inputParsingService.removeBeforeBrace(input);
    expect(expected).toEqual(actual);
  });

test('removes before first brace when multiple braces', () => {
    const input = "public class blah {some {text}}"
    const expected = "{some {text}}"
    const actual = inputParsingService.removeBeforeBrace(input);
    expect(expected).toEqual(actual);
  });

  test('splits string by new lines', () => {
    const input = "one \n two \n three"
    const expected = ["one ", " two ", " three"]
    const actual = inputParsingService.splitLines(input);
    expect(expected).toEqual(actual);
  });

test('sanitizes input into array of strings', () => {
    const input = "public class {some text a \nsome text b }"
    const expected = ["some text a ", "some text b "]
    const actual = inputParsingService.parseInputString(input);
    expect(expected).toEqual(actual);
  });
