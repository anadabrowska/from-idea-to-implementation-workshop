import { HandlerInput, getIntentName, getRequestType } from "ask-sdk-core";
import { ChatGPTCall } from "./gpt";
import { getRandomIndex } from "./utils";
import { loveStories, moods } from "./constants";

export const LovePredictionIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && getIntentName(handlerInput.requestEnvelope) === 'LovePredictionIntent';
    },
    async handle(handlerInput: HandlerInput) {
        const gptResponse = await ChatGPTCall(
            [
              {
                content: `Imagine ${
                    loveStories[getRandomIndex(loveStories.length)]
                }. Guess what is going to happen to me in one short paragraph and be ${moods[getRandomIndex(moods.length)]}.`,
                role: 'user'
              }
            ],
            128
          );
        const speakOutput = `Oh that is interensting. ${gptResponse}.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt("Do you need anything else? I'm a very busy device.")
            .getResponse();
    }
};