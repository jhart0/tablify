import inputConversionService from '../../Services/inputConversionService'

describe('InputConversionService Tests', () => {
  test('returns create table script', () => {
    const input =
      'public class test \n{public int thing {get;set;}\npublic string thingB {get;set;}}'
    const expected = 'create table test\n(\nthing int,\nthingB nvarchar\n)'
    const actual = inputConversionService.convertToSql(input)
    expect(actual).toEqual(expected)
  })

  test('returns create table script when class has namespace', () => {
    const input =
      'namespace someAssembly {\n public class test \n{public int thing {get;set;}\npublic string thingB {get;set;}\n}\n}'
    const expected = 'create table test\n(\nthing int,\nthingB nvarchar\n)'
    const actual = inputConversionService.convertToSql(input)
    expect(actual).toEqual(expected)
  })

  test('returns create table script when class has namespace and excess whitespace', () => {
    const input =
      'namespace  someAssembly {\n public  class test  \n{ public int thing {get; set;} \npublic string thingB {get;set;}\n }\n} \n'
    const expected = 'create table test\n(\nthing int,\nthingB nvarchar\n)'
    const actual = inputConversionService.convertToSql(input)
    expect(actual).toEqual(expected)
  })

  test('returns class name from class definition', () => {
    const input =
      'namespace  someAssembly {\n public  class test  \n{ public int thing {get; set;} \npublic string thingB {get;set;}\n }\n} \n'
    const expected = 'test'
    const actual = inputConversionService.getClassName(input)
    expect(actual).toEqual(expected)
  })

  test('returns empty from class definition if name not present', () => {
    const input =
      'namespace  someAssembly {\n public class   \n{ public int thing {get; set;} \npublic string thingB {get;set;}\n }\n} \n'
    const expected = ''
    const actual = inputConversionService.getClassName(input)
    expect(actual).toEqual(expected)
  })

  test('returns empty from class definition if class not present', () => {
    const input =
      'namespace  someAssembly {\n public    \n{ public int thing {get; set;} \npublic string thingB {get;set;}\n }\n} \n'
    const expected = ''
    const actual = inputConversionService.getClassName(input)
    expect(actual).toEqual(expected)
  })

  test('returns create table script from popular github repo (clean architecture)', () => {
    const input = `namespace WebApi.ViewModels
  {
      using System;
      using System.ComponentModel.DataAnnotations;
      using Domain.Accounts.Credits;
  
      /// <summary>
      ///     Credit.
      /// </summary>
      public sealed class CreditModel
      {
  
          /// <summary>
          ///     Gets Amount.
          /// </summary>
          [Required]
          public Guid TransactionId { get; }
  
          /// <summary>
          ///     Gets Amount.
          /// </summary>
          [Required]
          public decimal Amount { get; }
  
          /// <summary>
          ///     Gets Description.
          /// </summary>
          [Required]
          public string Description { get; }
  
          /// <summary>
          ///     Gets Transaction Date.
          /// </summary>
          [Required]
          public DateTime TransactionDate { get; }
      }
  }`
    const expected =
      'create table CreditModel\n(\nTransactionId uniqueidentifier,\nAmount decimal,\nDescription nvarchar,\nTransactionDate datetime\n)'
    const actual = inputConversionService.convertToSql(input)
    expect(actual).toEqual(expected)
  })

  test('returns create table script from popular github repo (crank)', () => {
    const input = `// Licensed to the .NET Foundation under one or more agreements.
  // The .NET Foundation licenses this file to you under the MIT license.
  // See the LICENSE file in the project root for more information.
  
  using System;
  using Newtonsoft.Json;
  
  namespace Microsoft.Crank.Models
  {
      public class Measurement
      {
          public string Delimiter = "$$Delimiter$$";
  
          public DateTime Timestamp { get; set; }
          public string Name { get; set; }
          public object Value { get; set; }
  
          [JsonIgnore]
          public bool IsDelimiter => String.Equals(Name, Delimiter, StringComparison.OrdinalIgnoreCase);
      }
  }`
    const expected =
      'create table Measurement\n(\nDelimiter nvarchar,\nTimestamp datetime,\nName nvarchar,\nValue nvarchar,\nIsDelimiter bit\n)'
    const actual = inputConversionService.convertToSql(input)
    expect(actual).toEqual(expected)
  })

  test('returns create table script from popular github repo (umbraco)', () => {
    const input = `using System.Collections.Generic;
    using Umbraco.Core.Models.PublishedContent;
    
    namespace Umbraco.Web.Models
    {
        /// <summary>
        /// The model used when rendering Partial View Macros
        /// </summary>
        public class PartialViewMacroModel : IContentModel
        {
    
            public PartialViewMacroModel(IPublishedContent page,
                int macroId,
                string macroAlias,
                string macroName,
                IDictionary<string, object> macroParams)
            {
                Content = page;
                MacroParameters = macroParams;
                MacroName = macroName;
                MacroAlias = macroAlias;
                MacroId = macroId;
            }
           
            public IPublishedContent Content { get; }
            public string MacroName { get; }
            public string MacroAlias { get; }
            public int MacroId { get; }
            public IDictionary<string, object> MacroParameters { get; }
        }
    } `
    const expected =
      'create table PartialViewMacroModel\n(\nContent nvarchar,\nMacroName nvarchar,\nMacroAlias nvarchar,\nMacroId int\n)'
    const actual = inputConversionService.convertToSql(input)
    expect(actual).toEqual(expected)
  })
})
