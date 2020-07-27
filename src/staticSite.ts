import * as cloudfront from '@aws-cdk/aws-cloudfront'
import * as route53 from '@aws-cdk/aws-route53'
import * as s3 from '@aws-cdk/aws-s3'
import * as s3deploy from '@aws-cdk/aws-s3-deployment'
import * as acm from '@aws-cdk/aws-certificatemanager'
import * as cdk from '@aws-cdk/core'
import * as targets from '@aws-cdk/aws-route53-targets/lib'
import { Construct } from '@aws-cdk/core'

export interface StaticSiteProps {
  domainName: string
  siteSubDomain: string
}

export class StaticSite extends Construct {
  constructor(parent: Construct, name: string, props: StaticSiteProps) {
    super(parent, name)

    const zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName: props.domainName })
    const siteDomain = props.siteSubDomain + '.' + props.domainName
    // tslint:disable-next-line: no-unused-expression
    new cdk.CfnOutput(this, 'Site', { value: 'https://' + siteDomain })

    const siteBucket = new s3.Bucket(this, 'tablify-prod-bucket', {
      bucketName: siteDomain,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      publicReadAccess: true,
    })
    // tslint:disable-next-line: no-unused-expression
    new cdk.CfnOutput(this, 'Bucket', { value: siteBucket.bucketName })

    const certificateArn = new acm.DnsValidatedCertificate(this, 'tablify-prod-cert', {
      domainName: siteDomain,
      hostedZone: zone,
      region: 'us-east-1',
    }).certificateArn
    // tslint:disable-next-line: no-unused-expression
    new cdk.CfnOutput(this, 'Certificate', { value: certificateArn })

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      'tablify-prod-distribution',
      {
        aliasConfiguration: {
          acmCertRef: certificateArn,
          names: [siteDomain],
          sslMethod: cloudfront.SSLMethod.SNI,
          securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_1_2016,
        },
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: siteBucket,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      }
    )
    // tslint:disable-next-line: no-unused-expression
    new cdk.CfnOutput(this, 'DistributionId', { value: distribution.distributionId })

    // tslint:disable-next-line: no-unused-expression
    new route53.ARecord(this, 'tablify-prod-dns', {
      recordName: siteDomain,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      zone,
    })

    // tslint:disable-next-line: no-unused-expression
    new s3deploy.BucketDeployment(this, 'tablify-prod-deployment', {
      sources: [s3deploy.Source.asset('build')],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
    })
  }
}
