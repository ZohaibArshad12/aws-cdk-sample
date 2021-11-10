import * as cdk from '@aws-cdk/core';
import * as LAMBDANODEJS from '@aws-cdk/aws-lambda-nodejs';
import * as LAMBDA from '@aws-cdk/aws-lambda';
import * as APIGATEWAY from '@aws-cdk/aws-apigateway';
import { NodejsFunctionProps } from '@aws-cdk/aws-lambda-nodejs';
export class SpeechRecognitionBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const CDK_DEFAULT_REGION = process.env.CDK_DEFAULT_REGION || 'us-east-1';

    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: [
          'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime
        ],
      },
      environment: {
        REGION: CDK_DEFAULT_REGION,
      },
      runtime: LAMBDA.Runtime.NODEJS_14_X,
    };

    const speechApiLambda = new LAMBDANODEJS.NodejsFunction(
      this,
      'speechApiLambda',
      {
        entry: `${__dirname}/lambdas/speechApiLambda/index.js`,
        functionName: 'speechApiLambda',
        ...nodeJsFunctionProps,
      }
    );

    const speechApi = new APIGATEWAY.LambdaRestApi(this, 'speechApi', {
      handler: speechApiLambda,
      defaultCorsPreflightOptions: {
        allowOrigins: APIGATEWAY.Cors.ALL_ORIGINS,
        allowMethods: APIGATEWAY.Cors.ALL_METHODS, // this is also the default
        statusCode: 200,
      },
    });
  }
}
