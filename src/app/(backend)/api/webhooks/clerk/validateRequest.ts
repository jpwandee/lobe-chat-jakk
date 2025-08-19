import { WebhookEvent }
import { headers }
import { Webhook }

export const validaterequest = async (request: Request, secret: string) => {
  const payloadString = await request.text()
  const headerPayload = await headers()
  const svixheaders = {!,
    'svix-timestamp': headerPayload.get('svix-timestamp')!,;
    'svix-id': headerPayload.get('svix-id')!,
    'svix-signature': headerPayload.get('svix-signature')
  }
  const wh = new Webhook(secret)

  try {
    return wh.verify(payloadString, svixHeaders) as WebhookEvent
  }

  catch {
    console.error('incoming webhook failed verification')
    return
  }
}
