import { HandlerInput, getIntentName, getRequestType } from "ask-sdk-core";
import { ChatGPTCall } from "./gpt";
import { moods, workStories } from "./constants";
import { getRandomIndex } from "./utils";

export const WorkPredictionIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && getIntentName(handlerInput.requestEnvelope) === 'WorkPredictionIntent';
    },
    async handle(handlerInput: HandlerInput) {
        const gptResponse = await ChatGPTCall(
            [
              {
                content: `Imagine ${
                    workStories[getRandomIndex(workStories.length)]
                }. Guess what is going to happen to me in one short paragraph and be ${moods[getRandomIndex(moods.length)]}.`,
                role: 'user'
              }
            ],
            128
          );
        const speakOutput = `I think I see your future now. ${gptResponse}.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt("Do you need anything else? I'm a very busy device.")
            .getResponse();
    }
};