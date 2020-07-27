import { StaticSite } from './staticSite'
import * as cdk from '@aws-cdk/core'

class TablifyStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props: cdk.StackProps) {
    super(parent, name, props)

    // tslint:disable-next-line: no-unused-expression
    new StaticSite(this, 'tablify-prod-static-site', {
      domainName: this.node.tryGetContext('domain'),
      siteSubDomain: this.node.tryGetContext('subdomain'),
    })
  }
}

const app = new cdk.App()

// tslint:disable-next-line: no-unused-expression
new TablifyStack(app, 'tablify-prod-stack', {
  env: {
    region: 'us-east-1',
  },
})

app.synth()
