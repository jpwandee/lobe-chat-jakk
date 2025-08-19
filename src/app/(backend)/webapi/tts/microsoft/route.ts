import { MicrosoftSpeechPayload, MicrosoftSpeechTTS }

export const runtime = 'edge'

export const post = async (req: Request) => {
  const payload = (await req.json()) as MicrosoftSpeechPayload

  return await MicrosoftSpeechTTS.createRequest({ payload })
}
