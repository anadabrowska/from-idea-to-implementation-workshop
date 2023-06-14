import { Construct } from 'constructs';
import { Architecture, Code, Function, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Policy, PolicyDocument, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const dependencyLayer = new LayerVersion(this, "dependencies-layer", {
        code: Code.fromAsset("../lambda/dependencies"),
        description: "dependencies for lambda",
        compatibleArchitectures: [
            Architecture.X86_64
        ],
        compatibleRuntimes: [
            Runtime.NODEJS_18_X
        ]
    });

    // Create a new secret for chatGPT
    // You need to add the secret value in the console
    const secret = new secretsmanager.Secret(this, "lambda-sectet", {});

    // Lambda function for Alexa fulfillment
    const alexaLambda = new Function(this, 'AlexaLambdaHandler', {
        runtime: Runtime.NODEJS_18_X,
        code: Code.fromAsset("../lambda/build"),
        handler: 'lambda.handler',
        timeout: Duration.minutes(10),
        environment: {
            SECRET_ID: secret.secretArn
        },
        layers: [
            dependencyLayer
        ]
    });

    // Allow Lambda to read the secret 
    const readSecretPolicy = new Policy(this, "read-secret-policy", {
        document: new PolicyDocument({
            statements: [
                new PolicyStatement({
                    actions:["secretsmanager:GetSecretValue"],
                    resources: [secret.secretArn]
                })
            ]
        })
    })

    alexaLambda.role?.attachInlinePolicy(readSecretPolicy);

    /*
    Allow the Alexa service to invoke the fulfillment Lambda.
    In order for the Skill to be created, the fulfillment Lambda
    must have a permission allowing Alexa to invoke it, this causes
    a circular dependency and requires the first deploy to allow all
    Alexa skills to invoke the lambda, subsequent deploys will work
    when specifying the eventSourceToken
        */
    alexaLambda.addPermission('AlexaPermission', {
    eventSourceToken: "amzn1.ask.skill.eaa42d1a-b26f-4fdb-9097-accc33beda79",
    principal: new ServicePrincipal('alexa-appkit.amazon.com'),
    action: 'lambda:InvokeFunction'
    });
}}

