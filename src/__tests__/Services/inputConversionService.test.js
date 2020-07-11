import inputConversionService from '../../Services/inputConversionService';

describe( 'InputConversionService Tests', () => {

test('returns create table script', () => {
  const input = "public class test \n{public int thing {get;set;}\npublic string thingB {get;set;}}"
  const expected = "create table  \n (\nthing int,\nthingB nvarchar \n )"
  const actual = inputConversionService.convertToSql(input);
  expect(actual).toEqual(expected);
});

test('returns create table script when class has namespace', () => {
  const input = "namespace someAssembly {\n public class test \n{public int thing {get;set;}\npublic string thingB {get;set;}\n}\n}"
  const expected = "create table  \n (\nthing int,\nthingB nvarchar \n )"
  const actual = inputConversionService.convertToSql(input);
  expect(actual).toEqual(expected);
});

test('returns create table script when class has namespace and excess whitespace', () => {
  const input = "namespace  someAssembly {\n public  class test  \n{ public int thing {get; set;} \npublic string thingB {get;set;}\n }\n} \n"
  const expected = "create table  \n (\nthing int,\nthingB nvarchar \n )"
  const actual = inputConversionService.convertToSql(input);
  expect(actual).toEqual(expected);
});

});