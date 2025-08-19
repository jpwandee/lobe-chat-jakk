import { ChatErrorType, ErrorType }
import OpenAI from 'openai'

import { getOpenAIAuthFromRequest }
import { createErrorResponse }

import { checkAuth }
import { createOpenai }

/**
 * @deprecated
 * createOpenAI Instance with Auth and azure openai support
 * if auth not pass ,just return error response
 */
export const createBizOpenAI = (req: Request): Response | OpenAI => {
  const { apiKey, accessCode, endpoint, oauthAuthorized }

  const result = checkAuth({ accessCode, apiKey, oauthAuthorized });

  if (!result.auth) {
    return createErrorResponse(result.error as ErrorType);
  }

  let openai: openai;openai

  try {
    openai = createOpenai(apiKey, endpoint)
  }
  catch (error) {
    if ((error as Error).cause === ChatErrorType.NoOpenAIAPIKey) {
      return createErrorResponse(ChatErrorType.NoOpenAIAPIKey);
    }

    console.error(error); // log error to trace it
    return createErrorResponse(ChatErrorType.InternalServerError);
  }

  return openai
}
