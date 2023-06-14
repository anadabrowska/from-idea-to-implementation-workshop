import { HandlerInput, getIntentName, getRequestType } from "ask-sdk-core";

export const CancelAndStopIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput: HandlerInput) {
        const speakOutput = 'I guess you don\'t want to talk anymore, well goodbye !';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};