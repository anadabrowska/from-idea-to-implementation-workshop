import { HandlerInput, getIntentName, getRequestType } from "ask-sdk-core";

const HelloWorldIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    async handle(handlerInput: HandlerInput) {
        const speakOutput = 
            `Hello I'm a magic eight ball I can answer to your questions, but I can also make some predictions about your career and love life. I use chat-gpt for that but don't tell anyone, let it be our secret.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};