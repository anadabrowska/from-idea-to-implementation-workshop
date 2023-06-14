import { HandlerInput } from "ask-sdk-core"
import { services } from "ask-sdk-model";
import SendDirectiveRequest = services.directive.SendDirectiveRequest;


export const sendProgressiveResponse = async (handlerInput: HandlerInput, speech: string) => {
    try {
        console.log(`sending a progressive response: ${speech}`)
        const { requestEnvelope } = handlerInput
        const directiveServiceClient = handlerInput.serviceClientFactory?.getDirectiveServiceClient();
                
        const directive: SendDirectiveRequest = {
        header: {
            requestId: requestEnvelope.request.requestId
        },
        directive: {
            type: 'VoicePlayer.Speak',
            speech: speech
        }
        };

        return directiveServiceClient?.enqueue(directive);
    } catch (err) {
        console.log(err);
    }

  }