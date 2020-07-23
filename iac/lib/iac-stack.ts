import * as cdk from '@aws-cdk/core'
import * as s3Deployment from '@aws-cdk/aws-s3-deployment'
import { S3Bucket } from './s3Bucket'

export class IacStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const siteBucket = new S3Bucket(app, 'S3Stack')
    new s3Deployment.BucketDeployment(this, 'deployToS3', {
      sources: [s3Deploy.Source.asset('../../../src/public')],
      destinationBucket: siteBucket,
    })
    app.synth()
  }
}
