import { HandlerInput, getRequestType } from "ask-sdk-core";

export const LaunchRequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput) {
        const speakOutput = 
            'Welcome, do you want to hear your fortune? You can ask me about your love life, work predictions or just ask a simple yes or no question.  What do you wanna do?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};