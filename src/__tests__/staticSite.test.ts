import * as cdk from '@aws-cdk/core'
import * as staticSite from '../../iac/lib/iac-stack'
import '@aws-cdk/assert/jest'

describe('IaC Tests', () => {
  const app = new cdk.App()
  const stack = new cdk.Stack(app, 'testStack', {
    env: { account: '1234567890', region: 'dummy' },
  })
  // tslint:disable-next-line: no-unused-expression
  new staticSite.StaticSite(stack, 'testStaticSite', {
    siteSubDomain: 'www',
    domainName: 'test.com',
    staticContentPath: './build',
  })

  test('static site creates bucket', () => {
    expect(stack).toHaveResource('AWS::S3::Bucket', {
      BucketName: 'www.test.com',
      WebsiteConfiguration: {
        IndexDocument: 'index.html',
        ErrorDocument: 'error.html',
      },
    })
  })

  test('static site creates cloudfront distribution', () => {
    expect(stack).toHaveResource('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: ['test.com', 'www.test.com'],
        DefaultCacheBehavior: {
          AllowedMethods: ['GET', 'HEAD'],
          CachedMethods: ['GET', 'HEAD'],
          Compress: true,
          ForwardedValues: {
            Cookies: {
              Forward: 'none',
            },
            QueryString: false,
          },
          TargetOriginId: 'origin1',
          ViewerProtocolPolicy: 'redirect-to-https',
        },
        DefaultRootObject: 'index.html',
        Enabled: true,
        HttpVersion: 'http2',
        IPV6Enabled: true,
        Origins: [
          {
            ConnectionAttempts: 3,
            ConnectionTimeout: 10,
            DomainName: {
              'Fn::GetAtt': ['testStaticSitetablifyprodbucketEBCA2C99', 'RegionalDomainName'],
            },
            Id: `origin1`,
            S3OriginConfig: {},
          },
        ],
        PriceClass: `PriceClass_100`,
        ViewerCertificate: {
          AcmCertificateArn: {
            'Fn::GetAtt': [
              'testStaticSitetablifyprodcertCertificateRequestorResource3A3455F6',
              'Arn',
            ],
          },
          MinimumProtocolVersion: `TLSv1.1_2016`,
          SslSupportMethod: `sni-only`,
        },
      },
    })
  })
})
