import axios from "axios";
import getSecrets from "./secret";

// Define ChatGPT constants
const gptUrl = "https://api.openai.com/v1/chat/completions"
const gptModel = "gpt-3.5-turbo"
const gptTemperature = 0.6

interface Message {
  role: string
  content: string
}

export const ChatGPTCall = async (chat: Message[], maxTokens: number): Promise<string> => {
  const gptSecret = await getSecrets();

  if (!gptSecret) {
    throw "Cannot request GPT without a secret."
  }
  console.log(`Secret is ${gptSecret}`);

  const callErrorMsg = "Unable to call GPT API. Try again later."

  const requestBody = {
    model: gptModel,
    messages: chat,
    max_tokens: maxTokens,
    temperature: gptTemperature
  }

  try {
    const res = await axios.post(
        gptUrl,
        requestBody,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${gptSecret}`
            }
        }
    )

    if (res.status !== 200) {
        console.log(res)
        return callErrorMsg
    }

    const {data} = res
    console.log(data.choices[0]);
    if (data?.choices?.length < 1 || !data.choices[0]?.message?.content) {
      return callErrorMsg
    }

    return data.choices[0].message.content
  } catch (e) {
    console.error(e)
    return callErrorMsg
  }
}