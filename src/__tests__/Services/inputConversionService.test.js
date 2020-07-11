import inputConversionService from '../../Services/inputConversionService';

describe( 'InputConversionService Tests', () => {

test('returns create table script', () => {
  const input = "public class test \n{public int thing {get;set;}\npublic string thingB {get;set;}}"
  const expected = "create table test \n (\nthing int,\nthingB nvarchar \n )"
  const actual = inputConversionService.convertToSql(input);
  expect(actual).toEqual(expected);
});

test('returns create table script when class has namespace', () => {
  const input = "namespace someAssembly {\n public class test \n{public int thing {get;set;}\npublic string thingB {get;set;}\n}\n}"
  const expected = "create table test \n (\nthing int,\nthingB nvarchar \n )"
  const actual = inputConversionService.convertToSql(input);
  expect(actual).toEqual(expected);
});

test('returns create table script when class has namespace and excess whitespace', () => {
  const input = "namespace  someAssembly {\n public  class test  \n{ public int thing {get; set;} \npublic string thingB {get;set;}\n }\n} \n"
  const expected = "create table test \n (\nthing int,\nthingB nvarchar \n )"
  const actual = inputConversionService.convertToSql(input);
  expect(actual).toEqual(expected);
});

test('returns class name from class definition', () => {
  const input = "namespace  someAssembly {\n public  class test  \n{ public int thing {get; set;} \npublic string thingB {get;set;}\n }\n} \n"
  const expected = "test"
  const actual = inputConversionService.getClassName(input);
  expect(actual).toEqual(expected);
});

test('returns empty from class definition if name not present', () => {
  const input = "namespace  someAssembly {\n public class   \n{ public int thing {get; set;} \npublic string thingB {get;set;}\n }\n} \n"
  const expected = ""
  const actual = inputConversionService.getClassName(input);
  expect(actual).toEqual(expected);
});

test('returns empty from class definition if class not present', () => {
  const input = "namespace  someAssembly {\n public    \n{ public int thing {get; set;} \npublic string thingB {get;set;}\n }\n} \n"
  const expected = ""
  const actual = inputConversionService.getClassName(input);
  expect(actual).toEqual(expected);
});

});