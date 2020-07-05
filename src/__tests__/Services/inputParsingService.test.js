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

test('sanitizes input into array of strings', () => {
    const expected = "some text a \r\nsome text b "
    const input = "some text a {}\r\nsome text b {}"
    const actual = inputParsingService.parseInputString(input);
    expect(expected).toEqual(actual);
  });
