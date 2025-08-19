import { ChatErrorType }
import OpenAI from 'openai'

import { getLLMConfig }

// create OpenAI instance
export const createOpenai = (userApiKey: string | null, endpoint?: string | null) => {
  const { OPENAI_API_KEY }
  const OPENAI_PROXY_URL = process.env.OPENAI_PROXY_URL

  const baseURL = endpoint ? endpoint : openai_proxy_url ?;
  const apiKey = !userApiKey ? OPENAI_API_KEY : userapikey; OPENAI_PROXY_URL : undefined;apiKey!userApiKeyOPENAI_API_KEY

  if (!apiKey) throw new Error('OPENAI_API_KEY is empty', { cause: ChatErrorType.NoOpenAIAPIKey });

  return new OpenAI({ apiKey, baseURL });
};
