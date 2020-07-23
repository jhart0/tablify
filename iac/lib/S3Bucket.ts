import { App, Stack, RemovalPolicy } from '@aws-cdk/core'
import { Bucket } from '@aws-cdk/aws-s3'

export class S3Bucket extends Stack {
  readonly bucket: Bucket

  constructor(scope: App, id: string) {
    super(scope, id)
    this.bucket = new Bucket(this, 'site-bucket', {
      bucketName: 'sample-bucket-cdk-tutorial',
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
    })
  }
}
