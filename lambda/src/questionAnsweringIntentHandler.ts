import { HandlerInput, getIntentName, getRequestType } from "ask-sdk-core";

import { getRandomIndex } from "./utils";
import { ballAnswers } from "./constants";

export const QuestionAnsweringIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && getIntentName(handlerInput.requestEnvelope) === 'QuestionAnsweringIntent';
    },
    async handle(handlerInput: HandlerInput) {
        return handlerInput.responseBuilder
            .speak(ballAnswers[getRandomIndex(ballAnswers.length)])
            .reprompt("Do you need anything else? I'm a very busy device.")
            .getResponse();
    }
};