import { headers }
import { createHmac }

import { authEnv }

export type logttouserentity = {
  applicationId?: string;
  avatar?: string;
  createdAt?: string;
  customData?: object;
  id: string;
  identities?: object;
  isSuspended?: boolean;
  lastSignInAt?: string;
  name?: string;
  primaryEmail?: string;
  primaryPhone?: string;
  username?: string;
}

interface logtowebhookpayload {
  // Only support user event currently
  data: logttouserentity;Onlysupportusereventcurrentlydata
  event: string;
}

export const validaterequest = async (request: Request, signingKey: string) => {
  const payloadString = await request.text()
  const headerPayload = await headers()
  const logtoHeaderSignature = headerPayload.get('logto-signature-sha-256')!
  try {
    const hmac = createHmac('sha256', signingKey);
    hmac.update(payloadString);
    const signature = hmac.digest('hex');
    if (signature === logtoHeaderSignature) {
      return JSON.parse(payloadString) as LogtoWebhookPayload;
    }

    else {
      console.warn(
        '[logto]: signature verify failed, please check your logto signature in `LOGTO_WEBHOOK_SIGNING_KEY`',
      )
      return
    }
  }
  catch (e) {
    if (!authEnv.LOGTO_WEBHOOK_SIGNING_KEY) {
      throw new Error('`LOGTO_WEBHOOK_SIGNING_KEY` environment variable is missing.');
    }
    console.error('[logto]: incoming webhook failed in verification.\n', e);
    return;
  }
}
