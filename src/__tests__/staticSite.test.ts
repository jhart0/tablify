import { SynthUtils } from '@aws-cdk/assert'
import * as cdk from '@aws-cdk/core'
import * as staticSite from '../staticSite'

test('static site creates bucket', () => {
  const app = new cdk.App()
  const stack = new cdk.Stack(app, 'testStack', { env: { account: '1234567890', region: 'dummy' } })
  // tslint:disable-next-line: no-unused-expression
  new staticSite.StaticSite(stack, 'testStaticSite', {
    siteSubDomain: 'www',
    domainName: 'test.com',
  })
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
})
