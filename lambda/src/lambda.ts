
import { LaunchRequestHandler } from "./launchRequestHandler";import { LovePredictionIntentHandler } from "./lovePredictionIntentHandler";
import { HelpIntentHandler } from "./helpIntentHandler";
import { CancelAndStopIntentHandler } from "./cancelAndStopIntentHandler";
import { FallbackIntentHandler } from "./fallbackIntentHandler";
import { SessionEndedRequestHandler } from "./sessionEndedRequestHandler";
import { ErrorHandler } from "./errorHandler";
import { DefaultApiClient, SkillBuilders } from "ask-sdk-core";
import { WorkPredictionIntentHandler } from "./workPredictionIntentHandler";
import { QuestionAnsweringIntentHandler } from "./questionAnsweringIntentHandler";

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
export const handler = SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        LovePredictionIntentHandler,
        WorkPredictionIntentHandler,
        QuestionAnsweringIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler
        )
    .addErrorHandlers(
        ErrorHandler)
    .withApiClient(new DefaultApiClient()) 
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();