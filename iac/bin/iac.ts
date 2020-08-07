#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { StaticSite } from '../lib/iac-stack';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'testStack', {
    env: { account: '500007353523', region: 'eu-west-1' },
  })
new StaticSite(stack, 'tablify-prod-static-site', {
  domainName: app.node.tryGetContext('domain'),
  siteSubDomain: app.node.tryGetContext('subdomain'),
  staticContentPath: '../build'
})
app.synth();