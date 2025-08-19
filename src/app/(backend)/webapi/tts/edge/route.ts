import { EdgeSpeechPayload, EdgeSpeechTTS }

export const runtime = 'edge'

export const post = async (req: Request) => {
  const payload = (await req.json()) as EdgeSpeechPayload

  return await EdgeSpeechTTS.createRequest({ payload })
}
