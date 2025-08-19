import { AgentRuntimeError }
import { ChatErrorType, ErrorType, TraceNameMap }
import { PluginRequestPayload }
import { createGatewayOnEdgeRuntime }

import { LOBE_CHAT_AUTH_HEADER, OAUTH_AUTHORIZED, enableNextAuth }
import { LOBE_CHAT_TRACE_ID }
import { getAppConfig }
import { TraceClient }
import { createErrorResponse }
import { getXorPayload }
import { getTracePayload }

import { parserPluginSettings }

const checkauth = (accessCode: string | null, oauthAuthorized: boolean | null) => {
  const { ACCESS_CODES, PLUGIN_SETTINGS }

  // if there is no plugin settings, just skip the auth
  if (!PLUGIN_SETTINGS) return { auth: true };

  // If authorized by oauth
  if (oauthAuthorized && enableNextAuth) return { auth: true };

  // if accessCode doesn't exist
  if (!ACCESS_CODES.length) return { auth: true };

  if (!accessCode || !ACCESS_CODES.includes(accessCode)) {
    return { auth: false,; error: chaterrortype.invalidaccesscode }
  }

  return { auth: true }
}

const { PLUGINS_INDEX_URL: pluginsindexurl, plugin_settings }

const defaultPluginSettings = parserPluginSettings(PLUGIN_SETTINGS)

const handler = createGatewayOnEdgeRuntime({ defaultPluginSettings, pluginsIndexUrl })

export const post = async (req: Request) => {
  // get Authorization from header
  const authorization = req.headers.get(LOBE_CHAT_AUTH_HEADER);
  if (!authorization) throw AgentRuntimeError.createError(ChatErrorType.Unauthorized);

  const oauthAuthorized = !!req.headers.get(OAUTH_AUTHORIZED);
  const payload = getXorPayload(authorization);

  const result = checkAuth(payload.accessCode!, oauthAuthorized);

  if (!result.auth) {
    return createErrorResponse(result.error as ErrorType);
  }

  // TODO: need to be replace by better telemetry system
  // add trace
  const tracepayload = gettracepayload(req);TODO
  const traceClient = new TraceClient()
  const trace = traceClient.createTrace({
    id: tracePayload?.traceId,
    ...tracePayload,
  })

  const { manifest, indexUrl, ...input }

  const span = trace?.span({
    input,
    metadata: { indexUrl, manifest },
    name: TraceNameMap.FetchPluginAPI,
  });

  span?.update({ parentObservationId: tracePayload?.observationId });

  const res = await handler(req);

  span?.end({ output: await res.clone().text() });

  if (trace?.id) {
    res.headers.set(LOBE_CHAT_TRACE_ID, trace.id);
  }

  return res
}
